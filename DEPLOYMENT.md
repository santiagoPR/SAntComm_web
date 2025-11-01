# SAntComm Deployment Guide

## Overview

This guide covers deploying SAntComm to Hostinger with automatic deployment from GitHub.

**Deployment Setup:**
- **Production:** santcom.com (coming soon)
- **Development:** dev.santcom.com ✅ (Active)
- **Auto-deploy:** GitHub webhook triggers deployment on push

---

## Prerequisites

✅ Hostinger Web Hosting plan (not Website Builder)
✅ GitHub account
✅ dev.santcom.com subdomain created ✅
✅ Git repository initialized ✅

---

## Step 1: Create GitHub Repository

### 1.1 Create Repository on GitHub

1. Go to [github.com](https://github.com) and log in
2. Click the "+" icon → "New repository"
3. Repository settings:
   - **Name:** `SAntComm_web` (or your preferred name)
   - **Description:** "SAntComm Web & Mobile Application"
   - **Visibility:** Private (recommended) or Public
   - **DO NOT** initialize with README (we already have files)
4. Click "Create repository"

### 1.2 Push Code to GitHub

Open Git Bash in the project folder and run:

```bash
# Configure Git (first time only)
git config user.name "Your Name"
git config user.email "your.email@example.com"

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: SAntComm web project with 12 AI agents

- Basic HTML/CSS/JS structure
- 12 specialized AI agents configured
- Design system foundation
- Ready for development"

# Add GitHub remote (replace YOUR_USERNAME and YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** Replace `YOUR_USERNAME/YOUR_REPO` with your actual GitHub repository URL.

---

## Step 2: Configure Hostinger Git Deployment

### 2.1 Access Hostinger hPanel

1. Log in to [hostinger.com](https://www.hostinger.com)
2. Go to **Hosting** → Select your hosting plan
3. Click **Manage** next to your domain

### 2.2 Set Up Git Repository

1. Scroll down to **Advanced** section
2. Click **Git** (or "Git Version Control")
3. In the "Create a New Repository" section:

   **Repository URL:**
   ```
   https://github.com/YOUR_USERNAME/SAntComm_web.git
   ```

   **Branch:**
   ```
   main
   ```

   **Repository Path:**
   ```
   /domains/dev.santcom.com/public_html
   ```

   **Note:** The exact path may vary. Common paths:
   - `/domains/dev.santcom.com/public_html`
   - `/public_html/dev`
   - Check your Hostinger file manager for the correct path

4. Click **Create** or **Add Repository**

### 2.3 Set Up Auto-Deployment

1. In the "Manage Repositories" section, find your repository
2. Click **Actions** → **Auto Deployment**
3. A popup will show:
   - **Webhook URL** (copy this!)
   - **Secret** (optional, copy if shown)

   Example webhook URL:
   ```
   https://api.hostinger.com/hooks/deploy/abc123def456
   ```

4. Keep this popup open or save the webhook URL

---

## Step 3: Configure GitHub Webhook

### 3.1 Add Webhook to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Webhooks** → **Add webhook**
3. Configure webhook:

   **Payload URL:**
   ```
   [Paste the Hostinger webhook URL from Step 2.3]
   ```

   **Content type:**
   ```
   application/json
   ```

   **Secret:**
   ```
   [Leave empty or paste secret from Hostinger if provided]
   ```

   **Which events would you like to trigger this webhook?**
   - Select: "Just the push event"

   **Active:**
   - ✅ Check this box

4. Click **Add webhook**

### 3.2 Test the Webhook

GitHub will immediately send a test ping. After a few seconds:

1. Refresh the webhooks page
2. Check for a **green checkmark** ✅ next to your webhook
3. If you see a **red X** ❌:
   - Click the webhook
   - Check "Recent Deliveries"
   - Review error messages
   - Common issues: Wrong URL, incorrect path in Hostinger

---

## Step 4: Test Deployment

### 4.1 Make a Test Change

```bash
# Make a small change (e.g., update README)
echo "# SAntComm - Live!" > TEST.md

# Commit and push
git add TEST.md
git commit -m "Test: Verify auto-deployment works"
git push
```

### 4.2 Verify Deployment

1. Wait 10-30 seconds
2. Visit: **https://dev.santcom.com**
3. You should see your website!
4. Check for `TEST.md` file to confirm deployment worked

### 4.3 If Deployment Fails

**Check Hostinger:**
1. Go to hPanel → Git section
2. Check deployment logs
3. Look for error messages

**Check GitHub:**
1. Go to repository → Settings → Webhooks
2. Click your webhook
3. Check "Recent Deliveries"
4. Review response codes (200 = success, 4xx/5xx = error)

**Common Issues:**
- ❌ Wrong repository path in Hostinger
- ❌ Branch name mismatch (main vs master)
- ❌ Private repo without authentication
- ❌ File permissions on Hostinger

---

## Step 5: Development Workflow

### 5.1 Daily Development

```bash
# Make changes to your files
# (edit HTML, CSS, JS, etc.)

# Check what changed
git status

# Add changes
git add .

# Commit with descriptive message
git commit -m "Add responsive navigation bar"

# Push to GitHub (auto-deploys to dev.santcom.com)
git push
```

### 5.2 Branch Strategy (Optional but Recommended)

**For safer development:**

```bash
# Create development branch
git checkout -b dev

# Make changes and commit
git add .
git commit -m "Feature: Add user dashboard"
git push -u origin dev

# When ready to deploy:
# 1. Test thoroughly on local
# 2. Merge to main (triggers deployment)
git checkout main
git merge dev
git push
```

---

## Step 6: Deploy to Production (santcom.com)

**When ready to replace current santcom.com:**

### Option A: Change Repository Path

1. In Hostinger hPanel → Git section
2. Edit repository settings
3. Change path from:
   ```
   /domains/dev.santcom.com/public_html
   ```
   To:
   ```
   /public_html
   ```
   (This is usually the root domain path)

4. Click **Pull** to deploy immediately

### Option B: Add Second Repository

1. Keep dev.santcom.com repository
2. Add new repository for production:
   - Same GitHub URL
   - Branch: `main` or create `production` branch
   - Path: `/public_html`

---

## File Structure on Hostinger

After deployment, your files should be at:

```
/domains/dev.santcom.com/public_html/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
├── .claude/
│   └── commands/
├── package.json
├── README.md
└── [other project files]
```

**Important:** Make sure `index.html` is in the root of `public_html/`, not in a subdirectory.

---

## Troubleshooting

### Issue: "403 Forbidden" or "404 Not Found"

**Solution:**
1. Check file permissions in Hostinger File Manager
2. Ensure `index.html` is at root of deployment path
3. Check .htaccess file (if any)

### Issue: Deployment not triggering

**Solution:**
1. Check webhook is active in GitHub
2. Verify webhook URL is correct
3. Check Hostinger Git logs for errors
4. Try manual pull in Hostinger Git section

### Issue: Old files still showing

**Solution:**
1. Clear browser cache (Ctrl+F5)
2. Check Hostinger File Manager - verify new files are there
3. Wait for CDN cache to clear (if using Cloudflare)

### Issue: CSS/JS not loading

**Solution:**
1. Check file paths in HTML
2. Ensure files are uploaded correctly
3. Check browser console for errors (F12)

---

## Commands Reference

### Git Basics

```bash
# Check status
git status

# Add all changes
git add .

# Add specific file
git add filename.html

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline
```

### Create a New Branch

```bash
# Create and switch to new branch
git checkout -b feature-name

# Push new branch to GitHub
git push -u origin feature-name

# Switch back to main
git checkout main

# Merge branch into main
git merge feature-name
```

---

## Security Best Practices

1. ✅ **Never commit sensitive data:**
   - API keys
   - Database passwords
   - Secret tokens
   - Use `.env` files (already in .gitignore)

2. ✅ **Use environment variables:**
   - Store secrets in Hostinger environment variables
   - Access via PHP or backend code (when you add backend)

3. ✅ **Keep repository private** (recommended for now)

4. ✅ **Regular backups:**
   - GitHub is your backup (version controlled)
   - Hostinger also has backup features

---

## Next Steps

1. ✅ Repository created and pushed to GitHub
2. ✅ Hostinger Git integration configured
3. ✅ Webhook set up for auto-deployment
4. ✅ Test deployment verified
5. 🎯 Start building features!

**Development URL:** https://dev.santcom.com

---

## Need Help?

- **Hostinger Support:** Check Git deployment logs in hPanel
- **GitHub Issues:** Check webhook delivery responses
- **Agent Help:** Ask me (Claude) for deployment troubleshooting!

---

**Last Updated:** 2025-10-31
**Project:** SAntComm Web & Mobile
**Deployment:** Hostinger Web Hosting
