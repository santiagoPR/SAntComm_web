# Complete Step-by-Step Deployment Guide for crm.santcom.com

Follow these instructions exactly to deploy your SAntComm CRM to production.

---

## PART 1: Deploy Backend to Railway (15-20 minutes)

### Step 1: Create Railway Account & Connect GitHub

1. **Go to Railway**: https://railway.app
2. Click **"Login"** in the top right
3. Click **"Login with GitHub"**
4. Authorize Railway to access your GitHub account
5. You'll be redirected to Railway dashboard

### Step 2: Create New Project

1. On Railway dashboard, click **"+ New Project"** (purple button)
2. Select **"Deploy from GitHub repo"**
3. If prompted, click **"Configure GitHub App"** to give Railway access to your repositories
4. In the repository list, find and click **"santiagoPR/SAntComm_web"**
5. Railway will ask what to deploy - click **"Add variables"** (we'll configure the service first)

### Step 3: Configure Root Directory for Backend

1. After the project is created, you'll see a service card
2. Click on the service card (it might say "SAntComm_web")
3. Go to **Settings** tab (in the left sidebar)
4. Scroll down to **"Root Directory"**
5. Enter: `crm/backend`
6. Click anywhere outside the field to save

### Step 4: Add PostgreSQL Database

1. In your Railway project view, click **"+ New"** button
2. Select **"Database"**
3. Click **"Add PostgreSQL"**
4. Railway will provision a PostgreSQL database
5. Wait 30 seconds for it to finish creating

### Step 5: Generate JWT Secret

1. **On your computer**, open a terminal/command prompt
2. Run this command to generate a secure secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. **Copy the output** (it will be a 64-character string like `a1b2c3d4e5f6...`)
4. **Save this somewhere safe** - you'll need it in the next step

### Step 6: Add Environment Variables to Backend

1. Click on your **backend service card** (not the database)
2. Go to the **"Variables"** tab
3. Click **"+ New Variable"** and add each of these:

   **Variable 1:**
   - Variable: `JWT_SECRET`
   - Value: *[Paste the secret you generated in Step 5]*

   **Variable 2:**
   - Variable: `FRONTEND_URL`
   - Value: `https://crm.santcom.com`

   **Variable 3:**
   - Variable: `NODE_ENV`
   - Value: `production`

   **Variable 4:**
   - Variable: `PORT`
   - Value: `5000`

4. **Important**: Railway automatically adds `DATABASE_URL` when you added PostgreSQL - you don't need to add it manually

### Step 7: Deploy Backend

1. Go to the **"Deployments"** tab
2. Railway should automatically start deploying
3. Wait for the deployment to complete (you'll see a green checkmark)
4. If it doesn't auto-deploy, click **"Deploy"** button

### Step 8: Run Database Migrations

1. Once deployed, go to your backend service
2. Click on the **"Deployments"** tab
3. Click on the most recent deployment (should have a green checkmark)
4. You'll see deployment logs - let it finish
5. Now we need to run Prisma migrations. Click on your service, then go to **"Settings"**
6. Scroll down to **"Build Command"** and set it to:
   ```
   npm install && npx prisma generate && npx prisma migrate deploy
   ```
7. Scroll down to **"Start Command"** and set it to:
   ```
   node src/server.js
   ```
8. This will trigger a redeploy - wait for it to complete

### Step 9: Get Your Backend URL

1. Go to your backend service
2. Click on the **"Settings"** tab
3. Scroll down to **"Domains"** section
4. Click **"Generate Domain"**
5. Railway will create a public URL like: `https://your-app-name.up.railway.app`
6. **COPY THIS URL** - you'll need it for the frontend deployment
7. **Save it somewhere** - this is your backend API URL

### Step 10: Test Backend

1. Open your backend URL in a browser (the URL from Step 9)
2. Add `/health` to the end: `https://your-app-name.up.railway.app/health`
3. You should see a message like: `{"status":"ok"}` or similar
4. If you see this, your backend is working!

---

## PART 2: Deploy Frontend to Vercel (10-15 minutes)

### Step 11: Create Vercel Account

1. **Go to Vercel**: https://vercel.com
2. Click **"Sign Up"** (top right)
3. Click **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub
5. You'll be redirected to Vercel dashboard

### Step 12: Import Your Project

1. On Vercel dashboard, click **"Add New..."** → **"Project"**
2. You'll see a list of your GitHub repositories
3. Find **"SAntComm_web"** and click **"Import"**
4. **IMPORTANT Configuration**:
   - **Framework Preset**: Should auto-detect as "Vite" (if not, select it manually)
   - Click **"Edit"** next to "Root Directory"
   - Enter: `crm/frontend`
   - Click **"Continue"**

### Step 13: Add Environment Variable

1. Before deploying, expand **"Environment Variables"** section
2. Add this variable:
   - **Name**: `VITE_API_URL`
   - **Value**: *[Paste your Railway backend URL from Step 9]* (e.g., `https://your-app-name.up.railway.app`)
   - **IMPORTANT**: Don't add `/api` or trailing slash - just the base URL
3. Make sure all three environments are checked: Production, Preview, Development

### Step 14: Deploy Frontend

1. Click **"Deploy"** button
2. Vercel will start building your frontend
3. Wait 2-5 minutes for build to complete
4. You'll see confetti when it's done! 🎉
5. Click **"Continue to Dashboard"**

### Step 15: Test Temporary Vercel URL

1. Vercel gives you a temporary URL like: `https://your-project.vercel.app`
2. Click **"Visit"** or open that URL in a new tab
3. You should see your CRM login page
4. Try registering a test account to verify backend connection works
5. If registration works, everything is connected properly!

---

## PART 3: Configure Custom Domain (15-30 minutes)

### Step 16: Add Custom Domain to Vercel

1. In your Vercel project dashboard, click **"Settings"** (top menu)
2. Click **"Domains"** (left sidebar)
3. In the "Add Domain" field, type: `crm.santcom.com`
4. Click **"Add"**
5. Vercel will show you DNS configuration instructions

### Step 17: Get Your DNS Configuration

Vercel will show you one of these configurations:

**Option A - CNAME Record** (Most common):
- Type: `CNAME`
- Name: `crm`
- Value: `cname.vercel-dns.com`

**Option B - A Record** (Less common):
- Type: `A`
- Name: `crm`
- Value: An IP address like `76.76.21.21`

**Write down which option Vercel shows you** - you'll need it for the next step.

### Step 18: Find Your Domain Registrar

Your domain `santcom.com` is registered somewhere. Common registrars:
- **GoDaddy**: https://www.godaddy.com
- **Namecheap**: https://www.namecheap.com
- **Google Domains**: https://domains.google.com
- **Cloudflare**: https://www.cloudflare.com
- **Domain.com**: https://www.domain.com
- **HostGator**: https://www.hostgator.com
- **Bluehost**: https://www.bluehost.com

**If you don't know**, check your email for:
- Domain renewal notices
- Purchase receipts from when you bought santcom.com
- Look for "domain registration" or "domain renewal"

### Step 19: Add DNS Record (Instructions for Common Registrars)

#### For GoDaddy:
1. Login to https://account.godaddy.com
2. Click **"My Products"**
3. Find **"Domains"** and click **"DNS"** next to santcom.com
4. Scroll to **"Records"** section
5. Click **"Add"** button
6. Select **"CNAME"** (or **"A"** if Vercel told you to use A record)
7. **Name**: `crm`
8. **Value**: `cname.vercel-dns.com` (or the value Vercel provided)
9. **TTL**: `1 Hour` (or leave as default)
10. Click **"Save"**

#### For Namecheap:
1. Login to https://www.namecheap.com
2. Go to **"Domain List"**
3. Click **"Manage"** next to santcom.com
4. Click **"Advanced DNS"** tab
5. Click **"Add New Record"**
6. **Type**: `CNAME Record` (or `A Record`)
7. **Host**: `crm`
8. **Value**: `cname.vercel-dns.com` (or Vercel's value)
9. **TTL**: `Automatic`
10. Click **"Save"**

#### For Cloudflare:
1. Login to https://dash.cloudflare.com
2. Select **santcom.com** domain
3. Click **"DNS"** in left sidebar
4. Click **"Add record"**
5. **Type**: `CNAME` (or `A`)
6. **Name**: `crm`
7. **Target**: `cname.vercel-dns.com` (or Vercel's value)
8. **Proxy status**: Click to turn **OFF** (gray cloud, not orange)
9. Click **"Save"**

#### For Google Domains:
1. Login to https://domains.google.com
2. Click on **santcom.com**
3. Click **"DNS"** in left menu
4. Scroll to **"Custom records"**
5. Click **"Manage custom records"**
6. Click **"Create new record"**
7. **Host name**: `crm`
8. **Type**: `CNAME` (or `A`)
9. **Data**: `cname.vercel-dns.com` (or Vercel's value)
10. **TTL**: `3600`
11. Click **"Save"**

### Step 20: Wait for DNS Propagation

1. DNS changes can take **5-60 minutes** to propagate worldwide
2. **Check DNS status** at: https://dnschecker.org
   - Enter: `crm.santcom.com`
   - It should show your CNAME/A record pointing to Vercel
   - Wait until you see green checkmarks in most locations

### Step 21: Verify in Vercel

1. Go back to your Vercel project → **Settings** → **Domains**
2. You should see `crm.santcom.com` with a green checkmark
3. If you see a warning, wait a few more minutes and refresh the page
4. Vercel automatically provisions an SSL certificate (HTTPS)

---

## PART 4: Final Configuration & Testing

### Step 22: Update Backend CORS (Important!)

Now that your frontend is on a custom domain, update the backend:

1. Go to **Railway** → Your backend service
2. Click **"Variables"** tab
3. Find the `FRONTEND_URL` variable
4. **Edit it** if needed - make sure it says: `https://crm.santcom.com` (no trailing slash)
5. If you had to change it, Railway will redeploy automatically

### Step 23: Test Your Production CRM

1. **Open** https://crm.santcom.com in your browser
2. **Test Registration**:
   - Click "Register" or "Sign Up"
   - Create a test account
   - Fill in: First Name, Last Name, Email, Password
   - Click "Register"
   - You should be redirected to the dashboard

3. **Test Login**:
   - Log out
   - Log back in with your test credentials
   - Verify you can access the dashboard

4. **Test Core Features**:
   - Click "Modules" → "Leads"
   - Try creating a new lead
   - Click "Contacts" and try creating a contact
   - Navigate through different sections (Analytics, Reports, etc.)
   - Check that utility icons work (Calendar, Mail, Notifications, Settings)

5. **Test on Mobile**:
   - Open https://crm.santcom.com on your phone
   - Verify responsive design works
   - Test navigation and core features

### Step 24: Monitor for Errors

1. **Vercel Logs**:
   - Go to your Vercel project → **"Deployments"** tab
   - Click on latest deployment
   - Check **"Runtime Logs"** for any frontend errors

2. **Railway Logs**:
   - Go to Railway → Your backend service
   - Click **"Deployments"** tab
   - Click latest deployment
   - Check logs for any backend errors

3. **Browser Console**:
   - On https://crm.santcom.com, press `F12` (Developer Tools)
   - Check **"Console"** tab for JavaScript errors
   - Check **"Network"** tab to verify API calls are working

---

## Troubleshooting Common Issues

### Issue 1: "Cannot connect to server" or API errors

**Solution**:
1. Check `VITE_API_URL` in Vercel → Settings → Environment Variables
2. Make sure it matches your Railway backend URL exactly
3. Redeploy frontend: Vercel → Deployments → Three dots → "Redeploy"

### Issue 2: "CORS error" in browser console

**Solution**:
1. Go to Railway → Backend service → Variables
2. Check `FRONTEND_URL` = `https://crm.santcom.com`
3. Make sure there's no trailing slash
4. Wait for Railway to redeploy

### Issue 3: DNS not resolving (crm.santcom.com doesn't load)

**Solution**:
1. Wait longer (can take up to 60 minutes)
2. Check https://dnschecker.org with `crm.santcom.com`
3. Verify DNS record in your registrar is correct
4. For Cloudflare users: Turn OFF proxy (gray cloud, not orange)

### Issue 4: Database connection errors

**Solution**:
1. Go to Railway → PostgreSQL database
2. Click on it and check it's "Active"
3. Go to backend service → Variables
4. Verify `DATABASE_URL` exists (Railway adds this automatically)
5. Check backend logs for specific error messages

### Issue 5: Login/Register not working

**Solution**:
1. Open browser console (F12) and check for errors
2. Go to Network tab and check the API request
3. Verify backend is responding: `https://your-backend.railway.app/health`
4. Check Railway backend logs for database errors
5. You may need to run migrations again - see Step 8

### Issue 6: "Page not found" on refresh

**Solution**:
- This is already handled by `vercel.json` rewrites
- If it still happens, check that `vercel.json` exists in `crm/frontend/`
- Redeploy the frontend

---

## Quick Reference URLs

**Your URLs** (replace with your actual values):
- Frontend: https://crm.santcom.com
- Backend: https://your-app-name.up.railway.app (from Railway)
- GitHub Repo: https://github.com/santiagoPR/SAntComm_web

**Service Dashboards**:
- Railway: https://railway.app/dashboard
- Vercel: https://vercel.com/dashboard
- DNS Checker: https://dnschecker.org

**Documentation**:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs

---

## Environment Variables Checklist

### Backend (Railway) - 5 Variables:
- ✅ `DATABASE_URL` (automatically added by Railway PostgreSQL)
- ✅ `JWT_SECRET` (64-character random string)
- ✅ `FRONTEND_URL` = `https://crm.santcom.com`
- ✅ `NODE_ENV` = `production`
- ✅ `PORT` = `5000`

### Frontend (Vercel) - 1 Variable:
- ✅ `VITE_API_URL` = `https://your-backend.railway.app`

---

## Success Checklist

Before considering deployment complete, verify:

- ✅ Backend deployed on Railway without errors
- ✅ PostgreSQL database created and connected
- ✅ Database migrations ran successfully
- ✅ Backend health check responds: `https://your-backend.railway.app/health`
- ✅ Frontend deployed on Vercel without errors
- ✅ Custom domain `crm.santcom.com` configured
- ✅ DNS propagated (check dnschecker.org)
- ✅ SSL certificate active (https works)
- ✅ Registration works
- ✅ Login works
- ✅ Can create leads/contacts
- ✅ All sections accessible (Analytics, Reports, etc.)
- ✅ No console errors in browser
- ✅ Mobile responsive design works

---

## What to Do After Successful Deployment

1. **Delete test data**: Remove any test leads/contacts you created
2. **Create your real admin account**: Register with your actual email
3. **Set up monitoring**:
   - Enable Vercel Analytics
   - Monitor Railway logs for errors
4. **Backup strategy**:
   - Railway has automatic backups
   - Consider exporting database weekly
5. **Share with team**: Send them the link to https://crm.santcom.com

---

## Need Help?

If you run into issues not covered here:

1. **Check the logs**:
   - Railway backend logs
   - Vercel deployment logs
   - Browser console (F12)

2. **Common commands** for debugging:
   ```bash
   # Test backend locally
   cd crm/backend
   npm install
   npx prisma generate
   node src/server.js

   # Test frontend locally
   cd crm/frontend
   npm install
   npm run dev
   ```

3. **Railway CLI** (optional but helpful):
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli

   # Login
   railway login

   # Link to your project
   railway link

   # View logs
   railway logs

   # Run migrations manually
   railway run npx prisma migrate deploy
   ```

---

**You're all set!** Follow these steps in order, and you'll have your CRM running at https://crm.santcom.com within 30-45 minutes.

Good luck! 🚀
