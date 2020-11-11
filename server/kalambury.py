from app import create_app, db, models
from flask_migrate import Migrate
from flask import request, session

app = create_app("development")

migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return { "db":db, "User":models.User, "Group":models.Group, "Word":models.Word }

@app.before_request
def before_request():
    session.permament = True

if __name__ == "__main__":
    app.run()