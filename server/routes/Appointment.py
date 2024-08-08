from flask import Flask, Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import Appointment, db
from flask_jwt_extended import jwt_required
from serializer import AppointmentSchema, appointment_schema, appointments_schema

appointment_bp = Blueprint('appointment_bp', __name__)
api = Api(appointment_bp)

appointment_parser = reqparse.RequestParser()
appointment_parser.add_argument('appointment_date', type=str, required=True, help='Appointment date is required')
appointment_parser.add_argument('appointment_time', type=str, required=True, help='Appointment time is required')
appointment_parser.add_argument('client_id', type=int, required=True, help='Client ID is required')
appointment_parser.add_argument('notes', type=str, help='Notes are optional')

appointment_patch_parser = reqparse.RequestParser()
appointment_patch_parser.add_argument('appointment_date', type=str, required=False, help='Appointment date is required')
appointment_patch_parser.add_argument('appointment_time', type=str, required=False, help='Appointment time is required')
appointment_patch_parser.add_argument('client_id', type=int, required=False, help='Client ID is required')
appointment_patch_parser.add_argument('notes', type=str, required=False, help='Notes for the appointment')



appointment_schema = AppointmentSchema()
appointments_schema = AppointmentSchema(many=True)

class Appointments(Resource):
    def get(self):
        appointments = Appointment.query.all()
        result = appointments_schema.dump(appointments)
        return make_response(jsonify(result), 200)
    
    # @jwt_required()
    def post(self):
        data = appointment_parser.parse_args()
        new_appointment = Appointment(**data)
        db.session.add(new_appointment)
        db.session.commit()
        return make_response(jsonify(appointment_schema.dump(new_appointment)), 201)

api.add_resource(Appointments, '/appointments')

class AppointmentByID(Resource):
    def get(self, id):
        appointment = Appointment.query.get(id)
        if not appointment:
            return make_response(jsonify({'error': 'Appointment not found'}), 404)
        return make_response(jsonify(appointment_schema.dump(appointment)), 200)

    # @jwt_required()
    def patch(self, id):
        appointment = Appointment.query.get(id)
        if not appointment:
            return make_response(jsonify({'message': 'Appointment not found'}), 404)
        
        data = appointment_patch_parser.parse_args()
        for key, value in data.items():
            if value is not None:
                setattr(appointment, key, value)
        
        db.session.commit()
        return make_response(jsonify(appointment_schema.dump(appointment)), 200)


    # @jwt_required()
    def delete(self, id):
        appointment = Appointment.query.get(id)
        if not appointment:
            return make_response(jsonify({'message': 'Appointment not found'}), 404)
        db.session.delete(appointment)
        db.session.commit()
        return make_response(jsonify({'message': 'Appointment deleted successfully'}), 200)

api.add_resource(AppointmentByID, '/appointment/<int:id>')
