from flask.helpers import make_response
from flask.templating import render_template
from flask_login.utils import login_required
from . import auth
from .forms import RegisterForm, LoginForm, CreateGroupForm, JoinGroupForm
from flask import redirect, url_for, request, Response
from flask_login import login_user, logout_user, current_user
from ..models import User, Group
from .. import db


@auth.route("/user")
def check_if_logged():
    if current_user.is_authenticated:
        return {
            "name": current_user.name,
            "groups": current_user.groups_parsed()
        }
    
    return Response(status=401)


@auth.route("/create_group", methods=["GET", "POST"])
def create_group():
    if request.method == "GET":
        form = CreateGroupForm()
        return { "csrf_token": form.csrf_token.current_token }


    data = request.get_json()
    form = CreateGroupForm(
        group_name = data["group_name_create"],
        group_key = data["group_key_create"])

    if form.validate():
        group = Group.query.filter( (Group.name == form.group_name.data) | (Group.key == form.group_key.data) ).first()
        if group is not None:
            return "Group already exists.", 400

        group = Group(
            name=form.group_name.data, 
            key=form.group_key.data)
        
        db.session.add(group)
        db.session.commit()

        return {"name": group.name, "key": group.key}
    
    return "Something went wrong", 400


@login_required
@auth.route("/join_group", methods=["GET", "POST"])
def join_group():
    if request.method == "GET":
        form = JoinGroupForm()
        return { "csrf_token": form.csrf_token.current_token }

    data = request.get_json()
    form = JoinGroupForm(
        group_key = data["group_key_join"])

    if form.validate():
        group = Group.query.filter_by(key=form.group_key.data).first()

        if group is None:
            return "Group doesn't exist", 400
        
        current_user.groups.append(group)

        db.session.add(current_user)
        db.session.commit()

        return {"name": group.name}

    return "Something went wrong.", 400


@login_required
@auth.route("/leave_group", methods=["GET", "POST"])
def leave_group():
    if request.method == "GET":
        form = JoinGroupForm()
        return { "csrf_token": form.csrf_token.current_token }

    data = request.get_json()
    form = JoinGroupForm(
        group_key = data["group_key_leave"])

    if form.validate():
        group = Group.query.filter_by(key=form.group_key.data).first()

        if group is None:
            return "Group doesn't exist", 400
        
        user_groups = current_user.groups.all()

        if group not in user_groups:
            return "You are not in this group", 400
        
        current_user.groups.remove(group)

        db.session.add(current_user)
        db.session.commit()

        return "Succesfully left group.", 200

    return "Something went wrong.", 400


@login_required
@auth.route("/leave_group/<group_key>")
def leave(group_key):
    group = Group.query.filter_by(key=group_key).first()

    if group is None:
        return "Group doesn't exist", 400
        
    user_groups = current_user.groups.all()
    
    if group not in user_groups:
        return "You are not in this group", 400
    
    current_user.groups.remove(group)
    
    db.session.add(current_user)
    db.session.commit()
    
    return "Succesfully left group.", 200


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
        
    return "Username or password is incorrect.", 400

@auth.route("/logout")
@login_required
def logout():
    print("logging out")
    logout_user()
    return { "logged": "false" };


@auth.route("/register", methods=["GET", "POST"])
def register():

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
            groups = [group])

        db.session.add(user)
        db.session.commit()

        return Response(status=200)

    return Response(status=400)