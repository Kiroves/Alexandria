#hi
from flask import Flask, jsonify, request
from dotenv import load_dotenv
import json
from flask_cors import CORS
from supabase import create_client, Client
import os

app = Flask(__name__)
CORS(app)
load_dotenv()


url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/supabase-data', methods=['GET'])
def get_supabase_data():
    # Fetch data from Supabase
    response = supabase.table(SUPABASE_TABLE).select('*').execute()

    # Check if the request was successful
    if response['status_code'] == 200:
        data = response['data']
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to fetch data from Supabase'}), 500

# Endpoint for POST request
@app.route('/supabase-data', methods=['POST'])
def post_supabase_data():
    # Get JSON data from the request
    data_to_insert = request.json

    # Insert data into Supabase
    response = supabase.table(SUPABASE_TABLE).upsert([data_to_insert]).execute()

    # Check if the request was successful
    if response['status_code'] == 200:
        return jsonify({'message': 'Data inserted successfully'})
    else:
        return jsonify({'error': 'Failed to insert data into Supabase'}), 500


if __name__ == '__main__':
    app.run(debug=True)