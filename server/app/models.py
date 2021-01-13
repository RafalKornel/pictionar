from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from . import db, login_manager
from werkzeug.security import check_password_hash, generate_password_hash


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


associations = db.Table("associations", 
    db.Column("user_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("group_id", db.Integer, db.ForeignKey("groups.id")),
)


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True, nullable=False)
    _password_hash = db.Column(db.String(200), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))
    
    groups = db.relationship("Group", 
                secondary=associations,
                backref=db.backref("users", lazy="dynamic"),
                lazy="dynamic")

    words = db.relationship("Word", backref="user")
    themes = db.relationship("Theme", backref="user")

    def groups_parsed(self):
        return list(
                    map(
                        lambda g : 
                        { 
                            "name": g.name, 
                            "key": g.key,
                            "count": len(g.words)
                        }, 
                        self.groups.all()
                    )
                )

    def group_names(self):
        return list(
                    map(
                        lambda g : g.name, 
                        self.groups.all()
                    )
                )

    def themes_parsed(self):
        return list(
            map(
                lambda t : t.parse()
            , self.themes
            )
        )

    @property
    def password(self):
        return AttributeError("Attribute not accessible.")

    @password.setter
    def password(self, password):
        self._password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self._password_hash, password)

    def __repr__(self):
        return f"<User {self.name} | groups {self.groups.all()}>"


class Group(db.Model):
    __tablename__ = "groups"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=True)
    key = db.Column(db.String(30), unique=True)
    words = db.relationship("Word", backref="group")
    #users = db.relationship("User", backref="group")



    def __repr__(self):
        return f"<Group {self.name}>"


class Word(db.Model):
    __tablename__ = "words"
    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    group_id = db.Column(db.Integer, db.ForeignKey("groups.id"))

    def format(self):
        return {"word": self.word,
                "user": self.user.name }

    def __repr__(self):
        return f"<Word {self.word}>"


class Theme(db.Model):
    __tablename__ = "themes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    gradient_light = db.Column(db.String(7), nullable=False)
    gradient_dark = db.Column(db.String(7), nullable=False)
    text_color = db.Column(db.String(7), nullable=False)
    main_color = db.Column(db.String(7), nullable=False)
    accent_color = db.Column(db.String(7), nullable=False)


    def parse(self):
        return {
            "name": self.name,
            "colors": {
                "--gradient-light": self.gradient_light,
                "--gradient-dark": self.gradient_dark,
                "--text-color": self.text_color,
                "--form-color": self.main_color,
                "--input-color": self.accent_color
            }
        }