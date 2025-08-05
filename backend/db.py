import pymysql

def get_db_connection():
    return pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='focus_notes',
        cursorclass=pymysql.cursors.DictCursor
    )
