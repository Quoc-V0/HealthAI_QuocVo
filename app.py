import os
from datetime import datetime
from flask import Flask, render_template, redirect, url_for, request, flash, session
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker, scoped_session
from dotenv import load_dotenv

from config import Config
from models import Base, User, OTPCode
from forms import LoginForm, SignupForm, OTPForm
from utils import send_sms

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)

engine = create_engine(app.config['SQLALCHEMY_DATABASE_URI'], echo=False, future=True)
Base.metadata.create_all(engine)
SessionLocal = scoped_session(sessionmaker(bind=engine, autoflush=False, autocommit=False))

login_manager = LoginManager()
login_manager.login_view = "login"
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    db = SessionLocal()
    try:
        return db.get(User, int(user_id))
    finally:
        db.close()

@app.teardown_appcontext
def shutdown_session(exception=None):
    SessionLocal.remove()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/signup', methods=['GET','POST'])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        db = SessionLocal()
        try:
            # Check if email exists
            existing = db.execute(select(User).where(User.email == form.email.data.strip().lower())).scalar_one_or_none()
            if existing:
                flash('Email already registered. Please log in.', 'warning')
                return redirect(url_for('login'))
            user = User(
                name=form.name.data.strip(),
                email=form.email.data.strip().lower(),
                phone=form.phone.data.strip(),
                role=form.role.data
            )
            user.set_password(form.password.data)
            db.add(user)
            db.commit()

            # Create OTP and 'send'
            otp = OTPCode.create(user, 'phone_verify', ttl_minutes=10)
            db.add(otp); db.commit()
            send_sms(user.phone, f"Your LifeCompanion verification code is: {otp.code}")
            session['pending_user_id'] = user.id
            flash('Account created. We sent a verification code to your phone (simulated).', 'success')
            return redirect(url_for('verify'))
        finally:
            db.close()
    return render_template('signup.html', form=form)

@app.route('/verify', methods=['GET','POST'])
def verify():
    form = OTPForm()
    db = SessionLocal()
    try:
        uid = session.get('pending_user_id')
        if not uid:
            flash('No pending verification. Please sign up or log in.', 'warning')
            return redirect(url_for('home'))
        user = db.get(User, uid)
        if not user:
            flash('User not found.', 'danger'); return redirect(url_for('home'))

        last_otp = db.query(OTPCode).filter(OTPCode.user_id==user.id).order_by(OTPCode.created_at.desc()).first()

        if form.validate_on_submit():
            code = form.code.data.strip()
            if last_otp and last_otp.is_valid() and last_otp.code == code:
                user.is_phone_verified = True
                db.add(user); db.commit()
                login_user(user)
                session.pop('pending_user_id', None)
                flash('Phone verified. Welcome!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid or expired code.', 'danger')
        return render_template('verify.html', form=form, phone=user.phone, otp_demo=last_otp.code if last_otp else None)
    finally:
        db.close()

@app.route('/login', methods=['GET','POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        db = SessionLocal()
        try:
            user = db.execute(select(User).where(User.email==form.email.data.strip().lower())).scalar_one_or_none()
            if user and user.check_password(form.password.data):
                login_user(user)
                flash('Welcome back!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Invalid credentials.', 'danger')
        finally:
            db.close()
    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Signed out.', 'info')
    return redirect(url_for('home'))

@app.route('/dashboard')
@login_required
def dashboard():
    # demo data in session (simulate sensors)
    if 'demo' not in session:
        session['demo'] = {'steps': 4200, 'sleep': 5.3, 'hr': 72, 'calls': 0}
    d = session['demo']
    # Very lightweight insights
    insights = []
    if d['calls'] == 0:
        insights.append(('Social', 'No calls in 7 days — High risk', 'high'))
    if d['steps'] < 5000:
        insights.append(('Activity', 'Steps decreased vs baseline — try 10‑minute walk', 'medium'))
    if d['sleep'] < 6:
        insights.append(('Sleep', 'Below baseline — try winding down earlier', 'low'))
    template = 'dashboard_elder.html' if current_user.role == 'elder' else 'dashboard_caregiver.html'
    return render_template(template, demo=d, insights=insights)

@app.route('/simulate', methods=['POST'])
@login_required
def simulate():
    # simple mutation of demo data
    d = session.get('demo', {'steps': 4200, 'sleep': 5.3, 'hr': 72, 'calls': 0})
    action = request.form.get('action')
    if action == 'drop_activity':
        d['steps'] = max(500, d['steps'] - 2000)
    elif action == 'improve_sleep':
        d['sleep'] = round(min(8.5, d['sleep'] + 0.7), 1)
    elif action == 'call_family':
        d['calls'] = 1
    session['demo'] = d
    flash('Simulation updated.', 'success')
    return redirect(url_for('dashboard'))

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

@app.route('/contact', methods=['GET','POST'])
def contact():
    if request.method == 'POST':
        flash('Message sent (demo).', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html')

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)