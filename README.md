# Pictionar
This application allows you to manage words collections, primarly for pictionary / charades game (like [skribbl.io](https://skribbl.io/)).

You can see live demo [here](https://pictionar.herokuapp.com/). 

Register using key: *public* (or create your own group).

After login in you can add new words, or retrieve them from database.
Here's how it looks like:
<img width="700" align="center" src="showcase.gif">

To run locally, first create virtual environment:
```
python -m venv server/app/venv
```
Then install python dependencies:
```
source server/app/venv/bin/activate
pip install -r requirements.txt
```
After installing all dependencies, run:
```
gunicorn wsgi:app
```
and your app will be served.
If you are developing in react, remember to build before deploying.

### Tech stack:
On front end:
- React (originally was just HTML + CSS + vanilla JS)
- Styled components

On back end:
- Flask (python microframework)
- PostgreSQL (Sqlite3 in development environment)
- SQLAlchemy (Flask-SQLAlchemy)

### Want to contribute? Feel free to file issue with ideas, or fork and develop!

### TODO
- [ ] improve color picking feature (allow user to change, create and save themes)
- [ ] retouch "hero" component
