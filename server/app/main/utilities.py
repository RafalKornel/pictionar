import re

def validate_word(word):
    return len(word) >= 3 and len(word) < 30 and (re.fullmatch("[a-zA-Z0-9ąćęłńóśźżĄĘŁŃÓŚŹŻ ]+", word) is not None)

def clean_input(words):
    return list(set(map(lambda w : w.strip(), words)))