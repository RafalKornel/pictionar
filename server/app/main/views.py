from flask.globals import current_app
from flask.helpers import send_from_directory
from flask_wtf.csrf import generate_csrf
from . import main
from flask import render_template, request, Response, json, jsonify
from flask_login import login_required, current_user, logout_user
from .. import  db
from ..models import Group, User, Word, associations, Theme
from .utilities import validate_word, clean_input
from .forms import ThemeForm
import random, math


@main.route("/add", methods=["GET", "POST"])
@login_required
def add_word():

    if request.method == "GET":
        return { "csrf_token": generate_csrf() }

    data = request.get_json()
    words = clean_input(data["words"])
    group_name = data["group"];
    group = Group.query.filter_by(name=group_name).first()
    
    if not current_user.is_authenticated or len(words) == 0:
        return "User not authenticated", 405

    if group is None:
        return "Wrong group.", 400

    if group.name not in current_user.group_names():
        return "Not allowed", 405

    added_words = []

    for w in words:
        if validate_word(w) and not Word.query.filter_by(group_id=group.id).filter_by(word=w).first():
            added_words.append(w)

            word = Word(word=w, user_id=current_user.get_id(), group_id=group.id)
            db.session.add(word)
        db.session.commit()

    if len(added_words) == 0:
        return "No words added.", 400


    return {"added_words": added_words,
            "count": len(added_words) }


@main.route("/words")
@login_required
def words_demo():
    query = Word.query \
                .join(associations, Word.group_id == associations.columns.group_id) \
                .filter_by(user_id=current_user.id)
    length = len(query.all())
    words = [ query.offset( math.floor(random.random() * length)).first() for _ in range(27) ]
    data = []
    for w in words:
        if w:
            data.append( w.format() )
    
    return jsonify(data)

@main.route("/bank")
@login_required
def retrieve_words():
    request_args = request.args["groups"].split(",")
    group_ids = []

    for arg in request_args:
        group = Group.query.filter_by(name = arg).first()
        if group is None or group not in current_user.groups.all():
            return "Wrong group or not allowed", 400

        group_ids.append( group.id )

    words = Word.query \
                .join(associations, Word.group_id == associations.columns.group_id) \
                .filter( associations.columns.group_id.in_(group_ids) ) \
                .all()
    result = ""
    for w in words:
        result += f"{w.word}, "

    return jsonify(result)


@main.route("/add_theme", methods=["GET", "POST"])
@login_required
def add_theme():
    if request.method == "GET":
        form = ThemeForm()
        return { "csrf_token": form.csrf_token.current_token }

    data = request.get_json()
    name = data["themeName"]

    schema = [ "--gradient-light", 
               "--gradient-dark",
               "--text-color",
               "--form-color",
               "--input-color" ]

    for entry in schema:
        if entry not in data:
            return "Wrong theme format", 400

    form = ThemeForm(
        name = name,
        gradient_light = data[schema[0]],
        gradient_dark = data[schema[1]],
        text_color = data[schema[2]],
        main_color = data[schema[3]],
        accent_color = data[schema[4]]
    )

    if form.validate():
        theme = Theme(
            name = name,
            user_id = current_user.get_id(),
            gradient_light = data[schema[0]],
            gradient_dark = data[schema[1]],
            text_color = data[schema[2]],
            main_color = data[schema[3]],
            accent_color = data[schema[4]]
        )

        db.session.add(theme)
        db.session.commit()
    
        return "Color added.", 200
    
    return list(form.errors.values())[0][0], 400


# TODO: change method to delete perhaps?
@main.route("/remove_theme/<theme_name>")
@login_required
def remove_theme(theme_name):
    theme = Theme.query \
        .filter_by(user_id=current_user.get_id()) \
        .filter_by(name=theme_name) \
        .first()

    if theme is None:
        return "Theme not found", 400

    db.session.delete(theme)
    db.session.commit()

    return "Removed theme", 200