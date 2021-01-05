from flask.globals import current_app
from flask.helpers import send_from_directory
from flask_wtf.csrf import generate_csrf
from . import main
from flask import render_template, request, Response, json, jsonify
from flask_login import login_required, current_user, logout_user
from .. import  db
from ..models import Group, User, Word, associations
from .utilities import validate_word, clean_input
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

    if group.name not in current_user.groups_parsed():
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
                .filter_by(user_id=current_user.id) \
                .filter( associations.columns.group_id.in_(group_ids) ) \
                .all()
    result = ""
    for w in words:
        result += f"{w.word}, "
    
    return jsonify(result)


@main.route("/count")
@login_required
def words_count():
    return str(
            len(
                Word.query\
                    .join(associations, Word.group_id == associations.columns.group_id)\
                    .filter_by(user_id=current_user.id).all()
                )
            )