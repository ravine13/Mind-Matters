from flask import Flask, Blueprint
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager 
from flask_bcrypt import Bcrypt  
import os
from dotenv import load_dotenv 
from models import db
from Auth import auth_bp
from routes.users import user_bp
from serializer import serializer_bp
from routes.contactform import contact_form_bp
from routes.Appointment import appointment_bp


jwt = JWTManager()
bcrypt = Bcrypt()

load_dotenv()


def create_app():
    app = Flask(__name__)    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY') 
    
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    migrate = Migrate(app, db)
    

    app.register_blueprint(auth_bp)
    app.register_blueprint(user_bp)
    app.register_blueprint(serializer_bp)
    app.register_blueprint(appointment_bp)
    app.register_blueprint(contact_form_bp)
   
    CORS(app, resources={r"*": {"origins": "*"}})
    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True, port=5555)