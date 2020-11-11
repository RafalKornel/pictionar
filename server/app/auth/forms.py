from flask.app import Flask
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, EqualTo, Length, Regexp, ValidationError
from ..models import User, Group

regex = Regexp('^[A-Za-z][A-Za-z0-9_.]*$', 0, 
            "Field must have only letters, numbers, dots or unserscores")

class LoginForm(FlaskForm):
    user_name = StringField("Name", validators=[DataRequired(), Length(1, 30), regex])
    user_pass = PasswordField("Password", validators=[DataRequired(), Length(1, 30), regex])


class RegisterForm(FlaskForm):
    user_name = StringField("Name", validators=[DataRequired(), Length(1, 30), regex])
    user_pass = PasswordField("Password", validators=[DataRequired(), Length(1, 30), regex])
    user_pass_repeat = PasswordField("Repeat password", validators=[
        DataRequired(), Length(1, 30), regex, 
        EqualTo("user_pass", message="Passwords must match.")])
    secret_key = StringField("Secret key", validators=[DataRequired(), Length(1, 30), regex])


    def validate_user_name(self, field):
        user = User.query.filter_by(name=field.data).first()
        if user:
            raise ValidationError("User already registered.")
        
    def validate_secret_key(self, field):
        group = Group.query.filter_by(key=field.data).first()
        if group is None:
            raise ValidationError("Group doesn't exist.")