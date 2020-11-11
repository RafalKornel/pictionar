from flask import Blueprint, session

auth = Blueprint("auth", __name__)

from . import views, forms
