#hi
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import json
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import os

app = Flask(__name__)
CORS(app)
load_dotenv()
cred = credentials.Certificate("path/to/your/firebase/credentials.json")
firebase_admin.initialize_app(cred)
def get_textbooks(user_email):
    db = firestore.client()
    user_ref = db.collection('users').document(user_email)
    user_data = user_ref.get().to_dict()

    if user_data and 'textbooks' in user_data:
        return user_data['textbooks']
    else:
        return []

# Function to add a textbook to a user's list
def add_textbook(user_email, textbook_id):
    db = firestore.client()
    user_ref = db.collection('users').document(user_email)

    # Get existing textbooks or create an empty list
    user_data = user_ref.get().to_dict()
    textbooks = user_data.get('textbooks', [])

    # Add the new textbook id to the list
    textbooks.append(textbook_id)

    # Update the user's document in Firestore
    user_ref.set({'textbooks': textbooks}, merge=True)

# Flask endpoint for handling GET and POST requests
@app.route('/textbooks', methods=['GET', 'POST'])
def textbooks():
    if request.method == 'GET':
        user_email = request.args.get('email')

        if user_email:
            textbook_ids = get_textbooks(user_email)
            return jsonify({'textbook_ids': textbook_ids})
        else:
            return jsonify({'error': 'User email not provided'}), 400

    elif request.method == 'POST':
        user_email = request.json.get('email')
        textbook_id = request.json.get('textbook_id')

        if user_email and textbook_id:
            add_textbook(user_email, textbook_id)
            return jsonify({'message': 'Textbook added successfully'})
        else:
            return jsonify({'error': 'User email or textbook_id not provided'}), 400

if __name__ == '__main__':
    app.run(debug=True)