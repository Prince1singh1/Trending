# Deployment Guide: Going Live 🚀

Follow these steps to deploy your **Affiliate TrendHub** to a live production environment (recommended: **Vercel**).

## 1. Prerequisites
- A [GitHub](https://github.com) account.
- A [Vercel](https://vercel.com) account (linked to GitHub).
- Your project pushed to a GitHub repository.

## 2. Environment Variables
When deploying, you **MUST** set these environment variables in your Vercel project settings:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `JWT_SECRET` | Secret key for admin login security | `your_long_random_string_here` |
| `DB_PATH` | Path to your local JSON DB (fallback) | `./src/data/db.json` |

> [!IMPORTANT]
> Since this version uses a local `db.json` for storage, changes made in the admin panel on Vercel will **not persist** between deployments. For a permanent live site, we recommend migrating to a database like **MongoDB Atlas**.

## 3. Vercel Deployment Steps
1. **Push Code**: Run `git push origin main` to ensure your latest changes (including my fixes!) are on GitHub.
2. **Import Project**: In Vercel, click **"Add New"** > **"Project"** and select your repository.
3. **Configure Settings**:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
4. **Add Env Vars**: Expand the "Environment Variables" section and add your `JWT_SECRET`.
5. **Deploy**: Click **"Deploy"**. Vercel will build and host your site on a `.vercel.app` domain for free!

## 4. Custom Domain (Optional)
Once deployed, you can add your own domain (e.g., `www.yourtrendhub.com`) in the **Settings > Domains** section of your Vercel project.

---

### Migration Tip: Persistent Storage
If you want your "Add Product" changes to save permanently on the live site, I can help you migrate the `db.json` logic to a **MongoDB Atlas** database in our next session!
