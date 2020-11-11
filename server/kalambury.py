from app import create_app, db, models
from flask_migrate import Migrate

app = create_app("development")

migrate = Migrate(app, db)

@app.shell_context_processor
def make_shell_context():
    return { "db":db, "User":models.User, "Group":models.Group, "Word":models.Word }

if __name__ == "__main__":
    app.run()