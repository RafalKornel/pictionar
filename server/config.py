import os
from datetime import timedelta
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "something very hard to guess kalambury i guess")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    PERMANENT_SESSION_LIFETIME = timedelta(days=31)
    WTF_CSRF_TIME_LIMIT = None

class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DEV_DATABASE_URL",
        "sqlite:///" + os.path.join(basedir, "data-dev.sqlite")
    )

class ProductionConfig(Config):
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "sqlite:///" + os.path.join(basedir, "data.sqlite")
    )

config = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig,
}