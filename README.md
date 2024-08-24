# Mind Matters

Mind Matters is a comprehensive web application designed to facilitate the operations of psychologist and their clients. This application provides functionalities for user authentication and authorization, appointment scheduling and handling contact form submissions.

# Features
User Management: Supports user registration and login, with user roles for psychologists and clients.

Appointment Scheduling: Allows clients to schedule appointments with psychologist, including the ability to add notes for each appointment.

## How to Run the Application (Before Deployment)

Backend Setup
Install Dependencies: Ensure you have pipenv installed. Navigate to the backend directory and run the following commands to activate the virtual environment and install the dependencies:

pipenv shell
pipenv install
Set Environment Variables: Configure the necessary environment variables:

export PYTHONPATH=$PYTHONPATH:/path/to/main.py
export FLASK_APP=app.py
export FLASK_RUN_PORT=5555
Replace /path/to/main.py with the actual path to your main Python file.

Run the Flask Application: Start the backend server in debug mode:


flask run --debug
Frontend Setup
Navigate to the Frontend Directory: Move into the client directory and then into the mind-matters directory:


cd client
cd mind-matters
Install Dependencies and Start the Application: Run the following command to install dependencies and start the frontend server:


npm install
npm start
This will start the application on your local machine, allowing you to test all features before deployment.

# Technologies Used

Flask: A lightweight WSGI web application framework in Python.
Flask-SQLAlchemy: An extension for Flask that adds support for SQLAlchemy, an SQL toolkit and Object-Relational Mapping (ORM) system.
Flask-RESTful: An extension for Flask that adds support for quickly building REST APIs.
Flask-Marshmallow: An object serialization/deserialization library for Flask that integrates with SQLAlchemy.
Flask-Bcrypt: A Flask extension that provides bcrypt hashing utilities for application security.

# Usage

User Authentication: Register and log in as either a psychologist or a client.
Appointment Management: Schedule, view, and manage appointments.
Blog Posts: Create and manage blog posts as a psychologist.
Contact Form: Submit and manage contact form entries.

# License
This project is licensed under the MIT License. See the LICENSE file for more details.
