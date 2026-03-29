# MoodTracker – Daily Emotional Log

A high-performance React application designed for personal emotional tracking. Users can select an emoji representing their current mood, add a descriptive note, and save it to a persistent history log. The app features a modern, clean UI with data visualization and full CRUD capabilities.

## 🎯 Features

- **Emoji-based Mood Selection** - 10 diverse emojis representing different emotional states
- **Persistent Storage** - All mood logs are saved to browser's localStorage
- **Mood History** - Complete log of all your mood entries with timestamps
- **Mood Summary** - Visual analytics showing your emotional distribution and dominant mood
- **Delete Function** - Remove individual mood logs with confirmation
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Validation** - Prevents submission of incomplete entries

## 📁 Project Architecture

```
Mood Tracker/
├── index.html                  # Host page with #root mounting point
├── package.json                # Project dependencies
├── vite.config.js              # Build configuration
├── .gitignore
└── src/
    ├── index.jsx               # React entry point
    ├── App.jsx                 # Layout shell
    ├── MoodContainer.jsx       # State management & business logic
    ├── components/
    │   ├── MoodForm.jsx        # User input capture
    │   ├── MoodList.jsx        # History log display
    │   ├── MoodCard.jsx        # Individual mood entry display
    │   └── MoodSummary.jsx     # Analytics & visualization
    ├── index.css               # Global styles
    └── styles/
        ├── App.css             # App layout styles
        ├── MoodContainer.css   # Container styles
        ├── MoodForm.css        # Form & emoji selector
        ├── MoodList.css        # List display styles
        ├── MoodCard.css        # Card styling
        └── MoodSummary.css     # Summary & analytics styles
```

## 🔧 Technical Implementation

### State Management
- **useState** for managing moods array and form inputs
- Centralized state in MoodContainer component

### Side Effects (useEffect)
- **Effect 1**: Load data from localStorage on component mount
- **Effect 2**: Save data to localStorage on every state change

### Event Handling
- `onClick` for emoji selection
- `onChange` for note input
- `onSubmit` for form submission

### Props Flow
- Data and handler functions passed from parent to child components
- Props drilling maintains clean component hierarchy

### Data Persistence
```javascript
{
  id: 1711110000000,        // Unique timestamp
  emoji: "😊",              // Emoji string
  text: "How you felt",      // User's note
  date: "12:45 PM"           // Formatted time
}
```

### CRUD Operations
- **Create**: `addMood()` - Adds new mood entry
- **Read**: State mapping in MoodList and MoodSummary
- **Update**: Currently via delete/recreate
- **Delete**: `deleteMood()` - Filters out mood by ID

## 🎨 Design System

### Color Palette
- **Primary**: #667eea (Purple-Blue)
- **Secondary**: #764ba2 (Purple)
- **Success**: #48bb78 (Green)
- **Danger**: #f56565 (Red)
- **Background**: White with gradient backgrounds

### Typography
- **Font Family**: System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)
- **Responsive**: Scales beautifully from mobile to desktop

### Component Spacing
- Consistent use of CSS variables for spacing and sizing
- Flexbox and CSS Grid for layouts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Navigate to project directory
2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 💾 Data Storage

The application uses **localStorage** to persist mood data:
- Key: `mood_tracker_data`
- Format: JSON stringified array of mood objects
- Data persists across browser sessions
- Clear browser data to reset

## ✅ Validation Rules

1. **Emoji Selection**: Required - must select one before submission
2. **Note Content**: 
   - Minimum 3 characters
   - Cannot be empty or whitespace only
   - Maximum 500 characters (with character counter)

## 📊 Mood Summary Features

The summary component calculates:
- **Total Logs**: Count of all mood entries
- **Dominant Mood**: Most frequently logged emotion
- **Mood Distribution**: Percentage breakdown of each emoji with visual bars

## 🔄 Component Communication

```
App
└── MoodContainer (State Management)
    ├── MoodForm (User Input)
    ├── MoodList (Display History)
    │   └── MoodCard (Individual Entry)
    └── MoodSummary (Analytics)
```

## 📱 Responsive Breakpoints

- Desktop: 900px max-width container
- Tablet: Adjusted padding and font sizes
- Mobile: Single column layouts, touch-friendly buttons

## 🎯 Best Practices Implemented

✅ **Separation of Concerns**: Container vs. Presentational components
✅ **DRY Principle**: Reusable MoodCard component
✅ **Key Lists**: Using unique IDs for list rendering
✅ **Error Handling**: Try-catch for localStorage parsing
✅ **Accessibility**: Semantic HTML, proper form labels
✅ **Performance**: useMemo for mood statistics calculation
✅ **Professional Styling**: CSS Variables, gradients, hover effects
✅ **Mobile-First Design**: Responsive CSS with media queries

## 📝 License

This project is open source and available for personal use.

## 🤝 Contributing

Feel free to fork, modify, and extend this project!

---

**Made with ❤️ for better emotional awareness**
