from flask import request
from flask_restful import Resource
from db import get_db_connection
import hashlib

class SignIn(Resource):
    def post(self):
        data = request.get_json()
        email = data.get('email')
        password = hashlib.sha256(data.get('password').encode()).hexdigest()

        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
            user = cursor.fetchone()
        conn.close()

        if user:
            return {"message": "Login successful", "email": user["email"]}, 200
        else:
            return {"message": "Invalid credentials"}, 401
