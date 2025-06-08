# GitLost

GitLost is a smart .gitignore generator that helps developers create accurate and comprehensive .gitignore files for their projects. It provides an intuitive interface to select from a wide range of templates and automatically generates the appropriate .gitignore file.

## Important Notes

### File Format
When downloading the .gitignore file, please ensure the file extension is `.gitignore`. Different browsers may save the file with various extensions or without an extension. After downloading:
1. Check the downloaded file's extension
2. If it's not `.gitignore`, rename it to `.gitignore`
3. Place the file in your project's root directory

### Auto-Detection Feature
GitLost can automatically detect and select appropriate templates by analyzing your `package.json` or `requirements.txt` file. Simply drag and drop your file onto the interface. However, please note:
- Auto-detection is not 100% accurate and may not catch all required templates
- We recommend manually reviewing the selected templates
- Add or remove templates based on your project's specific needs
- The auto-detection feature is meant to be a starting point, not a complete solution

## Features

- Interactive template selection
- Support for 249+ different project types and frameworks
- Real-time preview of generated .gitignore content
- Copy to clipboard functionality
- Download .gitignore file directly
- Auto-detection of project dependencies from package.json or requirements.txt
- Modern, responsive design
- Dark mode support

## Used by

[![Used by](https://img.shields.io/badge/dynamic/json?color=blue&label=Used%20by&query=count&url=https%3A%2F%2Fraw.githubusercontent.com%2Fbytexgrid%2Fgitlost%2Fmain%2Fused-by.json)](https://github.com/bytexgrid/gitlost)

<a href="https://github.com/bytexgrid/gitlost/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bytexgrid/gitlost" />
</a>

## Getting Started

Visit [GitLost](https://bytexgrid.github.io/gitlost) to start generating your .gitignore files.

### Usage

1. Select your project type(s) from the left panel
2. Preview the generated .gitignore content
3. Copy to clipboard or download the file
4. Place the .gitignore file in your project's root directory

## Development

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/bytexgrid/gitlost.git

# Navigate to the project directory
cd gitlost/gitlost-app

# Install dependencies
npm install
# or
yarn install
```

### Running Locally

```bash
# Start the development server
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`.

### Building for Production

```bash
# Build the application
npm run build
# or
yarn build

# Start the production server
npm run start
# or
yarn start
```

### Deployment

The project is configured for GitHub Pages deployment:

```bash
# Build for GitHub Pages
npm run build:gh
# or
yarn build:gh

# Deploy to GitHub Pages
npm run deploy
# or
yarn deploy
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- GitHub Pages

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNUv3 License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the need for a more user-friendly .gitignore generator
- Built with modern web technologies for optimal performance
- Thanks to all contributors ( currently just - BytexGrid :) who have helped shape this project
