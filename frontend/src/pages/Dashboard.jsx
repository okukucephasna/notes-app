import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [editing, setEditing] = useState(null);
    const [selectedNoteId, setSelectedNoteId] = useState(null);
    const navigate = useNavigate();

    // Load notes after login
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
            alert("Failed to fetch notes. Check connection/backend.");
        }
    };

    const handleAddOrUpdate = async () => {
        if (!title || !body) return alert("Both title and body are required.");

        try {
            if (editing !== null) {
                await axios.put(`http://localhost:5000/notes/${editing}`, { title, body });
            } else {
                await axios.post("http://localhost:5000/notes", { title, body });
            }

            setTitle("");
            setBody("");
            setEditing(null);
            loadNotes();

            const modalEl = document.getElementById("noteModal");
            if (modalEl) {
                const modal = window.bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
        } catch (err) {
            console.error("Error saving note:", err);
            alert("Failed to save note.");
        }
    };

    const openEditModal = (note) => {
        setTitle(note.title);
        setBody(note.body);
        setEditing(note.id);
        const modalEl = document.getElementById("noteModal");
        if (modalEl) {
            new window.bootstrap.Modal(modalEl).show();
        }
    };

    const openNewModal = () => {
        setTitle("");
        setBody("");
        setEditing(null);
        const modalEl = document.getElementById("noteModal");
        if (modalEl) {
            new window.bootstrap.Modal(modalEl).show();
        }
    };

    const confirmDelete = (id) => {
        setSelectedNoteId(id);
        const modalEl = document.getElementById("deleteModal");
        if (modalEl) {
            new window.bootstrap.Modal(modalEl).show();
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/notes/${selectedNoteId}`);
            setSelectedNoteId(null);
            loadNotes();

            const modalEl = document.getElementById("deleteModal");
            if (modalEl) {
                const modal = window.bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();
            }
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
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">📓 Focus Notes</h2>
                <div>
                    <button className="btn btn-success me-2" onClick={openNewModal}>+ Add Note</button>
                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                </div>
            </div>

            {/* Notes List */}
            {notes.length === 0 ? (
                <p className="text-muted text-center">No notes available. Start by adding one!</p>
            ) : (
                <div className="row">
                    {notes.map(note => (
                        <div className="col-md-6 col-lg-4 mb-4" key={note.id}>
                            <div className="card shadow-sm h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">{note.body}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => openEditModal(note)}>Edit</button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(note.id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Note Modal (Add/Edit) */}
            <div className="modal fade" id="noteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content shadow">
                        <div className="modal-header">
                            <h5 className="modal-title">{editing ? "Edit Note" : "New Note"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                            <input
                                className="form-control mb-3"
                                placeholder="Note Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Note Body"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button className="btn btn-primary" onClick={handleAddOrUpdate}>
                                {editing ? "Update" : "Add"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-sm modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center py-4">
                            <h5 className="mb-3">Are you sure?</h5>
                            <p className="text-muted small">This note will be permanently deleted.</p>
                            <div className="d-flex justify-content-center gap-2">
                                <button className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
