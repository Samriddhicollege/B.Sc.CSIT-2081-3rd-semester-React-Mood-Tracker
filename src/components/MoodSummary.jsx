import React, { useMemo } from 'react';
import '../styles/MoodSummary.css';

export default function MoodSummary({ moods }) {
  // Calculate mood frequency
  const moodStats = useMemo(() => {
    const stats = {};

    moods.forEach(mood => {
      if (stats[mood.emoji]) {
        stats[mood.emoji]++;
      } else {
        stats[mood.emoji] = 1;
      }
    });

    // Convert to array and sort by frequency
    return Object.entries(stats)
      .map(([emoji, count]) => ({
        emoji,
        count,
        percentage: ((count / moods.length) * 100).toFixed(1)
      }))
      .sort((a, b) => b.count - a.count);
  }, [moods]);

  const totalLogs = moods.length;
  const dominantMood = moodStats[0];

  return (
    <div className="mood-summary">
      <h2>Your Mood Summary</h2>

      <div className="summary-stats">
        <div className="stat-card">
          <p className="stat-label">Total Logs</p>
          <p className="stat-value">{totalLogs}</p>
        </div>

        <div className="stat-card">
          <p className="stat-label">Dominant Mood</p>
          <p className="stat-value">{dominantMood?.emoji} ({dominantMood?.count})</p>
        </div>
      </div>

      <div className="mood-breakdown">
        <h3>Mood Distribution</h3>
        <div className="mood-bars">
          {moodStats.map(({ emoji, count, percentage }) => (
            <div key={emoji} className="mood-bar-item">
              <div className="mood-bar-label">
                <span className="emoji">{emoji}</span>
                <span className="count">{count}</span>
              </div>
              <div className="mood-bar-track">
                <div
                  className="mood-bar-fill"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="percentage">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
