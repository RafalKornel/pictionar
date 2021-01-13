from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length, Regexp

name_regex = Regexp('^[A-Za-z]*$', 0, 
            "Field can only contain letters.")
hex_regex = Regexp('^#[a-fA-F0-9]{6}$', 0, "Invalid color code")
color_validators = [DataRequired(), Length(7), hex_regex]

class ThemeForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), Length(1, 30), name_regex])

    gradient_light = StringField("gradient light", validators=color_validators)
    gradient_dark = StringField("gradient dark", validators=color_validators)
    text_color = StringField("text color", validators=color_validators)
    main_color = StringField("main color", validators=color_validators)
    accent_color = StringField("accent color", validators=color_validators)
