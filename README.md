# Slide it In - AI Presentation Generator Demo

A simplified demo version of the AI presentation generator that transforms documents into beautiful presentations using Google's Gemini AI.

## Features

- 📄 Upload PDF, TXT, or Markdown files
- ✍️ Or paste text content directly
- 🎨 Choose from multiple themes
- 🤖 AI-powered content transformation using Gemini
- 📥 Download generated presentations as Markdown
- 💻 Fully responsive design

## Quick Start

1. **Clone and install:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env.local
   ```
   
   Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) and add it to `.env.local`:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)**

## How It Works

1. **Upload Content**: Upload a document or paste text
2. **Choose Theme**: Select a presentation theme
3. **Generate**: AI processes your content and creates slides
4. **Download**: Get your presentation as Markdown

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **AI**: Google Gemini API
- **File Processing**: PDF parsing, text extraction

## Deployment

Deploy easily on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/slide-it-in-demo)

Don't forget to add your `GEMINI_API_KEY` environment variable in your deployment settings.

## Converting to PowerPoint

The generated Markdown can be converted to PowerPoint using:
- [Marp](https://marp.app/) - For direct PDF/HTML export
- [Pandoc](https://pandoc.org/) - For PowerPoint conversion
- Online converters like [Markdown to PPT](https://www.markdowntoppt.com/)

## License

MIT License - feel free to use and modify!