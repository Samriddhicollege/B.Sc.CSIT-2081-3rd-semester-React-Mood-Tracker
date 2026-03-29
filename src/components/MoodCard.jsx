import React, { useState } from "react";
import "../styles/MoodCard.css";

const EMOJIS = ["😊", "😢", "😡", "😍", "😌", "🎉"];

export default function MoodCard({ mood, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editEmoji, setEditEmoji] = useState(mood.emoji);
  const [editText, setEditText] = useState(mood.text);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this mood log?")) {
      onDelete(mood.id);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (onEdit(mood.id, editEmoji, editText)) {
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditEmoji(mood.emoji);
    setEditText(mood.text);
    setIsEditing(false);
  };

  const handleEmojiChange = (emoji) => {
    setEditEmoji(emoji);
  };

  const handleTextChange = (e) => {
    setEditText(e.target.value);
  };

  if (isEditing) {
    return (
      <div className="mood-card mood-card-edit">
        <div className="mood-card-header">
          <span className="mood-time">{mood.date}</span>
        </div>

        <div className="mood-card-edit-content">
          <div className="edit-emoji-selector">
            <p className="edit-emoji-label">Select mood:</p>
            <div className="edit-emoji-grid">
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  className={`edit-emoji-btn ${editEmoji === emoji ? "active" : ""}`}
                  onClick={() => handleEmojiChange(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <textarea
            className="edit-text-input"
            value={editText}
            onChange={handleTextChange}
            placeholder="Update your mood note..."
            rows="3"
          />

          <div className="edit-actions">
            <button
              className="edit-save-btn"
              onClick={handleSaveEdit}
              disabled={editText.trim().length < 3}
            >
              Save
            </button>
            <button className="edit-cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-card">
      <div className="mood-card-header">
        <span className="mood-emoji">{mood.emoji}</span>
        <span className="mood-time">{mood.date}</span>
      </div>

      <div className="mood-card-content">
        <p className="mood-text">{mood.text}</p>
      </div>

      <div className="mood-card-footer">
        <button
          className="edit-btn"
          onClick={handleEditClick}
          title="Edit this mood log"
        >
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={handleDelete}
          title="Delete this mood log"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
