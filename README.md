# Mind Matters

Mind Matters is a comprehensive web application designed to facilitate the operations of psychologist and their clients. This application provides functionalities for user authentication and authorization, appointment scheduling and handling contact form submissions.

## Problem Solution

Mental health is a critical yet often overlooked aspect of overall well-being. Many individuals face challenges in accessing timely and effective psychological support, whether due to stigma, lack of resources, or difficulty finding the right professional help. As a result, people may struggle in silence, leading to worsened mental health conditions.

## Why "Mind Matters"?

The "Mind Matters" platform was developed with a clear mission: to make mental health support more accessible and ensure that individuals can seek help in a safe and convenient way. The platform addresses several key problems:

# Accessibility: 
Many individuals struggle to find mental health professionals or don't know how to approach them. "Mind Matters" connects clients directly with psychologists through an easy-to-use appointment scheduling system, making mental health services accessible to all.

# Confidentiality:
 Stigma can prevent people from seeking help. This platform provides a secure, confidential environment where users can reach out for professional help without fear of judgment.

# Personalized Care:
 By allowing clients to book appointments with notes and details, "Mind Matters" ensures that psychologists can provide personalized care, tailored to the specific needs of each individual.

# Timely Support: 
The platform enables quick scheduling and management of appointments, ensuring that those who need help can get it without delay, preventing issues from escalating.

# Empowering Psychologists: 
For mental health professionals, the app offers a streamlined way to manage client appointments, handle inquiries, and share valuable insights through blog posts, allowing them to extend their impact beyond one-on-one sessions.

Through "Mind Matters", we aim to make mental health a priority and provide people with the tools they need to take control of their well-being in a supportive, professional environment.

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
