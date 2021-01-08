from flask import Flask
from flask.helpers import url_for
from flask_login import login_manager
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_wtf.csrf import CSRFProtect
from ..config import config
import os

db = SQLAlchemy()
csrf = CSRFProtect()
login_manager = LoginManager()


def create_app(config_name):
    print(os.listdir("build/"))
    print(os.listdir("public/"))
    for (root, dirs, files) in os.walk("./", topdown=True):
        print(root)
        print(dirs)
        print(files)
        print("-----------------")
    app = Flask(__name__, static_folder=os.path.abspath("build"), static_url_path="/")
    app.config.from_object(config[config_name])

    db.init_app(app)
    csrf.init_app(app)
    login_manager.init_app(app)

    from .main import main as main_blueprint
    from .auth import auth as auth_blueprint

    app.register_blueprint(main_blueprint, url_prefix="/api")
    app.register_blueprint(auth_blueprint, url_prefix="/api")

    @app.route("/")
    def index():
        return app.send_static_file("index.html")

    return app