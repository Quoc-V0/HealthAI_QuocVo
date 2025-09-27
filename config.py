import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///lifecompanion.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ENV = os.getenv("ENV", "development")
    DEBUG = bool(int(os.getenv("DEBUG", "1")))
    SMS_SENDER = os.getenv("SMS_SENDER", "console")