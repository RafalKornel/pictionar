from flask import Flask
from flask_login import login_manager
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from config import config

db = SQLAlchemy()
#login_manager = LoginManager()
#login_manager.login_view = "auth.login"

def create_app(config_name):
    app = Flask(__name__, template_folder="../../client/", static_folder="../../client/")
    app.config.from_object(config[config_name])

    db.init_app(app)
    #login_manager.init_app(app)

    from .main import main as main_blueprint
    from .auth import auth as auth_blueprint

    app.register_blueprint(main_blueprint)
    #app.register_blueprint(auth_blueprint, url_prefix="/auth")

    return app