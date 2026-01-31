# VSG Week 1 Assessment

A simple React app for interns to complete their Week 1 assessment.

## Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
1. Create a new repository on GitHub (e.g., `vsg-assessment`)
2. In your terminal:
   ```bash
   cd vsg-assessment
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/vsg-assessment.git
   git push -u origin main
   ```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your `vsg-assessment` repository
4. Click "Deploy" (Vercel auto-detects Vite)
5. Done! You'll get a URL like `vsg-assessment.vercel.app`

## Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

## How It Works

- Interns fill out the multi-section assessment
- On submit, they see a formatted summary
- They copy it to clipboard and send to Daniel via email/Slack
