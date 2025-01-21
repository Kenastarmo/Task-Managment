# Full-Stack Todo Application

A modern, feature-rich todo application built with React, Redux, and TypeScript. This application provides a beautiful and intuitive interface for managing tasks with advanced features like drag-and-drop, filtering, and categorization.

![Todo App Screenshot](https://imgur.com/a/G4p0zWn)

## Features

- ✨ Modern and intuitive user interface
- 📱 Responsive design
- 🎯 Task prioritization (High, Medium, Low)
- 📂 Task categorization (Work, Study, Personal)
- 🔄 Drag and drop for priority management
- 📅 Date-based task scheduling
- 💬 Comments support for tasks
- 🔍 Advanced filtering options
- 📊 Dashboard with task statistics
- 🎨 Clean and maintainable code structure

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Redux Toolkit (State Management)
  - React DnD (Drag and Drop)
  - Tailwind CSS (Styling)
  - Lucide React (Icons)
  - Radix UI (UI Components)
  - Date-fns (Date Manipulation)

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fullstack-todo-app.git
cd fullstack-todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Feature-specific components
├── store/             # Redux store configuration
│   ├── store.ts
│   └── todoSlice.ts
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── lib/              # Shared libraries and helpers
```

## Features in Detail

### Task Management
- Create, update, and delete tasks
- Set task priority and category
- Add start and end dates
- Track task status (Pending, In Progress, Completed)
- Add comments to tasks

### Organization
- Drag and drop tasks between priority levels
- Filter tasks by status and category
- Date-based filtering
- Task categorization

### Dashboard
- Overview of all tasks
- Task statistics
- Category-wise task distribution
- Quick access to task management

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components
- [React DnD](https://react-dnd.github.io/react-dnd/) for drag and drop functionality