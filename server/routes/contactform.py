from flask import Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource, reqparse
from datetime import datetime
from models import ContactFormSubmission, db
from serializer import ContactFormSubmissionSchema, contact_form_submission_schema, contact_form_submissions_schema

from flask_jwt_extended import jwt_required, get_jwt_identity

contact_form_bp = Blueprint('contact_form_bp', __name__)

api = Api(contact_form_bp)

contact_form_parser = reqparse.RequestParser()
contact_form_parser.add_argument('name', type=str, required=True, help='Name is required')
contact_form_parser.add_argument('email', type=str, required=True, help='Email is required')
contact_form_parser.add_argument('message', type=str, required=True, help='Message is required')


patch_contactform_parser = reqparse.RequestParser()
patch_contactform_parser.add_argument('name', type=str, required=False)
patch_contactform_parser.add_argument('email', type=str, required=False)
patch_contactform_parser.add_argument('message', type=str, required=False)


class ContactFormSubmissions(Resource):
    def get(self):
        submissions = ContactFormSubmission.query.all()
        result = contact_form_submissions_schema.dump(submissions)
        return make_response(jsonify(result), 200)
    
    def post(self):
        data = contact_form_parser.parse_args()
        new_submission = ContactFormSubmission(**data)
        db.session.add(new_submission)
        db.session.commit()
        return make_response(jsonify(contact_form_submission_schema.dump(new_submission)), 201)

api.add_resource(ContactFormSubmissions, '/contact-form-submissions')

class ContactFormSubmissionByID(Resource):
    def get(self, id):
        contact_form = ContactFormSubmission.query.get(id)
        if not contact_form:
            return make_response(jsonify({'error': 'contact form  not found'}), 404)
        return make_response(jsonify(contact_form_submission_schema.dump(contact_form)), 200)
    
    @jwt_required()
    def delete(self, id):
        submission = ContactFormSubmission.query.get(id)
        if not submission:
            return make_response(jsonify({'message': 'Submission not found'}), 404)
        db.session.delete(submission)
        db.session.commit()
        return make_response(jsonify({'message': 'Submission deleted successfully'}), 200)

 
    @jwt_required()
    def patch(self, id):
        contactform = ContactFormSubmission.query.get(id)
        if not contactform:
            return make_response(jsonify({'message': 'Contact form submission not found'}), 404)
        
        data = patch_contactform_parser.parse_args()
        for key, value in data.items():
            if value is not None:
                setattr(contactform, key, value)
        
        db.session.commit()
        return make_response(jsonify(contact_form_submission_schema.dump(contactform)), 200)

api.add_resource(ContactFormSubmissionByID, '/contact-form-submission/<int:id>')

