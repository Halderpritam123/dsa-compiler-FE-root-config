# dsa-compiler-FE-root-config
### Deployed URL:
https://dsa-compiler-root-config.netlify.app/
<br>
<br>
This project is the root configuration for a **Single-SPA** micro-frontend architecture. It integrates various front-end applications such as problem viewer and editor, dynamically loaded based on routing configuration.
## Reposetory
### Frontend:
https://github.com/Halderpritam123/dsa-compiler-FE-Problem-view-application
<br>
https://github.com/Halderpritam123/dsa-solution-editor
### Backend :
https://github.com/Halderpritam123/dsa-compiler

## Features

- **Single-SPA Configuration**: Manages routing and dynamically loads micro-frontends based on path mappings.
- **Layout Management**: Uses a layout engine to construct routes and applications based on a `single-spa-layout` template.
- **Module Loading**: Imports required modules like React and ReactDOM from CDNs to minimize bundle size.
- **Import Map Overrides**: Supports import map overrides during development to load specific versions of dependencies.

## Installation

### Prerequisites

- Node.js (version 18 or higher)
- Docker (optional for containerized setup)
- Netlify account (for deployment)

### Steps to Set Up Locally

1. Clone the repository:
   ```
   git clone https://github.com/Halderpritam123/dsa-compiler-FE-root-config.git
   cd dsaCompiler-root-config
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Build App:
  ```
  npm run build
  ```
4. Start the development server:
   ```
   npm run start
  ```
### The application will be available at
  ```
http://localhost:9000
  ```
# Project Structure:

  ```bash
dsaCompiler-root-config/
├── docker/
│   ├── Dockerfile               # Docker configuration for containerized deployment
│   └── .dockerignore            # Docker ignore file to exclude unnecessary files from the Docker image
├── dist/
│   └── (build files)            # The directory for production build files
├── src/
│   ├── dsaCompiler-root-config.js # Single-SPA root config file that initializes routes and micro-applications
│   ├── index.ejs                # HTML template where Single-SPA layout is defined
├── netlify.toml                 # Netlify configuration for routing and redirects
├── package.json                 # Project dependencies and scripts
├── webpack.config.js            # Webpack configuration for bundling the application
└── README.md                    # Project documentation
  ```
# Docker Setup
### 1. uild the Docker image
```
docker build -t dsa-compiler-root-config .
```
### 2. Run the Docker container:
```
docker run -p 9000:9000 dsa-compiler-root-config
```
This will start the application inside a Docker container, accessible at ` http://localhost:9000 `

### Used technologies:

Single-SPA,React,Webpack,SystemJS,Import Maps,Docker,JavaScript (ES6+),HTML & CSS, EJS.
,


   
