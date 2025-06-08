# Contributing to GitLost

Thank you for your interest in contributing to GitLost! This document provides guidelines and information for contributing to the project.

## Project Structure

```
gitlost-app/
├── src/
│   ├── app/                 # Next.js app directory
│   │   └── layout.tsx      # Root layout component
│   │   ├── components/         # React components
│   │   │   ├── Header.tsx      # Navigation and theme controls
│   │   │   ├── PreviewPanel.tsx    # Preview and download functionality
│   │   │   ├── SelectionPanel.tsx  # Template selection interface
│   │   │   └── SelectedItemsPanel.tsx  # Selected templates display
│   │   └── utils/              # Utility functions
│   │       ├── fetchGitignoreTemplates.ts  # Template fetching logic
│   │       └── gitignoreTemplates.ts       # Template definitions
│   ├── public/                 # Static assets
│   └── package.json           # Project dependencies and scripts
```

### Key Components

- **Header.tsx**: Handles navigation, theme switching, and overall layout structure
- **PreviewPanel.tsx**: Manages the preview of generated .gitignore content and download functionality
- **SelectionPanel.tsx**: Implements the template selection interface and search functionality
- **SelectedItemsPanel.tsx**: Displays and manages selected templates
- **fetchGitignoreTemplates.ts**: Handles fetching and processing of .gitignore templates
- **gitignoreTemplates.ts**: Contains the template definitions and categorization

## Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/gitlost.git
   ```
3. Install dependencies:
   ```bash
   cd gitlost/gitlost-app
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Making Changes

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following these guidelines:
   - Follow the existing code style
   - Write clear commit messages
   - Add comments for complex logic
   - Update documentation if necessary

3. Test your changes:
   - Ensure the development server runs without errors
   - Test the functionality you've modified
   - Check for any console errors

4. Submit a Pull Request:
   - Push your branch to your fork
   - Create a Pull Request to the main repository
   - Provide a clear description of your changes

## Code Style

- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Keep components focused and modular
- Use meaningful variable and function names

## Adding New Templates

To add new .gitignore templates:

1. Locate the appropriate category in `gitignoreTemplates.ts`
2. Add your template following the existing format
3. Ensure the template is properly categorized
4. Test the template with the application

## Reporting Issues

When reporting issues, please include:
- A clear description of the problem
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser and OS information
- Any relevant error messages

## Questions and Discussion

If you have questions or want to discuss potential changes:
- Open an issue for discussion
- Join our community discussions
- Reach out to the maintainers

## License

By contributing to GitLost, you agree that your contributions will be licensed under the project's GNUv3 License. 