from flask import Flask, send_from_directory
from flask_restful import Api
from signup import SignUp
from signin import SignIn
from initdb import init_db
from api import Notes, Note
from flask_cors import CORS
import os

# Set absolute path to frontend/build
FRONTEND_BUILD_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/build"))

app = Flask(__name__, static_folder=FRONTEND_BUILD_PATH, static_url_path="")

# Enable CORS only for allowed frontend dev origins (useful during development)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})

api = Api(app)
init_db()  # <--- make sure this runs at startup

# API routes
api.add_resource(SignUp, "/signup")
api.add_resource(SignIn, "/signin")
api.add_resource(Notes, "/notes")
api.add_resource(Note, "/notes/<int:note_id>")

# Serve React build files
@app.route("/")
@app.route("/<path:path>")
def serve_react(path=""):
    file_path = os.path.join(FRONTEND_BUILD_PATH, path)
    if path != "" and os.path.exists(file_path):
        return send_from_directory(FRONTEND_BUILD_PATH, path)
    else:
        return send_from_directory(FRONTEND_BUILD_PATH, "index.html")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

