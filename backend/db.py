# import pymysql

# def get_db_connection():
#     return pymysql.connect(
#         host='localhost',
#         user='root',
#         password='',
#         database='focus_notes',
#         cursorclass=pymysql.cursors.DictCursor
#     )
import os
import pymysql

def get_db_connection():
    return pymysql.connect(
        host=os.environ.get("DB_HOST", "localhost"),
        user=os.environ.get("DB_USER", "root"),
        password=os.environ.get("DB_PASSWORD", ""),
        database=os.environ.get("DB_NAME", "focus_notes"),  # <-- use focus_notes here
        cursorclass=pymysql.cursors.DictCursor
    )

