# 🚀 Kanban Task Manager

A modern, responsive Kanban-style task management application built with React, TypeScript, and CSS modules. Features drag-and-drop functionality, smart search, task management, and a beautiful UI.

## ✨ Features

### 🎯 **Core Functionality**
- **Kanban Board**: Organize tasks in customizable columns
- **Drag & Drop**: Intuitive drag-and-drop for both columns and tasks
- **Task Management**: Create, edit, delete, and mark tasks as complete
- **Column Management**: Add, remove, and reorder columns
- **Smart Search**: Find tasks by name and description with fuzzy search
- **Task Selection**: Multi-select tasks for bulk operations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### 🎨 **User Interface**
- **Modern Design**: Clean, professional interface with blue color scheme
- **Responsive Layout**: Adapts to all screen sizes
- **Smooth Animations**: Fluid transitions and interactions
- **Intuitive Controls**: Clear visual indicators and drag handles
- **Tooltips**: Helpful information on hover
- **Text Highlighting**: Search results are highlighted for easy identification

### 🔧 **Advanced Features**
- **Task Sorting**: Sort tasks by status, title, or creation date
- **Bulk Operations**: Select multiple tasks for deletion, status changes, or moving
- **Local Storage**: All data persists between sessions
- **Keyboard Navigation**: Full keyboard support
- **Touch Support**: Optimized for touch devices

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd testTask
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📖 How to Use

### 🏗️ **Managing Columns**

#### **Adding a Column**
- Click the **"+ Add Column"** button at the top of the page
- Enter a column name and press Enter
- The new column will appear on the right

#### **Moving Columns**
- **Drag Handle**: Use the 6-dot pattern (⋮⋮⋮) in the top-left corner of each column
- Click and drag the handle to reorder columns
- Columns will smoothly animate to their new positions

#### **Deleting a Column**
- Click the **×** button in the top-right corner of the column
- All tasks in the column will be permanently deleted

#### **Editing Column Names**
- Click on any column title to edit it
- Type the new name and press Enter to save
- Press Escape to cancel

### 📝 **Managing Tasks**

#### **Adding Tasks**
- Click **"+ Add Task"** button in any column header
- Enter task details:
  - **Title**: Required task name
  - **Description**: Optional detailed description
- Click **"Add Task"** or press Enter

#### **Editing Tasks**
- Click the **"Edit"** button on any task
- Modify title and description
- Click **"Save"** to apply changes or **"Cancel"** to discard

#### **Moving Tasks**
- **Drag Handle**: Use the 6-dot pattern (⋮⋮⋮) in the top-left corner of each task
- Drag tasks between columns or reorder within the same column
- Tasks will smoothly animate to their new positions

#### **Task Status**
- **Checkbox**: Click to mark tasks as complete/incomplete
- **Status Button**: Shows current status (To Do / Done)
- **Visual Indicators**: Completed tasks become semi-transparent and strikethrough

#### **Deleting Tasks**
- Click the **×** button on any task
- Task will be permanently removed

### 🔍 **Search and Filtering**

#### **Smart Search**
- Use the search bar at the top of the page
- Search by task name or description
- **Fuzzy Search**: Finds similar matches, not just exact text
- **Real-time Results**: Results update as you type
- **Highlighted Matches**: Matching text is highlighted in black

#### **Search Behavior**
- **Task Filtering**: Only matching tasks are shown
- **Column Hiding**: Columns with no matching tasks are hidden
- **Clear Search**: Clear the search field to show all tasks

### 📋 **Bulk Operations**

#### **Selecting Multiple Tasks**
- Click **"Select All Tasks"** button in any column
- Choose from options:
  - **Select All**: Select all tasks in the column
  - **Select Completed**: Select only completed tasks
  - **Select Incomplete**: Select only incomplete tasks

#### **Bulk Actions**
- **Delete Selected**: Remove all selected tasks
- **Mark Complete**: Mark all selected tasks as done
- **Mark Incomplete**: Mark all selected tasks as to-do
- **Move Selected**: Move all selected tasks to another column

### 🎛️ **Task Sorting**

#### **Sort Options**
- **Status**: Sort by completion status (To Do first, then Done)
- **Title**: Sort alphabetically by task name
- **Creation Date**: Sort by when tasks were created

#### **Sorting Controls**
- Use the dropdown in each column header
- Sorting applies only to the current column
- Sort order is maintained when adding new tasks

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── ui/                 # Reusable UI components
│   │   ├── DeleteButton/   # Universal delete button
│   │   ├── SortSelector/   # Task sorting dropdown
│   │   ├── Tooltip/        # Hover tooltips
│   │   ├── HighlightedText/# Search result highlighting
│   │   └── index.ts        # UI components export
│   ├── Column/             # Column component
│   ├── TaskItem/           # Individual task component
│   ├── TodoApp/            # Main application component
│   └── index.ts            # Main components export
├── types/                  # TypeScript type definitions
├── utils/                  # Helper functions
├── styles/                 # Global styles
└── main.tsx               # Application entry point
```

## 🎨 Customization

### **Colors and Themes**
The application uses a consistent blue color scheme:
- **Primary Blue**: `#3a7bd5` for buttons and accents
- **Secondary Blue**: `#4a90e2` for hover states
- **Light Blue**: `#e3f2fd` for backgrounds
- **Red**: `#dc3545` for delete operations

### **Responsive Breakpoints**
- **Mobile**: `max-width: 480px`
- **Tablet**: `max-width: 768px`
- **Desktop**: `max-width: 1024px`
- **Large Desktop**: `min-width: 1025px`

## 🔧 Technical Details

### **Built With**
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **CSS Modules**: Scoped CSS styling
- **DnD Kit**: Drag and drop functionality

### **Key Libraries**
- **@dnd-kit/core**: Core drag and drop functionality
- **@dnd-kit/sortable**: Sortable drag and drop
- **@dnd-kit/utilities**: Drag and drop utilities

### **State Management**
- **React Hooks**: `useState`, `useEffect`, `useMemo`
- **Local Storage**: Persistent data storage
- **Component State**: Local component state management

### **Performance Features**
- **Memoization**: Optimized re-renders with `useMemo`
- **Event Delegation**: Efficient event handling
- **Lazy Loading**: Components load only when needed

## 🐛 Troubleshooting

### **Common Issues**

#### **Tasks Not Saving**
- Check browser console for errors
- Ensure localStorage is enabled
- Try refreshing the page

#### **Drag and Drop Not Working**
- Make sure you're using the 6-dot drag handles
- Check that JavaScript is enabled
- Try refreshing the page

#### **Search Not Working**
- Clear the search field and try again
- Check for special characters in search
- Ensure the search field is focused

#### **Performance Issues**
- Close other browser tabs
- Check for browser extensions that might interfere
- Try using a different browser

### **Browser Compatibility**
- **Chrome**: 90+ (Recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### **Code Style**
- Use TypeScript for all new code
- Follow existing component structure
- Use CSS modules for styling
- Write clear, descriptive commit messages

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing framework
- **DnD Kit**: For excellent drag and drop functionality
- **Vite**: For fast development experience
- **Community**: For feedback and contributions

## 📞 Support

If you encounter any issues or have questions:
1. Check this README for solutions
2. Search existing issues
3. Create a new issue with detailed information
4. Include browser version and error messages

---

**Happy task managing! 🎉**
