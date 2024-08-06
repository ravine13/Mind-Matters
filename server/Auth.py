from datetime import datetime
from flask import Blueprint, jsonify, abort, make_response
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
    current_user,
    get_jwt,
    get_jwt_identity 
)
from flask_restful import Resource, Api, reqparse

from models import User, db, TokenBlocklist
from routes.users import user_schema

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()
jwt = JWTManager()
api = Api(auth_bp)

# Request parsers
register_args = reqparse.RequestParser()
register_args.add_argument('username', type=str, required=True, help='Username is required')
register_args.add_argument('email', type=str, required=True, help='Email is required')
register_args.add_argument('password', type=str, required=True, help='Password is required')
register_args.add_argument('confirm_password', type=str, required=True, help='Confirm Password is required')

login_args = reqparse.RequestParser()
login_args.add_argument('email', type=str, required=True, help='Email is required')
login_args.add_argument('password', type=str, required=True, help='Password is required')

# User lookup callback
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    return User.query.get(identity)

class UserRegister(Resource):
    def post(self):
        data = register_args.parse_args()
        email = data.get('email')

        # Validate email domain
        if email.endswith('@doctor.com'):
            return make_response(jsonify(details='Email addresses with @doctor.com are not allowed'), 400)

        # Check if user already exists
        user_exists = User.query.filter_by(email=email).first()
        if user_exists:
            return make_response(jsonify(details='Conflict! Account Already Exists'), 409)

        # Check if passwords match
        if data['password'] != data['confirm_password']:
            return make_response(jsonify(details='Passwords do not match'), 422)

        # Create new user
        new_user = User(
            username=data['username'],
            email=data['email'],
            password_hash=bcrypt.generate_password_hash(data['password']).decode('utf-8')
        )
        db.session.add(new_user)
        db.session.commit()

        return make_response(jsonify(details=f'User {data["email"]} has been created successfully'), 201)

api.add_resource(UserRegister, '/register')

class AuthenticatedUser(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()  
        user = User.query.get(current_user_id)

        if user:
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
            return make_response(jsonify(user_data), 200)
        else:
            return make_response(jsonify({"error": "User not found"}), 404)

api.add_resource(AuthenticatedUser, '/authenticated_user')

class UserLogin(Resource):
    def post(self):
        data = login_args.parse_args()
        user = User.query.filter_by(email=data["email"]).first()
        
        if not user or not bcrypt.check_password_hash(user.password_hash, data["password"]):
            res =  make_response(jsonify(detail="Invalid email or password"), 401)
            return res

        token = create_access_token(identity=user.id)
        user_dict = user_schema.dump(user)
        res = make_response(jsonify(token=token, user=user_dict), 201)
        return res

api.add_resource(UserLogin, '/login')

class Logout(Resource):
    @jwt_required()
    def get(self):
        token = get_jwt()
        jti = token['jti']
        blocked_token = TokenBlocklist(jti=jti, created_at=datetime.utcnow())
        db.session.add(blocked_token)
        db.session.commit()
        res = make_response(jsonify(detail="Logged out successfully"), 200)
        return res 
    
api.add_resource(Logout, '/logout')
