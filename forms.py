from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import DataRequired, Email, Length

class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6)])
    submit = SubmitField("Sign in")

class SignupForm(FlaskForm):
    name = StringField("Full name", validators=[DataRequired(), Length(min=2, max=120)])
    email = StringField("Email", validators=[DataRequired(), Email()])
    phone = StringField("Phone", validators=[DataRequired(), Length(min=7, max=32)])
    role = SelectField("Role", choices=[("elder","Elder / Patient"),("caregiver","Caregiver / Family"),("provider","Healthcare Provider")])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=6)])
    submit = SubmitField("Create account")

class OTPForm(FlaskForm):
    code = StringField("Verification code", validators=[DataRequired(), Length(min=6, max=6)])
    submit = SubmitField("Verify")