#hi
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import json
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import os
import uuid
from main import execute_query

app = Flask(__name__)
CORS(app)
load_dotenv()
cred = credentials.Certificate("./alexandria-a4b39-firebase-adminsdk-32ahb-804d2d68bf.json")
default_app = firebase_admin.initialize_app(
    cred,
    {
        'storageBucket': os.environ.get('NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET')
    }
)
db = firestore.client()

# Flask endpoint for handling GET and POST requests
@app.route('/textbooks/<email>', methods=['GET'])
def textbooks(email):
    if request.method == 'GET':
        user_email = email
        if user_email:
            col = db.collection(email)
            documents = col.stream()
            textbooks = []

            for doc in documents:
                textbooks.append(doc.to_dict())

            if not textbooks:  # Check if no documents were found
                return jsonify({"textbooks": []})
            
            return jsonify({"textbooks": textbooks})
        else:
            return jsonify({'error': 'User email not provided'}), 400
    else:
        return jsonify({'error': 'only post and get are allowed'}), 400
# Flask endpoint for handling GET and POST requests
@app.route('/upload/<email>/<name>/<desc>/<pdf>', methods=['POST'])
def upload(email,name,desc,pdf):
    if request.method == 'POST':
        if not email or not name or not id or not pdf:
            return jsonify({'error': 'User info not provided'}), 400
        col = db.collection(email)
        new_uuid = str(uuid.uuid4())
        data = {}
        data["name"] = name
        data["id"] = new_uuid
        data["desc"] = desc
        data["pdf"] = pdf
        col.document(new_uuid).set(data)
        return jsonify({"success": True})
    else:
        return jsonify({'error': 'only post and get are allowed'}), 400
@app.route('/query/<email>/<doc>/<query>', methods=['GET'])
def query(email,doc, query):
    if request.method == 'GET':
        if not email or not query:
            return jsonify({'error': 'User info not provided'}), 400
        col = db.collection(email).document(doc)
        field_value = col.get().to_dict().get("pdf")
        # Specify the directory path
        directory_path = '/data/companion'

        # Specify the file name
        file_name = 'companion.pdf'

        # Combine the directory path and file name to create the full file path
        full_file_path = os.path.join(directory_path, file_name)

        # Open the file in write mode ('w') and write the content to it
        with open(full_file_path, 'w') as file:
            file.write(field_value)
        ret = execute_query(query)
        return jsonify({"response": ret})
    else:
        return jsonify({'error': 'only post and get are allowed'}), 400

if __name__ == '__main__':
    app.run(debug=True)