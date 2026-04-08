# Wall Calendar App 📅

An interactive, tactile wall calendar component built with modern web technologies. This project was created as an assignment for **TakeUForward**.

## 🌟 Features

### Core Calendar Features
- **Interactive Monthly Calendar**: Navigate through months with smooth animations and flip transitions
- **Date Range Selection**: Click and select date ranges with visual feedback
- **Color-Coded Notes System**: Add notes to individual dates or date ranges with customizable colors
  - 8 vibrant color options: Red, Orange, Yellow, Green, Cyan, Blue, Purple, Pink
  - Visual indicators (colored dots) on dates with notes
  - Range highlights showing start, middle, and end positions

### Daily Habit Tracking
- **Daily Habit Logger**: Track daily habits with color-coded status indicators
- **Real-time Updates**: Habits are saved automatically to browser localStorage
- **Habit Management**: Add, edit, and delete habits on the fly
- **Visual Progress**: Color-coded completion status for each habit

### Notes & Events Management
- **Notes Modal**: Full-featured modal for adding and editing notes
- **Events List**: View all events from the current month with filtering and display options
- **Persistent Storage**: All data is saved in browser localStorage for continuous access
- **Edit & Delete**: Modify or remove events at any time

### Theme Support
- **Dark Mode**: Beautiful dark theme with glassmorphism effects
- **Light Mode**: Clean, minimal light theme
- **Theme Persistence**: Your theme preference is saved automatically

### Responsive Design
- **Mobile-First Approach**: Fully responsive layout on all devices
- **Breakpoint**: 1024px (Desktop: side-by-side layout | Mobile: vertical stacking)
- **Touch-Friendly UI**: 44px minimum tap targets on mobile
- **Optimized Viewport**: Proper viewport configuration for mobile browsers
- **Adaptive Typography**: Font sizes scale appropriately for different screen sizes

### Visual Enhancements
- **Glassmorphism Effects**: Modern frosted glass styling with blur effects
- **Animated Transitions**: Smooth fade-in/fade-out animations between months
- **Decorative Orbs**: Animated gradient orbs in the background for visual appeal
- **3D Page Flip**: Realistic 3D flipping animation when changing months
- **Spiral Binding**: Decorative spiral binding visual at the top

### Accessibility & UX
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Hover Effects**: Interactive feedback on desktop devices
- **Touch Support**: Optimized touch interactions for mobile devices
- **Visual Feedback**: Clear indicators for selected dates and active states
- **Responsive Grid**: 7-column calendar grid that adapts to different screen sizes

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 13+ (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Inline Styles
- **Animations**: GSAP (GreenSock Animation Platform)
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage API
- **Fonts**: Schibsted Grotesk, Inter (Google Fonts)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/meetkothariii0/Calender-TakeUFroward.git
   cd Calender-TUF1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Usage

### Navigating the Calendar
- Click the **← Prev** and **Next →** buttons to navigate between months
- The calendar automatically saves your last viewed month

### Adding Notes
1. Click on a date or select a date range
2. Click the **+ Add notes** button that appears
3. Type your notes in the modal
4. Select a color for the note
5. Click **Save** to persist

### Managing Habits
- Click the **+ Add Habit** button in the Daily Habit Logger
- Type the habit name and press Enter
- Click the habit to mark it complete for today
- Click the **X** to remove a habit

### Switching Themes
- Click the **☀️ Light** or **🌙 Dark** button in the top right
- Your theme preference is saved automatically

### Viewing Events
- All events from the current month appear in the Events list on the right sidebar
- Click on an event to edit or delete it
- On mobile, events appear below the calendar

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata and viewport config
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Calendar.tsx        # Main calendar component with layout
│   ├── CalendarGrid.tsx    # Calendar grid with date cells
│   ├── NotesModal.tsx      # Modal for adding/editing notes
│   ├── EventsList.tsx      # Events list component
│   ├── DailyHabitLogger.tsx # Habit tracking component
│   ├── HeroBackground.tsx  # Background with gradient effect
│   ├── SpiralBinding.tsx   # Decorative spiral binding
│   ├── AnimatedContent.tsx # Content animations
│   ├── SnowEffect.tsx      # Snow animation effect
│   ├── RainEffect.tsx      # Rain animation effect
│   ├── AutumnEffect.tsx    # Autumn leaves animation
│   ├── SunEffect.tsx       # Sun animation effect
│   └── ui/
│       └── Button.tsx      # Reusable button component
└── lib/
    └── utils.ts            # Utility functions
```

## 🎨 Color Palette

- **Red**: `#dc3c46`
- **Orange**: `#f97316`
- **Yellow**: `#ead80c`
- **Green**: `#22c55e`
- **Cyan**: `#06b6d4`
- **Blue**: `#3b82f6`
- **Purple**: `#a855f7`
- **Pink**: `#ec4899`

## 💾 Data Storage

All user data is stored in the browser's **localStorage**:

```
notes-{monthIndex}-{day}              # Single day notes
notes-{monthIndex}-{startDay}-{endDay} # Range notes
color-{monthIndex}-{day}              # Note color
habits-logger-{YYYY-MM-DD}            # Daily habits
calendar-month                        # Last viewed month
calendar-theme                        # Theme preference
```

## 🍱 Responsive Breakpoints

- **Mobile**: < 1024px
  - Vertical stacking layout
  - Optimized button sizes (28px)
  - Reduced font sizes
  - Full-width components
  
- **Desktop**: ≥ 1024px
  - Side-by-side layout (Calendar + Sidebar)
  - Standard button sizes (32px)
  - Full-size typography
  - Multi-column grid

## 🔧 Customization

### Modifying Colors
Edit the `COLOR_MAPPINGS` object in `CalendarGrid.tsx` to add or change note colors.

### Changing Month Navigation Animation
Update the animation duration in the `handleNextMonth` and `handlePrevMonth` functions in `Calendar.tsx`.

### Adjusting Responsive Breakpoint
Change the `1024px` threshold in:
- `Calendar.tsx` (isDesktop state)
- `CalendarGrid.tsx` (isDesktop state)
- `globals.css` (media query)

## 📱 Mobile Experience

The app is fully optimized for mobile devices:
- Touch-friendly interface with 44px+ tap targets
- Vertical stacking of all components
- Optimized font sizes for readability
- Proper viewport scaling
- No horizontal scrolling
- Smooth animations on mobile devices

## 🎯 Key Functionalities Implemented

✅ Monthly calendar navigation with smooth animations  
✅ Date range selection with visual highlights  
✅ Color-coded notes system  
✅ Daily habit tracking  
✅ Events list with filtering  
✅ Dark/Light theme toggle  
✅ Fully responsive design  
✅ LocalStorage persistence  
✅ Touch-optimized mobile UI  
✅ Decorative animations and effects  
✅ Glassmorphism UI design  
✅ Keyboard accessibility  

## 📝 Assignment Goals

This project demonstrates:
- **React Proficiency**: Functional components, hooks (useState, useEffect, useRef)
- **TypeScript**: Proper type definitions throughout
- **State Management**: Complex state management with multiple features
- **Responsive Design**: Mobile-first approach with media queries
- **UI/UX**: Attention to detail with animations and visual feedback
- **Performance**: Optimized rendering and smooth animations using GSAP
- **Browser APIs**: LocalStorage, Viewport, Event Listeners

## 🚢 Deployment

The app is ready for deployment on:
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **GitHub Pages**
- **Any static hosting service**

## 📄 License

This project is created as an assignment for TakeUForward.

## 👤 Author

Created for TakeUForward Assignment

---

**Last Updated**: April 9, 2026  
**Version**: 1.0.0
