# Contributing

## Requirements

- Git
- Node.js (latest LTS version recommended)
- npm

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/aminnairi/rollup-plugin-sitemap
cd rollup-plugin-sitemap
npm install
```

## Building

Build the plugin:

```bash
cd packages/rollup-plugin-sitemap
npm run build
```

The built files will be in `packages/rollup-plugin-sitemap/build/`.

## Testing

To test the plugin with the example:

```bash
cd example
npm run build
```

## Proposing changes

1. Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit them with a descriptive message:

```bash
git commit -m "Add feature description"
```

3. Push your branch to the remote repository:

```bash
git push origin feature/your-feature-name
```

4. Open a pull request on GitHub with a clear description of your changes.

## Code style

- Use TypeScript for all new code
- Follow the existing code conventions in the project
- Add TypeScript documentation comments for new public APIs
