from .app import create_app, db, models
from flask_migrate import Migrate
from flask import request, session
import click

app = create_app("production")

@app.shell_context_processor
def make_shell_context():
    return { "db":db, "User":models.User, "Group":models.Group, "Word":models.Word }

@app.before_request
def before_request():
    session.permament = True

@app.cli.command("create_tables")
def create_tables():
    db.create_all()

@app.cli.command("drop_tables")
def drop_tables():
    db.drop_all()

@app.cli.command("create_group")
@click.argument("group_name")
@click.argument("group_key")
def add_group(group_name, group_key):
    g = models.Group(name=group_name, key=group_key)
    db.session.add(g)
    db.session.commit()