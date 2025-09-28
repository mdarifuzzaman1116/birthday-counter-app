# 👶 Inaya's Birthday Counter App

A beautiful web application to track Inaya's growth with daily counters and photo memories.

## Features

- **📅 Age Counter**: Real-time tracking of days, hours, minutes, and seconds since birth
- **📸 Photo Gallery**: Capture and store daily photos with timestamps
- **🔄 Gallery Views**: Switch between list and grid layouts
- **📱 Mobile Optimized**: Works perfectly on both desktop and mobile devices
- **💾 Local Storage**: Photos stored securely in browser's local storage

## Live Demo

🌟 **[View Live App](https://mdarifuzzaman1116.github.io/birthday-counter-app/)**

## Birthday Details

- **Name**: Inaya
- **Birth Date**: August 5, 2025
- **Birth Time**: 1:50 AM EST

## How to Use

1. **Counter Page**: View real-time age counter
2. **Camera Page**: 
   - Click "🧪 Test Add Photo" to add a test image
   - Click "📱 Upload from Gallery" to add photos from your device
   - Use "Start Camera" to take live photos (on supported devices)
3. **Gallery Page**: 
   - View all photos in chronological order
   - Switch between "Newest First" and "Oldest First" sorting
   - Toggle between "List View" and "Grid View"
   - Delete photos with the 🗑️ button

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: Browser LocalStorage API
- **Camera**: MediaDevices API for photo capture
- **Responsive**: Mobile-first design with CSS Grid/Flexbox
- **Deployment**: GitHub Pages

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/mdarifuzzaman1116/birthday-counter-app.git
   cd birthday-counter-app
   ```

2. Start a local server:
   ```bash
   python3 -m http.server 8000
   # OR
   npx http-server
   ```

3. Open `http://localhost:8000` in your browser

## File Structure

```
birthday-counter-app/
├── index.html          # Main HTML structure
├── style.css          # All styles and responsive design
├── script.js          # JavaScript functionality
├── README.md          # This file
└── .gitignore         # Git ignore rules
```

## Browser Compatibility

- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Edge (Desktop & Mobile)

## Features in Detail

### Age Counter
- Updates in real-time every second
- Shows days, hours, minutes, and seconds
- Beautiful gradient card design

### Photo Gallery
- Stores photos with metadata (date, time, age in days)
- Chronological sorting options
- Responsive list and grid views
- Photo viewer modal
- Delete functionality

### Mobile Optimization
- Touch-friendly interface
- Optimized image sizes for mobile
- Responsive navigation
- Fixed viewport issues

---

Made with ❤️ for Inaya's precious moments