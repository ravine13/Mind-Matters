from flask import Blueprint, current_app, make_response, jsonify
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api, reqparse, abort
from flask_bcrypt import Bcrypt
from models import User, ContactFormSubmission, Appointment
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema, auto_field
from marshmallow.fields import Nested

serializer_bp = Blueprint('serializer', __name__)
api = Api(serializer_bp)
ma = Marshmallow(serializer_bp)
bcrypt = Bcrypt()

class UserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True
        include_fk = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class AppointmentSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Appointment
        load_instance = True
        include_fk = True

appointment_schema = AppointmentSchema()
appointments_schema = AppointmentSchema(many=True)


class ContactFormSubmissionSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = ContactFormSubmission
        load_instance = True
        include_fk = True

contact_form_submission_schema = ContactFormSubmissionSchema()
contact_form_submissions_schema = ContactFormSubmissionSchema(many=True)
