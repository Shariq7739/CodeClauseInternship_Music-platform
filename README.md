# Rhythmic: Your Personal Music Universe

https://musichealer.netlify.app/

Rhythmic is a modern, AI-powered music discovery and streaming application built with Next.js, Genkit, and ShadCN UI. It provides a seamless experience for exploring music, creating personalized playlists, and discovering new tracks through intelligent recommendations.

## ✨ Key Features

- **🎵 Modern Music Player**: A persistent, feature-rich player to control playback across the app.
- **🔍 Smart Search**: Instantly find songs by title, artist, genre, or year with powerful filtering capabilities.
- **📚 Personal Library**: Create and manage your own custom playlists.
- **🤖 AI-Powered Recommendations**: Leverage Google's Gemini model via Genkit to get personalized song and artist suggestions based on your listening habits.
- **🔐 Secure Authentication**: Simple and secure user registration and login functionality.
- **🎨 Sleek & Responsive UI**: A beautiful, dark-mode-first interface built with Tailwind CSS and ShadCN UI that looks great on any device.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **UI**: [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google Gemini
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 📂 Project Structure

The project is organized to separate concerns and improve maintainability:

```
src
├── ai/                # Genkit flows for AI features
├── app/               # Next.js App Router pages and layouts
├── components/        # Reusable React components (including ShadCN UI)
├── context/           # React context providers (e.g., MusicPlayerContext)
├── hooks/             # Custom React hooks
├── lib/               # Core application logic, data, types, and utilities
└── ...
```
