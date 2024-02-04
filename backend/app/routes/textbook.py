from flask import Blueprint, jsonify, request

textbook_blueprint = Blueprint('textbook', __name__)

@textbook_blueprint.route('/textbook', methods = ['GET', 'POST'])
def hello():
    if request.method == 'GET':
        db.collection('users').get()
        return jsonify({'error': 'get'}), 400
    else:
        return jsonify({'error': 'User email not provided'}), 400