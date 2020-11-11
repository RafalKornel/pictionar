from . import main
from flask import render_template, request, Response, json
from flask_login import login_required, current_user
from .. import csrf, db
from ..models import User, Word

@main.route("/")
def index():
    return render_template("index.html")

@main.route("/secret")
@login_required
def secret():
    return "<h1>top secret</h1>"


@main.route("/add", methods=["POST"])
@login_required
def add_word():
    data = request.get_json()
    words = data["words"]
    print(words)

    user = User.query.filter_by(name=current_user.name).first()
    
    if user is None or len(words) == 0:
        return Response(status=405)

    for w in words:
        word = Word(word=w, user_id=user.id)
        db.session.add(word)
    db.session.commit()

    return Response(status=200)


@main.route("/words")
@login_required
def retrieve_words():
    words = Word.query.all()
    data = []
    for w in words:
        data.append( w.format() )
    
    return json.dumps(data)


@main.route("/bank")
@login_required
def retrieve_words_clean():
    words = Word.query.all()
    result = ""
    for w in words:
        result += f"{w.word}, "
    
    return result


@main.route("/count")
@login_required
def words_count():
    return str(db.session.query(Word).count())