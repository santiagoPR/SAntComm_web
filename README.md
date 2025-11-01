# SAntComm Web & Mobile Application

A modern web and mobile application platform for communication solutions.

🌐 **Live:** https://santcom.com

## 🎯 Quick Start

**New to the project?** See [QUICK_START.md](QUICK_START.md) for 5-minute setup guide.

**Deployment:** See [DEPLOYMENT.md](DEPLOYMENT.md) for full Hostinger + GitHub setup.

---

## 📁 Project Structure

```
SAntComm_web/
├── .claude/
│   └── commands/           # 12 AI agents for development
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Main stylesheet
├── scripts/
│   └── main.js            # Main JavaScript file
├── package.json           # Project dependencies
├── DEPLOYMENT.md          # Deployment guide
├── QUICK_START.md         # Quick setup guide
└── AGENT_SETUP_COMPLETE.md # AI agents documentation
```

---

## ✨ Features

**Current (Foundation):**
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scrolling navigation
- ✅ Modern UI with CSS variables
- ✅ Mobile-friendly layout
- ✅ 12 specialized AI agents for development

**Coming Soon:**
- 🔄 User authentication
- 🔄 Real-time communication
- 🔄 Mobile app (React Native)
- 🔄 Backend API
- 🔄 Dashboard interface

---

## 🤖 AI Agents Available

**Web & Mobile Development:**
- `/frontend-dev` - React/Vue/Angular development
- `/mobile-app-dev` - React Native/Flutter apps
- `/ui-ux-design` - Design systems & accessibility
- `/api-builder` - REST/GraphQL APIs

**DevOps & Quality:**
- `/deploy` - Docker, CI/CD, Kubernetes
- `/code-review` - Security & quality checks

**Documentation & Analysis:**
- `/tech-write-enhanced` - Technical documentation
- `/analyze-data` - Data analysis & visualization
- `/ml-develop` - Machine learning models

See [AGENT_SETUP_COMPLETE.md](AGENT_SETUP_COMPLETE.md) for full list and usage.

---

## 🚀 Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start dev server with auto-reload
npm run dev

# Or use simple HTTP server
npm start
```

### Deployment

**Auto-deploys to santcom.com on every push to GitHub!**

```bash
# Make changes to your files
git add .
git commit -m "Your changes"
git push

# Automatically deploys to https://santcom.com
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for setup instructions.

---

## 🛠️ Development Workflow

### Using AI Agents

Just ask naturally:
```
"Create a design system for SAntComm"
"Build a responsive navigation bar"
"Add user authentication API"
"Review code for security issues"
```

Or use slash commands:
```
/ui-ux-design Create color palette
/frontend-dev Build homepage
/api-builder Add REST endpoints
/code-review Check security
```

### Git Workflow

```bash
# Daily development
git pull                    # Get latest changes
# ... make changes ...
git add .
git commit -m "Description"
git push                    # Auto-deploys!

# Feature development (recommended)
git checkout -b feature-name
# ... develop feature ...
git checkout main
git merge feature-name
git push                    # Deploys to production
```

---

## 🌐 URLs

| Environment | URL | Purpose |
|-------------|-----|---------|
| **Production** | https://santcom.com | Live site |
| **Local** | http://localhost:8080 | Local development |

---

## 📚 Documentation

- [QUICK_START.md](QUICK_START.md) - Get started in 5 minutes
- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [AGENT_SETUP_COMPLETE.md](AGENT_SETUP_COMPLETE.md) - AI agents reference
- [.claude/AGENT_ROUTING_LOCAL.md](.claude/AGENT_ROUTING_LOCAL.md) - Agent usage patterns

---

## 🔧 Tech Stack

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Modern CSS (Grid, Flexbox, CSS Variables)
- Responsive design (mobile-first)

**Deployment:**
- Hostinger Web Hosting
- GitHub (version control)
- Auto-deployment via webhooks

**Coming Soon:**
- React/Vue (web app)
- React Native (mobile app)
- Node.js/Python (backend API)
- PostgreSQL/MongoDB (database)

---

## 🎨 Design System

Colors, typography, and component specs available via:
```
/ui-ux-design Create design system
```

---

## 🧪 Testing

```bash
# Install dev dependencies
npm install

# Run tests (coming soon)
npm test
```

---

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature-name`
2. Make your changes
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature-name`
5. Create Pull Request on GitHub

---

## 📝 License

MIT

---

## 🆘 Need Help?

**Ask the AI agents:**
- "How do I deploy this?"
- "Create a responsive header"
- "Review my code for security"
- "Build a user dashboard"

**Documentation:**
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
- Check [AGENT_SETUP_COMPLETE.md](AGENT_SETUP_COMPLETE.md) for agent help

---

**Last Updated:** 2025-10-31
**Version:** 1.0.0 (Foundation)
**Status:** 🟢 Active Development
