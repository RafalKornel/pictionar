from flask_wtf import FlaskForm
from wtforms import StringField, ValidationError
from wtforms.validators import DataRequired, Length, Regexp
from ..models import Theme

name_regex = Regexp('^[A-Za-z][A-Za-z0-9 ]*$', 0, 
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

    def validate_name(self, field):
        theme = Theme.query.filter_by(name=field.data).first()
        if theme:
            raise ValidationError("Theme already added")