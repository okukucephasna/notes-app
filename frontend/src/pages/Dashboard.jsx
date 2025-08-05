import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [editing, setEditing] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            alert("Please sign in to access your dashboard.");
            navigate("/");
        } else {
            loadNotes();
        }
    }, []);

    const loadNotes = async () => {
        try {
            const res = await axios.get("http://localhost:5000/notes");
            setNotes(res.data);
        } catch (err) {
            console.error("Error fetching notes:", err);
            alert("Failed to fetch notes. Please check your connection or backend.");
        }
    };

    const handleAddOrUpdate = async () => {
        if (!title || !body) return alert("Both title and body are required.");

        try {
            if (editing !== null) {
                await axios.put(`http://localhost:5000/notes/${editing}`, { title, body });
                setEditing(null);
            } else {
                await axios.post("http://localhost:5000/notes", { title, body });
            }

            setTitle("");
            setBody("");
            loadNotes();
        } catch (err) {
            console.error("Error saving note:", err);
            alert("Failed to save the note.");
        }
    };

    const handleEdit = (note) => {
        setTitle(note.title);
        setBody(note.body);
        setEditing(note.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this note?")) return;

        try {
            await axios.delete(`http://localhost:5000/notes/${id}`);
            loadNotes();
        } catch (err) {
            console.error("Error deleting note:", err);
            alert("Failed to delete the note.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Focus Notes</h2>
                <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
            </div>

            <div className="card shadow-sm p-4 mb-4">
                <h5>{editing ? "Edit Note" : "New Note"}</h5>
                <input
                    className="form-control mb-2"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-3"
                    rows="4"
                    placeholder="Note Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button className="btn btn-success" onClick={handleAddOrUpdate}>
                    {editing ? "Update Note" : "Add Note"}
                </button>
            </div>

            <div className="row">
                {notes.map(note => (
                    <div className="col-md-6 col-lg-4 mb-4" key={note.id}>
                        <div className="card shadow-sm h-100">
                            <div className="card-body">
                                <h5 className="card-title">{note.title}</h5>
                                <p className="card-text">{note.body}</p>
                            </div>
                            <div className="card-footer d-flex justify-content-between">
                                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(note)}>Edit</button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(note.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
