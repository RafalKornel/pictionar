from .app import create_app, db, models
from flask_migrate import Migrate
from flask import request, session
import click

app = create_app("production")

@app.shell_context_processor
def make_shell_context():
    return { 
        "db":db, 
        "User":models.User, 
        "Group":models.Group, 
        "Word":models.Word, 
        "associations":models.associations 
    }

@app.before_request
def before_request():
    session.permament = True

@app.cli.command("create_tables")
def create_tables():
    db.create_all()

@app.cli.command("drop_tables")
def drop_tables():
    db.drop_all()

@app.cli.command("migrate_groups")
def migrate_groups():
    users = models.User.query.all()

    for user in users:
        group_id = user.group_id
        group = models.Group.query.get(group_id)

        if group not in user.groups.all():
            user.groups.append(group)
        
        db.session.add(user)

    db.session.commit()

@app.cli.command("migrate_words")
def migrate_words():
    words = models.Word.query.all()

    for word in words:
        group_id = word.user.groups.first().id

        if word.group_id is None:
            word.group_id = group_id
            db.session.add(word)
    
    db.session.commit()

@app.cli.command("create_group")
@click.argument("group_name")
@click.argument("group_key")
def add_group(group_name, group_key):
    g = models.Group(name=group_name, key=group_key)
    db.session.add(g)
    db.session.commit()