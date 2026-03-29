import React, { useState, useEffect } from 'react';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import MoodSummary from './components/MoodSummary';
import './styles/MoodContainer.css';

const STORAGE_KEY = 'mood_tracker_data';

export default function MoodContainer() {
  const [moods, setMoods] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedMoods = localStorage.getItem(STORAGE_KEY);
    if (storedMoods) {
      try {
        setMoods(JSON.parse(storedMoods));
      } catch (err) {
        console.error('Failed to parse localStorage data:', err);
      }
    }
  }, []);

  // Save data to localStorage on every state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(moods));
  }, [moods]);

  const addMood = (emoji, text) => {
    // Validation: prevent empty strings or notes shorter than 3 characters
    if (!emoji || !text || text.trim().length < 3) {
      alert('Please select an emoji and enter a note with at least 3 characters.');
      return;
    }

    const newMood = {
      id: Date.now(),
      emoji: emoji,
      text: text.trim(),
      date: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    setMoods([newMood, ...moods]);
  };

  const deleteMood = (id) => {
    setMoods(moods.filter(mood => mood.id !== id));
  };

  const editMood = (id, newEmoji, newText) => {
    // Validation: prevent empty strings or notes shorter than 3 characters
    if (!newEmoji || !newText || newText.trim().length < 3) {
      alert('Please select an emoji and enter a note with at least 3 characters.');
      return false;
    }

    setMoods(moods.map(mood =>
      mood.id === id
        ? { ...mood, emoji: newEmoji, text: newText.trim() }
        : mood
    ));
    return true;
  };

  return (
    <div className="mood-container">
      <MoodForm onAddMood={addMood} />
      
      {moods.length > 0 && (
        <div className="mood-controls">
          <button 
            className="summary-toggle-btn"
            onClick={() => setShowSummary(!showSummary)}
          >
            {showSummary ? 'Hide Summary' : 'Show Summary'}
          </button>
        </div>
      )}

      {showSummary && moods.length > 0 && (
        <MoodSummary moods={moods} />
      )}

      <MoodList moods={moods} onDelete={deleteMood} onEdit={editMood} />
    </div>
  );
}
