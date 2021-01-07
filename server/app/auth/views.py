from flask.helpers import make_response
from flask.templating import render_template
from flask_login.utils import login_required
from . import auth
from .forms import RegisterForm, LoginForm, GroupForm
from flask import redirect, url_for, request, Response
from flask_login import login_user, logout_user, current_user
from ..models import User, Group
from .. import db


@auth.route("/check")
def check_if_logged():
    print("User authenticated: ", current_user.is_authenticated)
    return { 
        "logged": current_user.is_authenticated,
        "groups": current_user.groups_parsed(),
         }

@auth.route("/create_group", methods=["GET", "POST"])
def create_group():

    if request.method == "GET":
        form = GroupForm()
        return { "csrf_token": form.csrf_token.current_token }


    data = request.get_json()
    form = GroupForm(
        group_name = data["group_name"],
        group_key = data["group_key"])

    if form.validate():
        group = Group.query.filter( (Group.name == form.group_name) | (Group.key == form.group_key) )
        if group is not None:
            return "Group already exists.", 400

        g = Group(
            name=form.group_name, 
            key=form.group_key)
        
        db.session.add(g)
        db.session.commit()


@auth.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "GET":
        form = LoginForm()
        return { "csrf_token": form.csrf_token.current_token }

    if current_user.is_authenticated:
        return Response(status=200)


    data = request.get_json()
    form = LoginForm(
        user_name=data["user_name"],
        user_pass=data["user_pass"])

    if form.validate():
        user = User.query.filter_by(name=form.user_name.data).first()
        if user and user.verify_password(form.user_pass.data):
            login_user(user)
            return {"groups": user.groups_parsed()}
        
    return Response(status=401)

@auth.route("/logout")
@login_required
def logout():
    print("logging out")
    logout_user()
    return { "logged": "false" };


@auth.route("/register", methods=["GET", "POST"])
def register_post():

    if request.method == "GET":
        form = RegisterForm()
        return { "csrf_token": form.csrf_token.current_token }

    data = request.get_json()
    form = RegisterForm(
        user_name=data["user_name"],
        user_pass=data["user_pass"],
        user_pass_repeat=data["user_pass_repeat"],
        secret_key=data["secret_key"]
    )

    if form.validate_on_submit():
        group = Group.query.filter_by(key=form.secret_key.data).first()

        user = User(
            name=form.user_name.data, 
            password=form.user_pass.data,
            group = group)

        db.session.add(user)
        db.session.commit()

        return Response(status=200)

    return Response(status=400)