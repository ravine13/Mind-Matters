from flask import Flask, Blueprint, jsonify, make_response, request
from flask_restful import Api, Resource, reqparse
from flask_marshmallow import Marshmallow
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema
from models import Appointment, db
from flask_jwt_extended import jwt_required
from serializer import AppointmentSchema, appointment_schema, appointments_schema
from datetime import datetime

appointment_bp = Blueprint('appointment_bp', __name__)
api = Api(appointment_bp)

# Appointment parser for creating a new appointment
appointment_parser = reqparse.RequestParser()
appointment_parser.add_argument('appointment_date', type=str, required=True, help='Appointment date is required (YYYY-MM-DD)')
appointment_parser.add_argument('appointment_time', type=str, required=True, help='Appointment time is required (HH:MM:SS)')
appointment_parser.add_argument('client_id', type=int, required=True, help='Client ID is required')
appointment_parser.add_argument('notes', type=str, help='Notes are optional')

# Appointment parser for updating an existing appointment
appointment_patch_parser = reqparse.RequestParser()
appointment_patch_parser.add_argument('appointment_date', type=str, required=False, help='Appointment date is optional (YYYY-MM-DD)')
appointment_patch_parser.add_argument('appointment_time', type=str, required=False, help='Appointment time is optional (HH:MM:SS)')
appointment_patch_parser.add_argument('client_id', type=int, required=False, help='Client ID is optional')
appointment_patch_parser.add_argument('notes', type=str, required=False, help='Notes are optional')

# Schemas for serializing the appointments
appointment_schema = AppointmentSchema()
appointments_schema = AppointmentSchema(many=True)

class Appointments(Resource):
    # @jwt_required()
    def get(self):
        appointments = Appointment.query.all()
        result = appointments_schema.dump(appointments)
        return make_response(jsonify(result), 200)
    
    # @jwt_required()
    def post(self):
        data = appointment_parser.parse_args()

        # Convert date and time strings to datetime objects
        appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d').date()
        appointment_time = datetime.strptime(data['appointment_time'], '%H:%M:%S').time()

        new_appointment = Appointment(
            appointment_date=appointment_date,
            appointment_time=appointment_time,
            client_id=data['client_id'],
            notes=data['notes']
        )

        db.session.add(new_appointment)
        db.session.commit()

        return make_response(jsonify(appointment_schema.dump(new_appointment)), 201)

api.add_resource(Appointments, '/appointments')

class AppointmentByID(Resource):
    # @jwt_required()
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

        if data['appointment_date']:
            appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d').date()
            appointment.appointment_date = appointment_date

        if data['appointment_time']:
            appointment_time = datetime.strptime(data['appointment_time'], '%H:%M:%S').time()
            appointment.appointment_time = appointment_time

        if data['client_id'] is not None:
            appointment.client_id = data['client_id']

        if data['notes'] is not None:
            appointment.notes = data['notes']

        db.session.commit()

        return make_response(jsonify(appointment_schema.dump(appointment)), 200)

    @jwt_required()
    def delete(self, id):
        appointment = Appointment.query.get(id)
        if not appointment:
            return make_response(jsonify({'message': 'Appointment not found'}), 404)
        db.session.delete(appointment)
        db.session.commit()
        return make_response(jsonify({'message': 'Appointment deleted successfully'}), 200)

api.add_resource(AppointmentByID, '/appointment/<int:id>')
