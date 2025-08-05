# init_db.py

from db import get_db_connection

def init_db():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            # Create `users` table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                )
            """)

            # Create `notes` table
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS notes (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    body TEXT NOT NULL,
                    user_id INT,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )
            """)
        connection.commit()
        print("✅ Database initialized with 'users' and 'notes' tables.")
    except Exception as e:
        print("❌ Error initializing database:", e)
    finally:
        connection.close()
