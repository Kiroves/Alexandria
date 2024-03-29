from flask import Blueprint, jsonify, request

main_blueprint = Blueprint('main', __name__)

@main_blueprint.route('/', methods = ['GET', 'POST'])
def hello():
    if request.method == 'GET':
        return jsonify({'error': 'get'}), 400
    else:
        return jsonify({'error': 'User email not provided'}), 400