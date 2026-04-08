# Wall Calendar App 📅

An interactive, tactile wall calendar component built with modern web technologies. This project was created as an assignment for **TakeUForward**.

**Live Demo**: [calendar-take-u-froward.vercel.app](https://calendar-take-u-froward.vercel.app)

## 📱 Mobile Responsive - Works on Phone & Desktop!

The app is fully responsive and works seamlessly on all devices:

| Dark Mode Mobile | Light Mode Mobile | Notes Modal Mobile |
|:---:|:---:|:---:|
| ![Dark Mode](https://img.placeholder.com/300x600?text=Dark+Mode) | ![Light Mode](https://img.placeholder.com/300x600?text=Light+Mode) | ![Notes Modal](https://img.placeholder.com/300x600?text=Notes+Modal) |

### 📸 Mobile Screenshots Explanation

**Screenshot 1 - Dark Mode (Mobile View)**
- Vertical stacking layout with calendar on top
- Events list displayed below calendar
- Daily habit tracker at the bottom
- Theme toggle in top-right corner showing "☀️ Light" button
- Month navigation (April) with arrow buttons
- Calendar dates with colored indicators for notes
- Full-width responsive design utilizing entire mobile width
- Touch-optimized button sizes

**Screenshot 2 - Light Mode (Mobile View)**
- Same vertical layout in light theme
- Clean white background with subtle gradients
- All text properly visible with good contrast
- Events section shows saved notes ("Trial" on 8-9 APR)
- Daily habits displayed with Task 1 and Task 2
- Theme toggle shows "🌙 Dark" button
- Responsive spacing for mobile screens
- All content easily scrollable vertically

**Screenshot 3 - Notes Modal (Mobile View)**
- Full-screen modal overlaying the calendar
- URL shows live deployment: `calendar-take-u-froward.vercel.app`
- "Add Notes" header with date range (April 8-9)
- "Saved Notes (2)" section showing two existing notes:
  - "Trial" with red/pink color indicator and Delete button
  - "Haha" with red/pink color indicator and Delete button
- "Add New Note" section with:
  - Multi-line text input field for note content
  - "Select Color 🎨" option for choosing note colors
  - "Cancel" and "Add Note" action buttons
- Modal takes up most of mobile screen with proper padding
- Clean layout even on small screens

## ✅ Responsive Features Proven by Screenshots

✅ **Vertical Stacking**: All components stack vertically on mobile  
✅ **Mobile-Friendly Buttons**: Navigation buttons sized for touch  
✅ **Full-Width Layout**: Uses entire mobile screen width  
✅ **Readable Typography**: Font sizes adjusted for small screens  
✅ **Dark & Light Themes**: Both themes look great on mobile  
✅ **Touch Optimization**: Buttons are easily tappable  
✅ **Modal Usability**: Forms and modals adapt to mobile screen  
✅ **Smooth Scrolling**: Vertical content scrolls smoothly  
✅ **No Horizontal Scroll**: Everything fits within viewport  
✅ **Live Deployment**: App is deployed and working online  

## 🛠️ Tech Stack

### 📅 Core Calendar Features
- **Interactive Monthly Calendar with 2026 Dates**
  - Pre-configured for 2026 (non-leap year)
  - Accurate first day and day count for each month
  - Smooth month navigation with 3D flip animations
  
- **Seamless Month Navigation**
  - Previous/Next month buttons with smooth transitions
  - Animation duration: 500ms with easing effects
  - Automatic month state persistence to localStorage
  - Visual feedback on button hover/click states

- **Intelligent Date Range Selection**
  - Click first date to start selection
  - Click second date to end selection
  - Visual highlighting of selected range
  - Easy reset by clicking a new starting date
  - Real-time selection display at top of calendar

- **Color-Coded Notes System**
  - 8 beautiful colors: 🔴 Red, 🟠 Orange, 🟡 Yellow, 🟢 Green, 🔵 Cyan, 🟦 Blue, 🟣 Purple, 🌸 Pink
  - Add notes to individual dates or date ranges
  - Visual indicator dots on dated with notes
  - Multiple notes per date support
  - Edit and delete notes functionality
  - Color persistence across sessions

- **Date Indicators & Visual Feedback**
  - Colored dots show dates with saved notes
  - Range highlighting shows start, middle, and end positions
  - Today indicator with enhanced border styling
  - Grid borders for clear date separation
  - Hover effects on clickable dates

### 📝 Advanced Notes & Events Management
- **Full-Featured Notes Modal**
  - View saved notes for selected date range
  - Add new notes with rich text support
  - Edit existing notes inline
  - Delete individual notes
  - Color picker for note categorization
  - Saved notes count display
  - Keyboard support (Escape to close)

- **Events List Panel**
  - Displays all events from current month
  - Shows date range and event title
  - Quick delete functionality for each event
  - Scrollable list for many events
  - Auto-refresh when notes are modified
  - Responsive height on mobile

- **Persistent Storage System**
  - All notes saved to browser localStorage
  - Zero server dependency
  - Automatic backup on every save
  - Data survives browser restart
  - Storage keys: `notes-{monthIndex}-{day}`, `color-{monthIndex}-{day}`, etc.

### 🎯 Daily Habit Tracking
- **Daily Habit Logger**
  - Track habits for each day independently
  - Add new habits with custom names
  - Mark habits complete/incomplete with checkbox
  - Edit habit names inline
  - Delete habits with confirmation
  - Color-coded habit indicators
  - Auto-save to localStorage

- **Habit Management Features**
  - Add unlimited habits per day
  - Visual checkbox for completion status
  - Edit button to rename habits
  - Delete button with X icon
  - Automatic date tracking (uses current date)
  - Habit state persists across sessions
  - Progress tracking by date

### 🎨 Theme System
- **Dark Mode Theme**
  - Purple gradient background (optimal for dark displays)
  - White text with reduced opacity for hierarchy
  - Glassmorphic cards with blur effects
  - Decorative gradient orbs
  - Professional appearance for evening use

- **Light Mode Theme**
  - Clean white/light background
  - Dark text for readability
  - Soft glassmorphic effects
  - Reduced opacity backgrounds
  - Eye-friendly for daytime use

- **Theme Features**
  - Toggle button in top-right corner
  - Instant theme switching
  - Theme preference saved to localStorage
  - Affects: calendar, sidebar, buttons, text, backgrounds
  - Smooth transitions between themes

### 📱 Mobile Responsive Design
- **Fully Responsive Layout**
  - **Desktop (≥1024px)**: Side-by-side grid layout (Calendar + Sidebar)
  - **Tablet/Mobile (<1024px)**: Vertical stacking layout
  - All content remains accessible on small screens
  - Optimized spacing and padding for each breakpoint

- **Mobile-Specific Optimizations**
  - Reduced button sizes: 28px (vs 32px on desktop)
  - Smaller fonts: 12-14px (vs 14-15px on desktop)
  - Compact padding and margins
  - Button text shortened ("Add notes" → "Add" on mobile)
  - Touch-optimized controls (44px+ minimum tap targets)
  - No horizontal scrolling
  - Proper viewport scaling

- **Touch Interaction Features**
  - Touch-friendly button sizing
  - Swipe support detection
  - Prevented zoom on interaction
  - Disabled text selection on buttons
  - No callout menus on long press
  - Smooth scrolling support

### ✨ Visual Effects & Animations
- **Smooth Transitions**
  - 400ms fade-in/fade-out between months
  - GSAP-powered animations for performance
  - Staggered animations for visual appeal
  - Easing effects: power2.in, power2.out, power1.inOut

- **3D Page Flip Animation**
  - Realistic flip effect when changing months
  - Transform-origin at bottom-right
  - 3D perspective for depth
  - Shadow effects during flip
  - 0.6s animation duration

- **Decorative Elements**
  - Animated gradient orbs in background (3 orbs)
  - Spiral binding visual at top of calendar
  - Glassmorphism effects with 14px blur
  - Gradient overlays and layers
  - Semi-transparent backgrounds

### ⌨️ Accessibility & User Experience
- **Keyboard Navigation**
  - All buttons are keyboard accessible
  - Tab navigation through interactive elements
  - Escape key to close modals
  - Enter key to confirm actions
  - Hover states for visual feedback

- **Visual Accessibility**
  - High-contrast text colors
  - Clear visual hierarchy with typography
  - Color-blind friendly (uses patterns + colors)
  - Adequate whitespace for readability
  - Consistent button sizing and spacing

- **User Experience Features**
  - Helpful instructional text ("Click dates to select a range")
  - Visual feedback on all interactions
  - Auto-save without manual confirmation
  - Minimum 150ms transition times for animations
  - Consistent styling throughout app

## 🛠️ Tech Stack

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

## 🎯 Complete Feature Checklist

### Calendar & Date Management ✅
- ✅ Interactive monthly calendar for year 2026
- ✅ Previous/Next month navigation with smooth animations
- ✅ Month state persistence to localStorage
- ✅ Single date selection
- ✅ Date range selection (start and end dates)
- ✅ Visual highlighting of selected date ranges
- ✅ Today indicator with special styling
- ✅ 7-column grid layout (MON-SUN)
- ✅ Accurate day counts and first-day positions for all 12 months

### Notes & Color System ✅
- ✅ Add notes to single dates
- ✅ Add notes to date ranges
- ✅ Edit existing notes
- ✅ Delete notes
- ✅ 8 color options for categorization
- ✅ Color indicators (dots) on calendar
- ✅ Saved notes display in modal
- ✅ Multiple notes per date support
- ✅ Color persistence across sessions
- ✅ Notes modal with full form

### Events Management ✅
- ✅ Events list panel showing all current month events
- ✅ Display event date range and title
- ✅ Delete events directly from list
- ✅ Auto-refresh events when notes change
- ✅ Scrollable events list for many items
- ✅ Events count tracking

### Habit Tracking ✅
- ✅ Daily habit logger component
- ✅ Add new habits
- ✅ Mark habits complete/incomplete
- ✅ Edit habit names
- ✅ Delete habits
- ✅ Date-specific habit tracking
- ✅ Color-coded habit indicators
- ✅ Habit persistence to localStorage

### Theme System ✅
- ✅ Dark mode theme with gradient background
- ✅ Light mode theme with clean design
- ✅ Theme toggle button
- ✅ Instant theme switching
- ✅ Theme preference persistence
- ✅ Theme affects all components

### Responsive Design ✅
- ✅ Mobile layout (< 1024px): Vertical stacking
- ✅ Desktop layout (≥ 1024px): Side-by-side grid
- ✅ Calendar responsive: Scales for all screen sizes
- ✅ Buttons responsive: 28px mobile, 32px desktop
- ✅ Typography responsive: Font sizes scale
- ✅ Touch-friendly element sizes (44px+ minimum)
- ✅ Mobile viewport configuration
- ✅ No horizontal scrolling on mobile
- ✅ Proper padding/margin for all devices
- ✅ Modal responsive on mobile

### Animations & Effects ✅
- ✅ Month transition fade animations (400ms)
- ✅ 3D page flip effect (600ms)
- ✅ Decorative gradient orbs in background
- ✅ Glassmorphism blur effects
- ✅ Smooth button hover transitions
- ✅ GSAP-powered animations
- ✅ Easing functions for natural motion
- ✅ Staggered animations

### Data Persistence ✅
- ✅ localStorage for all user data
- ✅ Notes saved to localStorage
- ✅ Colors saved to localStorage
- ✅ Habits saved to localStorage
- ✅ Theme preference saved
- ✅ Month view saved
- ✅ Zero data loss on refresh
- ✅ Automatic saving on every action

### Accessibility & UX ✅
- ✅ Keyboard navigation support
- ✅ Hover effects on desktop
- ✅ Touch support on mobile
- ✅ Visual feedback on interactions
- ✅ Clear button states
- ✅ Readable text contrast
- ✅ Instructional helper text
- ✅ Consistent spacing and sizing
- ✅ Accessible form elements
- ✅ Cancel/Close options on modals

### Technical Implementation ✅
- ✅ React functional components
- ✅ TypeScript type definitions
- ✅ Custom hooks usage (useState, useEffect, useRef)
- ✅ Tailwind CSS styling
- ✅ GSAP animation library
- ✅ Lucide React icons
- ✅ Next.js 13+ framework
- ✅ CSS-in-JS inline styles
- ✅ Component composition pattern
- ✅ Props drilling management

### Browser APIs Used ✅
- ✅ localStorage API
- ✅ Window resize event listener
- ✅ Touch event handling
- ✅ Mouse event handling
- ✅ Viewport meta configuration
- ✅ CSS media queries
- ✅ CSS animations & transitions

## 📝 Assignment Goals & Learning Outcomes

This project successfully demonstrates:

### Technical Skills ✅
- **React Proficiency**: Functional components, hooks (useState, useEffect, useRef), component composition
- **TypeScript**: Proper type definitions, interface definitions, type safety throughout
- **State Management**: Complex multi-feature state management without external libraries
- **CSS & Styling**: Tailwind CSS, inline styles, CSS animations, responsive design
- **Animation**: GSAP integration, smooth transitions, 3D effects

### UI/UX Skills ✅
- **Responsive Design**: Mobile-first approach with breakpoints, touch optimization
- **Visual Design**: Color palette, typography hierarchy, spacing, glassmorphism effects
- **User Feedback**: Visual indicators, animations, interactive responses
- **Accessibility**: Keyboard support, color ratios, semantic HTML
- **Interaction Design**: Smooth transitions, intuitive controls, helpful guidance

### Development Skills ✅
- **Code Organization**: Component structure, separation of concerns
- **Performance**: Optimized rendering, smooth animations, efficient storage
- **Browser APIs**: LocalStorage, Viewport, Event listeners, CSS media queries
- **Problem-Solving**: Feature integration, cross-browser compatibility
- **Documentation**: Comprehensive comments, clear code, helpful messages

## 🎯 Key Functionalities Implemented

✅ Monthly calendar navigation with smooth animations  
✅ Date range selection with visual highlighting  
✅ Color-coded notes system with 8 colors  
✅ Daily habit tracking with persistence  
✅ Events list with dynamic filtering  
✅ Dark/Light theme toggle  
✅ Fully responsive design (Mobile & Desktop)  
✅ LocalStorage persistence for all data  
✅ Touch-optimized mobile UI  
✅ Decorative animations and effects  
✅ Glassmorphism UI design  
✅ Keyboard accessibility support  
✅ 3D page flip animations  
✅ Real-time state updates  
✅ Automatic data backup  

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
