from datetime import datetime
from werkzeug.security import generate_password_hash
from app import app, db  # Adjust the import as per your app structure
from models import User, Appointment, ContactFormSubmission, TokenBlocklist

# Initialize Flask app and SQLAlchemy

with app.app_context():
    # Create all tables
    session = db.session

    # Create sample data
    def seed_data():
        # Create users
        user1 = User(username='user1', email='user1@example.com', is_psychologist=False)
        user1.set_password('password1')
        user2 = User(username='user2', email='user2@example.com', is_psychologist=True)
        user2.set_password('password2')
        db.session.add(user1)
        db.session.add(user2)

        # Commit changes to the database (to get valid user IDs)
        db.session.commit()

        # Create appointments
        appointment1 = Appointment(appointment_date=datetime.now().date(), appointment_time=datetime.now().time(), client_id=user1.id, notes='Sample appointment 1')
        appointment2 = Appointment(appointment_date=datetime.now().date(), appointment_time=datetime.now().time(), client_id=user2.id, notes='Sample appointment 2')
        db.session.add(appointment1)
        db.session.add(appointment2)

        # Create contact form submissions
        contact1 = ContactFormSubmission(name='John Doe', email='john.doe@example.com', message='Sample message 1', timestamp=datetime.now())
        contact2 = ContactFormSubmission(name='Jane Doe', email='jane.doe@example.com', message='Sample message 2', timestamp=datetime.now())
        db.session.add(contact1)
        db.session.add(contact2)

        # Create token blocklist (if needed)
        token1 = TokenBlocklist(jti='sample_jti_1')
        token2 = TokenBlocklist(jti='sample_jti_2')
        db.session.add(token1)
        db.session.add(token2)

        # Commit changes to the database
        db.session.commit()

    # Call the seed_data function to populate the database
    seed_data()

print("Database seeded successfully!")
