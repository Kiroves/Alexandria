from flask import Flask

from .routes.main import main_blueprint  # Import the blueprint
from .routes.textbook import textbook_blueprint
import firebase_admin
from firebase_admin import credentials

import os
import dotenv

dotenv.load_dotenv()

def create_app():
    app = Flask(__name__)

    cred = credentials.Certificate(os.getenv('FIREBASE_CRED_PATH'))
    firebase_admin.initialize_app(cred)

    app.register_blueprint(main_blueprint) 
    app.register_blueprint(textbook_blueprint) 

    return app