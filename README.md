# 🔍 GitHub Finder

[![React](https://img.shields.io/badge/React-18.2+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

A modern web application for searching GitHub users and repositories with dark/light theme support.

## ✨ Features

- 🔍 Search GitHub users and repositories
- 🌓 Light/dark theme toggle
- 📱 Fully responsive design
- 🚀 Fast performance with Vite
- 📊 Detailed profile/repo information

## 🛠 Technology Stack

### Frontend
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
- ![CSS Modules](https://img.shields.io/badge/-CSS%20Modules-000000?logo=css3&logoColor=white)

### Tooling
- ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)
- ![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)

## 🏗 Project Structure

```
github_finder/
├── src/
│   ├── components/    # Reusable components
│   ├── routes/       # Application routes
│   ├── styles/       # Global styles
│   └── ...           # Other source files
├── public/           # Static assets
└── vite.config.ts    # Build configuration
```

## 📸 Screenshots

| Light Theme | Dark Theme |
|------------|------------|
| ![Light Theme](./screenshots/light.png) | ![Dark Theme](./screenshots/dark.png) |

## ⚠️ API Rate Limits

The GitHub API has these limits:
- 60 requests/hour (unauthenticated)
- 5,000 requests/hour (with personal access token)

To increase your limit:
1. Create a [personal access token](https://github.com/settings/tokens)
2. Add to `.env` file:
   ```
   VITE_GITHUB_TOKEN=your_token_here
   ```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/github-finder.git
   cd github-finder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

🔍 Developed with ❤️ by Pedro 
