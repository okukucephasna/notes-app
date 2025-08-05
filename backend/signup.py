from flask import request
from flask_restful import Resource
from db import get_db_connection
import hashlib

class SignUp(Resource):
    def post(self):
        try:
            data = request.get_json()

            # Validate input
            email = data.get('email')
            password = data.get('password')

            if not email or not password:
                return {"message": "Email and password are required"}, 400

            # Hash password securely
            hashed_password = hashlib.sha256(password.encode()).hexdigest()

            # Connect to DB
            conn = get_db_connection()
            with conn.cursor() as cursor:
                # Check if user already exists
                cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
                if cursor.fetchone():
                    return {"message": "User already exists"}, 400

                # Insert user
                cursor.execute(
                    "INSERT INTO users (email, password) VALUES (%s, %s)",
                    (email, hashed_password)
                )
                conn.commit()

            return {"message": "User registered successfully"}, 201

        except Exception as e:
            print("Signup Error:", e)
            return {"message": "Server error during signup"}, 500

        finally:
            if 'conn' in locals():
                conn.close()
