# SAntComm Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Push to GitHub (5 minutes)

```bash
# Open Git Bash in this folder and run:

git add .
git commit -m "Initial commit: SAntComm project setup"

# Go to github.com, create new repository
# Then run (replace YOUR_USERNAME/YOUR_REPO):
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Connect Hostinger (3 minutes)

1. Go to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Hosting → Manage → Advanced → **Git**
3. Add repository:
   - URL: `https://github.com/YOUR_USERNAME/YOUR_REPO.git`
   - Branch: `main`
   - Path: `/domains/dev.santcom.com/public_html`
4. Click **Auto Deployment** → Copy webhook URL

### Step 3: Add Webhook (2 minutes)

1. GitHub repo → Settings → Webhooks → Add webhook
2. Paste Hostinger webhook URL
3. Content type: `application/json`
4. Save

### Step 4: Test! (1 minute)

```bash
echo "# Live!" > TEST.md
git add TEST.md
git commit -m "Test deployment"
git push
```

Visit **https://dev.santcom.com** - You should see your site! 🎉

---

## 🛠️ Daily Development Workflow

```bash
# 1. Make changes to files
# 2. Check what changed
git status

# 3. Commit and push
git add .
git commit -m "Your change description"
git push

# 4. Auto-deploys to dev.santcom.com!
```

---

## 📋 Available AI Agents

Use slash commands or natural language:

**Web Development:**
- `/ui-ux-design` - Create design system
- `/frontend-dev` - Build web pages
- `/api-builder` - Create backend API

**Mobile Development:**
- `/mobile-app-dev` - Build mobile app

**DevOps:**
- `/deploy` - Deployment configs
- `/code-review` - Security & quality checks

**Documentation:**
- `/tech-write-enhanced` - Write technical docs

---

## 🎯 Next Steps

1. **Design the app:**
   ```
   "Create a modern design system for SAntComm with colors and typography"
   ```

2. **Build homepage:**
   ```
   "Build a responsive homepage with hero section and features"
   ```

3. **Add backend:**
   ```
   "Create a REST API with user authentication"
   ```

---

## 📚 Full Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [AGENT_SETUP_COMPLETE.md](AGENT_SETUP_COMPLETE.md) - All available agents
- [README.md](README.md) - Project overview

---

**Need help?** Just ask me naturally - I'll detect which agent to use!

**Development URL:** https://dev.santcom.com
**Production URL:** https://santcom.com (coming soon)
