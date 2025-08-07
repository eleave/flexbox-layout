# 🎯 GridLayout Component

A sophisticated, multi-column layout system with resizable, collapsible columns and persistent state management. Perfect for complex dashboards, document viewers, and multi-panel interfaces.

## ✨ Features

- **📐 Multi-Column Layout** - Minimum 3 columns with CSS Grid
- **🔧 Resizable Columns** - Drag handles with smooth animations
- **📦 Collapsible Panels** - Toggle visibility with persistent state
- **💾 State Persistence** - localStorage for widths and visibility
- **🎨 Structured Content** - Slot-based system for organized layouts
- **📱 Responsive** - Handles window resize and redistributes space

## 🚀 Quick Start

```tsx
import { GridLayout, GridColumn, GridColumnTitle, GridColumnActions } from '@ui/components/common/grid-layout';

<GridLayout name="my-layout" height="100vh">
  <GridColumn showToggler showResizer>
    <GridColumnTitle>Left Panel</GridColumnTitle>
    <GridColumnActions>
      <Button>Action</Button>
    </GridColumnActions>
    {/* Your content */}
  </GridColumn>

  <GridColumn showToggler showResizer>
    <GridColumnTitle>Center Panel</GridColumnTitle>
    {/* Your content */}
  </GridColumn>

  <GridColumn showToggler>
    <GridColumnTitle>Right Panel</GridColumnTitle>
    {/* Your content */}
  </GridColumn>
</GridLayout>;
```

## 🧩 Component Structure

### GridLayout Props

- `children` - Array of GridColumn components (minimum 3)
- `name` - Unique identifier for localStorage persistence
- `height` - Container height (default: '100vh')
- `scrollable` - Enable scrolling (optional)

### GridColumn Props

- `showResizer` - Display resize handle
- `showToggler` - Show collapse/expand button
- `showScroller` - Enable vertical scrolling
- `className` - Additional CSS classes
- `children` - Column content

## 🎨 Content Slots

Use slot components to structure your column content:

```tsx
<GridColumn>
  <GridColumnTitle>Panel Title</GridColumnTitle>
  <GridColumnTabs>Tab Navigation</GridColumnTabs>
  <GridColumnActions>Action Buttons</GridColumnActions>

  {/* Main content area */}
  <div>Your main content here</div>

  <GridColumnFooter>Footer Content</GridColumnFooter>
</GridColumn>
```

### Available Slots

- `GridColumnTitle` - Column header title
- `GridColumnTabs` - Tab navigation area
- `GridColumnActions` - Action buttons area
- `GridColumnFooter` - Footer content area

## ⚙️ Configuration

### State Persistence

- **Visibility**: `grid-visibility:${name}` in localStorage
- **Widths**: `grid-sizes:${name}` in localStorage
- **Automatic**: State survives page reloads

## 🎯 Use Cases

- **📊 Dashboards** - Multi-panel data visualization
- **📄 Document Viewers** - Sidebar + content + details
- **💬 Chat Interfaces** - Contact list + chat + details
- **🎨 Design Tools** - Toolbar + canvas + properties
- **📱 Admin Panels** - Navigation + content + actions

## 🔍 Technical Details

### Architecture

- **CSS Grid** for layout with dynamic `gridTemplateColumns`
- **React Context** for slot communication
- **Custom Hooks** for state management
- **Refs** for DOM measurements during resize
- **Global Event Listeners** for drag operations

---

**Built with ❤️ for complex UI layouts**
