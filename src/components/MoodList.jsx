import React, { useState, useEffect } from 'react';
import MoodCard from './MoodCard';
import '../styles/MoodList.css';

export default function MoodList({ moods, onDelete, onEdit }) {
  const [visibleMoods, setVisibleMoods] = useState(new Set());
  const observerRef = React.useRef(null);

  useEffect(() => {
    // Create Intersection Observer for lazy loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleMoods((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Additional effect to observe mood cards when they mount
  useEffect(() => {
    const cards = document.querySelectorAll('.mood-card-lazy');
    cards.forEach((card) => {
      if (observerRef.current) {
        observerRef.current.observe(card);
      }
    });

    return () => {
      cards.forEach((card) => {
        if (observerRef.current) {
          observerRef.current.unobserve(card);
        }
      });
    };
  }, [moods]);

  // Conditional Rendering: Display empty state if no logs exist
  if (moods.length === 0) {
    return (
      <div className="mood-list">
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <h3>No mood logs yet</h3>
          <p>Start tracking your emotions by logging your first mood above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mood-list">
      <h2>Your Mood History</h2>
      <div className="moods-container">
        {moods.map((mood) => (
          <div
            key={mood.id}
            id={`mood-${mood.id}`}
            className="mood-card-lazy"
            data-loaded={visibleMoods.has(`mood-${mood.id}`)}
          >
            {visibleMoods.has(`mood-${mood.id}`) ? (
              <MoodCard mood={mood} onDelete={onDelete} onEdit={onEdit} />
            ) : (
              <div className="mood-card-skeleton">
                <div className="skeleton-emoji"></div>
                <div className="skeleton-text"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
