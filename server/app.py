from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__, template_folder="../client/", static_folder="../client/")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/register/submit", methods=["POST"])
def submit_registration():
    return "<h1> got form </h1>"