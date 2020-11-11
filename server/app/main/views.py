from server.app.auth.views import login
from . import main
from flask import render_template
from flask_login import login_required
from .. import csrf

@main.route("/")
def index():
    return render_template("index.html")

@main.route("/secret")
@login_required
def secret():
    return "<h1>top secret</h1>"