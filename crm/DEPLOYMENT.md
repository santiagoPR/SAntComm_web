# SAntComm CRM Deployment Guide

This guide will help you deploy your CRM application to production with the subdomain `crm.santcom.com`.

## Architecture Overview

- **Frontend**: React + Vite hosted on Vercel
- **Backend**: Express + Prisma hosted on Railway (or Render)
- **Database**: PostgreSQL on Railway (or Supabase)
- **Domain**: crm.santcom.com

## Step 1: Deploy Backend (Railway)

### 1.1 Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Connect your `SAntComm_web` repository

### 1.2 Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `santiagoPR/SAntComm_web`
4. Select the `main` branch

### 1.3 Configure Backend Service
1. Set root directory: `crm/backend`
2. Add environment variables:
   - `DATABASE_URL`: (Railway will auto-provide if you add PostgreSQL)
   - `JWT_SECRET`: Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `FRONTEND_URL`: `https://crm.santcom.com`
   - `NODE_ENV`: `production`
   - `PORT`: `5000`

### 1.4 Add PostgreSQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically set `DATABASE_URL` for your backend service

### 1.5 Deploy & Run Migrations
1. Railway will auto-deploy
2. Once deployed, run migrations via Railway CLI or dashboard terminal:
   ```bash
   npx prisma migrate deploy
   npx prisma generate
   ```

### 1.6 Get Backend URL
- Copy your backend URL from Railway (e.g., `https://your-app.railway.app`)
- You'll need this for the frontend configuration

## Step 2: Deploy Frontend (Vercel)

### 2.1 Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub

### 2.2 Import Project
1. Click "Add New..." → "Project"
2. Import `santiagoPR/SAntComm_web`
3. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `crm/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 2.3 Add Environment Variables
1. Go to Project Settings → Environment Variables
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://your-app.railway.app`)
   - Apply to: Production, Preview, Development

### 2.4 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Copy your Vercel URL (e.g., `https://your-project.vercel.app`)

## Step 3: Configure Custom Domain

### 3.1 Add Domain to Vercel
1. Go to your Vercel project → Settings → Domains
2. Add `crm.santcom.com`
3. Vercel will provide DNS records

### 3.2 Update DNS Records
1. Go to your domain registrar (where you manage santcom.com)
2. Add a CNAME record:
   - **Type**: CNAME
   - **Name**: crm
   - **Value**: `cname.vercel-dns.com` (or the value Vercel provides)
   - **TTL**: 3600 (or automatic)

3. Wait for DNS propagation (can take 5-60 minutes)

### 3.3 Verify SSL Certificate
- Vercel will automatically provision an SSL certificate
- Your site will be available at `https://crm.santcom.com`

## Step 4: Update Backend CORS

1. Go to Railway → Your backend service → Variables
2. Update `FRONTEND_URL` to `https://crm.santcom.com`
3. Redeploy the backend

## Step 5: Test Production Deployment

1. Visit `https://crm.santcom.com`
2. Test user registration
3. Test login
4. Test creating a lead, contact, or deal
5. Verify all features work

## Environment Variables Summary

### Backend (Railway)
```env
DATABASE_URL=postgresql://user:password@host:port/santcomm_crm
JWT_SECRET=your-production-jwt-secret-32-chars-minimum
FRONTEND_URL=https://crm.santcom.com
NODE_ENV=production
PORT=5000
```

### Frontend (Vercel)
```env
VITE_API_URL=https://your-backend.railway.app
```

## Alternative: Deploy Backend to Render

If you prefer Render over Railway:

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repo
4. Configure:
   - **Root Directory**: `crm/backend`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `node src/server.js`
5. Add PostgreSQL database from Render
6. Set environment variables (same as Railway)

## Troubleshooting

### Frontend can't connect to backend
- Check `VITE_API_URL` in Vercel environment variables
- Verify CORS settings in backend (`FRONTEND_URL`)
- Check backend logs in Railway/Render

### Database errors
- Verify `DATABASE_URL` is set correctly
- Run `npx prisma migrate deploy` on backend
- Check database connection from Railway/Render logs

### DNS not resolving
- Wait 5-60 minutes for DNS propagation
- Use [dnschecker.org](https://dnschecker.org) to verify
- Check CNAME record is pointing to correct Vercel address

## Next Steps

After successful deployment:

1. Set up monitoring (Vercel Analytics, Railway monitoring)
2. Configure backup strategy for PostgreSQL
3. Set up error tracking (Sentry, LogRocket)
4. Configure email service for notifications
5. Set up CI/CD for automatic deployments

## Support

For deployment issues:
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
