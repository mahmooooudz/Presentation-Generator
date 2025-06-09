# 🎯 Slide it In

**Transform any document into stunning presentations with AI in seconds.**

[![Live Demo](https://img.shields.io/badge/🚀_Try_Now-justslideitin.com-blue?style=for-the-badge)](https://justslideitin.com/)
[![Case Study](https://img.shields.io/badge/📖_Case_Study-Read_More-green?style=for-the-badge)](https://martinsit.ca/writing/shipping-presentation-generation-3-days)

---

## ⚡ What It Does

Upload your **PDF, Markdown, or TXT** → Get a **professional slide deck** in seconds. Powered by Google Gemini AI.

## 🔥 Key Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI-Powered** | Gemini 1.5 Flash analyzes and creates compelling content |
| 🎨 **6 Visual Themes** | Default, Beam, Rose Pine, Gaia, Uncover, Graph Paper |
| 🎯 **Smart Targeting** | Tailored for General, Academic, Technical, Professional, Executive audiences |
| ⚙️ **Detail Control** | Choose Minimal, Medium, or Detailed content extraction |
| 📱 **Responsive** | Works perfectly on all devices |
| 📤 **PDF Export** | Download ready-to-use presentations |

## 🚀 Quick Start

```bash
1. Visit justslideitin.com
2. Upload your document
3. Pick a theme & settings
4. Download your presentation
```

## 🛠️ Tech Stack

**Frontend:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion  
**Backend:** Go (Gin), Google Cloud Firestore, Cloud Tasks  
**AI Service:** Google Gemini API, Marp for slide generation

## 📁 Project Structure

```
slideitin/
├── frontend/           # Next.js app
├── backend/           
│   ├── api/           # Main API service
│   └── slides-service/ # AI slide generation
└── cloudbuild.yaml    # GCP deployment config
```

## ☁️ Deployment

This app runs exclusively on **Google Cloud Platform**:
- Cloud Run services
- Cloud Tasks for async processing  
- Firestore for data storage
- Built and deployed via `cloudbuild.yaml`

## 📄 License

MIT License - feel free to use and modify!

## 👨‍💻 Author

**Mahmoud Emad** ([@mahmooooudz](https://github.com/mahmooooudz))

---

*Built with ❤️ using Google Cloud Platform*
