# 🏙️ SkyLine Web Co. — Premium Digital Agency & Intelligent Web Solutions

SkyLine Web Co. is a modern, high-performance digital agency platform showcasing enterprise-grade web development, sleek UI components, and automated customer acquisition pipelines. It features an advanced, context-aware AI Agent system built with custom RAG (Retrieval-Augmented Generation) infrastructure to handle customer queries, classify intent, execute operational tools, and capture leads dynamically.

---

## 🌟 Key Features

| Page | Description |
|------|-------------|
| 🏠 **Home Hub** | Cinematic modern landing page with responsive visual reveal transitions, testimonials, and project overviews. |
| 💼 **Our Services** | Detailed breakdown of technical offerings, pricing frameworks, and structural methodologies. |
| 🎨 **Interactive Portfolio** | Dynamic production-ready showcase of past engineering milestones with sub-routing support. |
| 🤖 **Global AI Assistant** | Advanced floating chat system driven by an intent-classifying autonomous backend agent. |
| 📑 **Knowledge Base** | Markdown-driven static knowledge engines feeding business-specific pricing, FAQs, and structures into the AI pipeline. |
| 📞 **Contact Portal** | Robust contact interface enabling email, physical submissions, and real-time lead capture. |

---

## 🌌 Theme

The entire application uses a **dark-mode cosmic corporate aesthetic** — deep dark backdrops with striking neon outlines, smooth scroll reveals, and clean minimalist layouts suited for premium digital agencies.

---

## 📐 System Architecture

```
+-- server
|   +-- services
|   |   +-- proposal.service.js
|   |   +-- meeting.service.js
|   |   +-- mail.service.js
|   |   +-- lead.service.js
|   |   +-- email.service.js
|   +-- routes
|   |   +-- meeting.routes.js
|   |   +-- contact.routes.js
|   |   +-- chat.routes.js
|   +-- models
|   |   +-- Meeting.js
|   |   +-- Lead.js
|   |   +-- Contact.js
|   |   +-- ChatSession.js
|   +-- middleware
|   |   +-- chatMiddleware.js
|   +-- knowledge
|   |   +-- services.md
|   |   +-- projects.md
|   |   +-- pricing.md
|   |   +-- faq.md
|   |   +-- about.md
|   +-- controllers
|   |   +-- contact.controller.js
|   |   +-- chat.controller.js
|   +-- config
|   |   +-- env.js
|   |   +-- db.js
|   +-- ai
|   |   +-- tools.js
|   |   +-- toolExecutor.js
|   |   +-- rag.js
|   |   +-- prompts.js
|   |   +-- memory.js
|   |   +-- llmClient.js
|   |   +-- intentClassifier.js
|   |   +-- agent.js
|   +-- server.js
|   +-- package.json
|   +-- .env
+-- client
|   +-- src
|   |   +-- styles
|   |   |   +-- globals.css
|   |   |   +-- chatbot.css
|   |   +-- routes
|   |   |   +-- AppRoutes.jsx
|   |   +-- pages
|   |   |   +-- Services/Services.jsx
|   |   |   +-- Portfolio/Portfolio.jsx
|   |   |   +-- Portfolio/ProjectDetails.jsx
|   |   |   +-- Home/Home.jsx
|   |   |   +-- Contact/Contact.jsx
|   |   |   +-- About/About.jsx
|   |   +-- hooks
|   |   |   +-- useChatbot.js
|   |   +-- data
|   |   |   +-- projectsData.js
|   |   |   +-- portfolio.js
|   |   |   +-- chatbotPrompts.js
|   |   +-- context
|   |   |   +-- ThemeContext.jsx
|   |   |   +-- ChatbotContext.jsx
|   |   +-- components
|   |   |   +-- sections/
|   |   |   |   +-- WhyChooseUs.jsx
|   |   |   |   +-- Testimonials.jsx
|   |   |   |   +-- TechStack.jsx
|   |   |   |   +-- ServicesPreview.jsx
|   |   |   |   +-- ProcessTimeline.jsx
|   |   |   |   +-- Hero.jsx
|   |   |   |   +-- FeaturedProjects.jsx
|   |   |   |   +-- FAQ.jsx
|   |   |   |   +-- ContactCTA.jsx
|   |   |   +-- layout/
|   |   |   |   +-- Navbar.jsx
|   |   |   |   +-- GlobalChatbot.jsx
|   |   |   |   +-- Footer.jsx
|   |   |   +-- chatbot/
|   |   |   |   +-- TypingIndicator.jsx
|   |   |   |   +-- QuickPrompts.jsx
|   |   |   |   +-- MessageBubble.jsx
|   |   |   |   +-- ChatMessages.jsx
|   |   |   |   +-- ChatInput.jsx
|   |   |   |   +-- ChatbotWindow.jsx
|   |   |   |   +-- ChatbotHeader.jsx
|   |   |   |   +-- ChatbotButton.jsx
|   |   +-- animations
|   |   |   +-- Reveal.jsx
|   |   +-- main.jsx
|   |   +-- App.jsx
|   +-- vite.config.js
|   +-- vercel.json
|   +-- package.json
|   +-- index.html
|   +-- .env
```

