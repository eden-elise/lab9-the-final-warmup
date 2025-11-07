# Lab 9: The Final Warmup

A professional todo application built with Lit web components, demonstrating modern web development practices, comprehensive testing, and clean architecture.

## Project Overview

This project takes AI-generated "brownfield" code and transforms it into a production-ready application through professional development practices including testing, documentation, refactoring, and CI/CD implementation.

## Technologies Used

- **Lit 3.0** - Lightweight web component library
- **Vite 5.0** - Modern build tool and dev server
- **Node.js Test Runner** - Built-in unit testing
- **Playwright** - End-to-end testing framework
- **ESLint** - Code linting and quality enforcement
- **JSDoc** - Documentation generation and type checking

## Features

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Edit existing todos
- Clear completed todos
- Clear all todos
- LocalStorage persistence
- Real-time statistics (total, active, completed)
- Responsive design
- Keyboard shortcuts (Enter to save, Escape to cancel)
- Accessibility features (ARIA labels, keyboard navigation)

## Project Structure

```
lab9-the-final-warmup/
├── src/
│   ├── components/
│   │   ├── todo-app.js       # Main application component
│   │   ├── todo-form.js      # Input form component
│   │   ├── todo-item.js      # Individual todo item
│   │   └── todo-list.js      # Todo list container
│   ├── models/
│   │   └── todo-model.js     # Business logic and state management
│   ├── services/
│   │   └── storage-service.js # LocalStorage abstraction
│   ├── index.html            # Application entry point
│   └── styles.css            # Global styles with CSS variables
├── tests/
│   ├── e2e/
│   │   └── todoapp.spec.js   # End-to-end tests
│   └── todo-model.test.js    # Unit tests
├── lit-component-exploration/
│   ├── lit-component-helloworld.html  # Simple Lit hello world example
│   └── why-use-lit.md        # Documentation explaining Lit benefits
├── playwright-report/
│   └── index.html            # Playwright test results HTML report
├── playwright.config.js      # E2E test configuration
├── package.json              # Dependencies and scripts
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <https://github.com/eden-elise/lab9-the-final-warmup.git>
cd lab9-the-final-warmup

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

### Building

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Testing

### Unit Tests

Unit tests cover the core business logic in the TodoModel class using Node's built-in test runner.

```bash
# Run unit tests
npm test
```

Tests include:
- Adding todos with validation
- Toggling completion status
- Deleting todos
- Updating todo text
- Calculating active and completed counts
- Clearing completed and all todos

### End-to-End Tests

E2E tests verify user workflows using Playwright.

```bash
# Run E2E tests
npx playwright test
npx playwright test --ui
npx playwright test --headed
```

E2E tests cover:
- Adding new todos
- Completing todos
- Deleting todos
- Editing todos
- Persistence after page refresh
- Clearing completed todos

## Code Quality

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint:fix
```

### Documentation

All JavaScript files include comprehensive JSDoc comments with:
- Function descriptions
- Parameter types and descriptions
- Return types
- Custom event documentation
- Component property documentation

## Architecture

### Separation of Concerns

The application follows a clean MVC-inspired architecture:

- **Models** (`todo-model.js`) - Business logic and data management
- **Services** (`storage-service.js`) - External API abstraction (localStorage)
- **Components** - View layer with Lit web components
- **Styles** (`styles.css`) - Presentation layer with CSS variables

### Design Patterns

- **Observer Pattern** - TodoModel notifies subscribers of state changes
- **Custom Events** - Components communicate via bubbling custom events
- **Service Layer** - Storage abstraction for easy testing and future API integration

### CSS Architecture

All styles are centralized in `styles.css` with CSS variables organized by category:
- Colors (primary, danger, success, etc.)
- Spacing (xs, sm, md, lg, xl)
- Typography (font sizes, weights)
- Shadows and transitions
- All measurements use rem units for accessibility

## Key Improvements Made

### 1. Fixed .gitignore

Moved `.gitignore` from `.idea/` folder to project root and added comprehensive ignore rules:
- `node_modules/`
- Build outputs (`dist/`, `build/`)
- OS files (`.DS_Store`, `Thumbs.db`)
- Environment files (`.env`, `.env.local`)
- Test results and coverage
- IDE-specific files

### 2. Understanding Lit

Created simple examples to understand Lit's benefits:
- Automatic re-rendering on property changes
- Event listeners persist across renders
- Less boilerplate compared to vanilla web components
- Tagged template literals for safe HTML rendering

### 3. Refactored Code

- Renamed cryptic variable names (`k`, `d`, `fk`) to descriptive names
- Separated concerns: removed inline styles from components
- Added comprehensive comments explaining complex logic
- Improved error handling and input validation

### 4. Enhanced Styling

- Created CSS variables for all colors, spacing, and typography
- Converted all px units to rem for better accessibility
- Organized styles logically by component
- Implemented consistent design system

### 5. Comprehensive Testing

- Expanded unit tests from 2 to 17 tests covering all TodoModel functionality
- Added 6 E2E tests covering critical user workflows
- Configured Playwright for automated browser testing
- Achieved good test coverage of business logic

### 6. Added Documentation

- JSDoc comments on all functions and classes
- Parameter and return type documentation
- Component property and event documentation
- Architecture and design pattern documentation

### 7. Removed Shadow DOM

- Modified components to use `createRenderRoot()` for better CSS integration
- Enabled global styles to apply across all components
- Maintained component encapsulation through naming conventions

## Development Workflow

### Running the Application

1. Start the development server: `npm run dev`
2. Open browser to `http://localhost:8080`
3. Make changes to source files
4. Vite automatically reloads the page

### Testing Workflow

1. Write or modify tests
2. Run unit tests: `npm test`
3. Run E2E tests: `npm run test:e2e`
4. Fix any failing tests
5. Commit changes

### Code Style

- Use lowercase comments with no space after `//`: `//comment`
- Follow JSDoc conventions for all functions
- Use CSS variables instead of hard-coded values
- Use rem units instead of px
- Follow component-based architecture

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - See LICENSE file for details

## Acknowledgments

- Lab 9 assignment from web development course
- Lit web components framework
- Playwright testing framework
- Node.js built-in test runner

## What I Learned

Through this lab, I gained practical experience with:
- Working with brownfield/AI-generated code
- Lit web components and their benefits over vanilla components
- Setting up comprehensive test suites (unit and E2E)
- Using Playwright for browser automation
- Implementing proper separation of concerns
- CSS variable systems and rem units
- JSDoc for type checking and documentation
- Professional Git workflow and issue tracking
- Refactoring code for maintainability
- The importance of tests when refactoring
