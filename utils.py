from flask import current_app
def send_sms(phone: str, message: str):
    # For demo: print to console. Integrate Twilio later per current_app.config['SMS_SENDER']
    print(f"[SMS to {phone}] {message}")