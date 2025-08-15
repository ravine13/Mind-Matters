from flask import Blueprint, jsonify, make_response
from flask_restful import Api, Resource, reqparse
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import datetime
from models import Appointment, db

appointment_bp = Blueprint('appointment_bp', __name__)
api = Api(appointment_bp)

# -------- Parsers --------
appointment_parser = reqparse.RequestParser()
appointment_parser.add_argument('appointment_date', type=str, required=True, help='YYYY-MM-DD')
appointment_parser.add_argument('appointment_time', type=str, required=True, help='HH:MM:SS')
appointment_parser.add_argument('notes', type=str)

appointment_patch_parser = reqparse.RequestParser()
appointment_patch_parser.add_argument('appointment_date', type=str)
appointment_patch_parser.add_argument('appointment_time', type=str)
appointment_patch_parser.add_argument('notes', type=str)

# -------- Helpers --------
def serialize_appointment(appt):
    """Return appointment dict with nested client info."""
    return {
        "id": appt.id,
        "appointment_date": appt.appointment_date.isoformat(),
        "appointment_time": appt.appointment_time.strftime("%H:%M:%S"),
        "notes": appt.notes,
        "client_id": appt.client_id,
        "client": {
            "id": appt.client.id,
            "username": appt.client.username,
            "email": appt.client.email
        } if appt.client else None
    }

# -------- Resources --------
class Appointments(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        appointments = Appointment.query.filter_by(client_id=user_id).order_by(
            Appointment.appointment_date.asc(),
            Appointment.appointment_time.asc()
        ).all()
        return make_response(jsonify([serialize_appointment(a) for a in appointments]), 200)

    @jwt_required()
    def post(self):
        data = appointment_parser.parse_args()
        user_id = get_jwt_identity()

        try:
            appt_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d').date()
            appt_time = datetime.strptime(data['appointment_time'], '%H:%M:%S').time()
        except ValueError:
            return make_response(jsonify({"error": "Invalid date/time format"}), 400)

        new_appt = Appointment(
            appointment_date=appt_date,
            appointment_time=appt_time,
            client_id=user_id,
            notes=data.get('notes')
        )

        db.session.add(new_appt)
        db.session.commit()
        return make_response(jsonify(serialize_appointment(new_appt)), 201)

api.add_resource(Appointments, '/appointments')


class AppointmentByID(Resource):
    @jwt_required()
    def get(self, id):
        user_id = get_jwt_identity()
        appt = Appointment.query.filter_by(id=id, client_id=user_id).first()
        if not appt:
            return make_response(jsonify({'error': 'Not found'}), 404)
        return make_response(jsonify(serialize_appointment(appt)), 200)

    @jwt_required()
    def patch(self, id):
        user_id = get_jwt_identity()
        appt = Appointment.query.filter_by(id=id, client_id=user_id).first()
        if not appt:
            return make_response(jsonify({'error': 'Not found'}), 404)

        data = appointment_patch_parser.parse_args()
        if data['appointment_date']:
            try:
                appt.appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d').date()
            except ValueError:
                return make_response(jsonify({"error": "Invalid appointment_date"}), 400)
        if data['appointment_time']:
            try:
                appt.appointment_time = datetime.strptime(data['appointment_time'], '%H:%M:%S').time()
            except ValueError:
                return make_response(jsonify({"error": "Invalid appointment_time"}), 400)
        if data['notes'] is not None:
            appt.notes = data['notes']

        db.session.commit()
        return make_response(jsonify(serialize_appointment(appt)), 200)

    @jwt_required()
    def delete(self, id):
        user_id = get_jwt_identity()
        appt = Appointment.query.filter_by(id=id, client_id=user_id).first()
        if not appt:
            return make_response(jsonify({'error': 'Not found'}), 404)

        db.session.delete(appt)
        db.session.commit()
        return make_response(jsonify({'message': 'Deleted'}), 200)

api.add_resource(AppointmentByID, '/appointment/<int:id>')
