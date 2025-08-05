from flask_restful import Resource, reqparse
from flask import request
from db import get_db_connection

note_parser = reqparse.RequestParser()
note_parser.add_argument("title", type=str, required=True)
note_parser.add_argument("body", type=str, required=True)

class Notes(Resource):
    def get(self):
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT * FROM notes ORDER BY id DESC")
            notes = cursor.fetchall()
        conn.close()
        return notes

    def post(self):
        args = note_parser.parse_args()
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("INSERT INTO notes (title, body) VALUES (%s, %s)", (args['title'], args['body']))
            conn.commit()
        conn.close()
        return {"message": "Note added"}, 201

class Note(Resource):
    def put(self, note_id):
        args = note_parser.parse_args()
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("UPDATE notes SET title=%s, body=%s WHERE id=%s", (args['title'], args['body'], note_id))
            conn.commit()
        conn.close()
        return {"message": "Note updated"}

    def delete(self, note_id):
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM notes WHERE id=%s", (note_id,))
            conn.commit()
        conn.close()
        return {"message": "Note deleted"}
