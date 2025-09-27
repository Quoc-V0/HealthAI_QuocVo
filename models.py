from datetime import datetime, timedelta
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import String, Integer, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

class User(Base, UserMixin):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    phone: Mapped[str] = mapped_column(String(32))
    role: Mapped[str] = mapped_column(String(32), default="elder")  # elder|caregiver|provider
    password_hash: Mapped[str] = mapped_column(String(255))
    is_phone_verified: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    otps: Mapped[list["OTPCode"]] = relationship(back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password: str):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password: str) -> bool:
        return check_password_hash(self.password_hash, password)

class OTPCode(Base):
    __tablename__ = "otp_codes"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    code: Mapped[str] = mapped_column(String(8))
    purpose: Mapped[str] = mapped_column(String(32), default="phone_verify")  # phone_verify|login
    expires_at: Mapped[datetime] = mapped_column(DateTime)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped[User] = relationship(back_populates="otps")

    @staticmethod
    def create(user, purpose="phone_verify", ttl_minutes=10):
        import secrets, string, datetime
        code = "".join(secrets.choice("0123456789") for _ in range(6))
        return OTPCode(user=user, code=code, purpose=purpose,
                       expires_at=datetime.datetime.utcnow() + datetime.timedelta(minutes=ttl_minutes))

    def is_valid(self) -> bool:
        from datetime import datetime as dt
        return dt.utcnow() <= self.expires_at