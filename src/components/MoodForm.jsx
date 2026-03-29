import React, { useState } from 'react';
import '../styles/MoodForm.css';

const EMOJIS = ['😊', '😢', '😡', '�', '😌', '🎉'];

export default function MoodForm({ onAddMood }) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [noteText, setNoteText] = useState('');

  const handleEmojiClick = (emoji) => {
    // Toggle: unselect if clicking same emoji, otherwise select new one
    if (selectedEmoji === emoji) {
      setSelectedEmoji(null);
    } else {
      setSelectedEmoji(emoji);
    }
  };

  const handleNoteChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMood(selectedEmoji, noteText);
    // Reset form
    setSelectedEmoji(null);
    setNoteText('');
  };

  return (
    <div className="mood-form">
      <h2>How are you feeling?</h2>
      
      <div className="emoji-selector">
        <p className="emoji-label">Select your mood:</p>
        <div className="emoji-grid">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              className={`emoji-btn ${selectedEmoji === emoji ? 'active' : ''}`}
              onClick={() => handleEmojiClick(emoji)}
              title={`Select ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="note-form">
        <textarea
          className="note-input"
          placeholder="Add a note about your mood... (at least 3 characters)"
          value={noteText}
          onChange={handleNoteChange}
          rows="4"
        />
        
        <div className="form-actions">
          <span className="char-count">
            {noteText.length} / 500
          </span>
          <button
            type="submit"
            className="submit-btn"
            disabled={!selectedEmoji || noteText.trim().length < 3}
          >
            Log Mood
          </button>
        </div>
      </form>
    </div>
  );
}