---

## 🚀 Tech Stack

| Layer | Technologies |
|---------|-------------|
| **Frontend** | React 19, Vite, React Router, Tailwind CSS v4, Framer Motion, Lenis Smooth Scroll, Context API |
| **UI & UX** | Lucide React, React Icons, React Hot Toast, React Helmet Async, CLSX, Tailwind Merge |
| **Backend** | Node.js, Express.js 5, CORS, Helmet, Express Rate Limit |
| **Database** | MongoDB, Mongoose |
| **AI & Automation** | Google Gemini AI, Groq API, Custom AI Agent Architecture, Intent Classification Engine, RAG (Retrieval-Augmented Generation), Tool Execution System |
| **Knowledge System** | Markdown-Based Knowledge Base, Semantic Context Retrieval, Business-Aware Prompting |
| **Communication** | Resend Email API, Automated Lead Capture, Contact Management |
| **Scheduling** | Google Calendar API, Chrono Natural Language Date Parsing |
| **Security** | Helmet, Rate Limiting, Environment-Based Configuration |
| **Developer Tools** | ESLint, Nodemon, Vite, PostCSS |
| **Deployment** | Vercel (Frontend), Render / Railway / DigitalOcean (Backend) |

---

### 🧠 AI Capabilities

- Intent Classification & Routing
- Retrieval-Augmented Generation (RAG)
- Context-Aware Business Assistant
- Dynamic Tool Invocation
- Lead Qualification & Capture
- Meeting Scheduling Automation
- Proposal & Workflow Automation
- Persistent Chat Session Tracking

---

### 🏗 Architecture Highlights

- Modern React SPA with Route-Based Navigation
- Global Floating AI Assistant
- Custom Agent Framework with Tool Execution Layer
- Markdown-Powered Knowledge Engine
- MongoDB Persistence for Leads, Contacts, Meetings & Chat Sessions
- Modular Express Backend Architecture
- Responsive Dark-Themed Agency UI with Smooth Reveal Animations

## 🔧 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/Aayush20253534/SkyLine-Web-Co..git
cd SkyLine-Web-Co.
```

### 2. Backend Setup

```bash
cd server
npm install
```

## 🛠 Environment Variables

Create a `.env` file in the `/server` directory with the following variables:

```env
# ── Server ──────────────────────────────────────────
PORT=5000
NODE_ENV=development

# ── MongoDB ─────────────────────────────────────────
MONGO_URI=mongodb://127.0.0.1:27017/skyline

# ── OpenAI / LLM ───────────────────────────────────
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
GROQ_API_KEY=your_groq_api_key_here

# ── Email (Resend) ─────────────────────────────────
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM="Aayush <hello@skyline-web-co.com>"
OWNER_EMAIL=thakur29aayush@gmail.com

# ── Frontend / Client ───────────────────────────────
CLIENT_URL=http://localhost:5173
FRONTEND_URL=https://skyline-web-co.com
APP_URL=https://skyline-web-co.com

# ── Rate Limiting ───────────────────────────────────
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=30

# ── RAG (Retrieval-Augmented Generation) ───────────
RAG_TOP_K=4
RAG_SIMILARITY_THRESHOLD=0.72

# ── Meetings / Scheduling ──────────────────────────
AVAILABILITY_SLOTS=Mon-Fri 10:00-18:00 IST

Run the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run in development mode:

```bash
npm run dev
```

Open your browser at:

```
http://localhost:5173
```

---

## 🚀 Deployment

### Frontend
- Deploy via **Vercel** or **Netlify**
- SPA route fallback is pre-configured via `vercel.json`

### Backend
- Deploy on **Render**, **Railway**, or **Heroku**
- Set `MONGO_URI` and all API keys in the provider's environment console

---

## 📁 Project Highlights

- 🧠 **Intelligent RAG System** — Parses domain-specific agency markdown documents to power live AI assistance
- ⚙️ **Dynamic Action Tooling** — AI Agent triggers automated processes (proposals, meetings) based on user intent
- ✨ **Fluid Visual Flow** — Custom React scroll reveal animations via `Reveal.jsx` for smooth desktop & mobile UX
- 💬 **Persistent Chat Topology** — Express session management tracking interactions throughout long-running chats

---

## 🖤 Credits

Built to showcase cutting-edge web design architecture integrated with advanced LLM Agent operations.

**Designed by SkyLine Web Co.** — Built with modern stacks and premium design goals.
