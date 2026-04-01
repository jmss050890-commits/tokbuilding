# Deployment Guide (Vercel + GitHub)

## 1. Make Code Changes
- Edit your files locally in VS Code.

## 2. Commit Your Changes
- Open the terminal in your project folder.
- Run:
  ```
  git add .
  git commit -m "Describe your changes"
  ```

## 3. Push to GitHub
- Run:
  ```
  git push
  ```
- This uploads your changes to your GitHub repository.

## 4. Automatic Deployment (Vercel)
- Vercel is connected to your GitHub repo.
- Every push triggers a build and deploy automatically.
- View deployment progress and logs on your Vercel dashboard: https://vercel.com

## 5. Manual Deployment (Optional)
- Install the Vercel CLI:
  ```
  npm install -g vercel
  ```
- Deploy manually:
  ```
  vercel deploy --prod
  ```
- Follow prompts to link your project if needed.

## 6. Check Your Live Site
- After deployment, Vercel provides a live URL.
- You can also set up a custom domain in the Vercel dashboard.

---
For more details, see SERVICE_DEPLOYMENT_GUIDE.md or README.md in this project.