# Affiliate TrendHub

Premium Amazon & Flipkart Affiliate Website with a powerful Admin Panel. Built with Next.js 15, Tailwind CSS, and MongoDB.

## Features
- **Modern UI**: Dark mode default, premium glassmorphism design, and smooth animations.
- **Dynamic Content**: Product carousels, category discovery, and real-time search.
- **Admin Panel**: Secure dashboard for managing products, categories, and tracking clicks.
- **SEO Optimized**: SSR, meta tags, and robots.txt ready.
- **Monetization**: Optimized for Amazon & Flipkart affiliate programs with cloaked links.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Swiper.js
- **Backend**: Next.js API Routes, MongoDB (Mongoose), JWT, Cloudinary
- **Storage**: Cloudinary (for product images)
- **Deployment**: Vercel (Frontend/Backend), MongoDB Atlas (Database)

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root directory and add the following variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Seed the Database
Run the seed script to create the initial admin account and categories:
```bash
npx ts-node src/scripts/seed.ts
```
*Default login: `admin@trendhub.live` / `adminpassword123`*

### 4. Run Development Server
```bash
npm run dev
```

## Deployment
1. **Frontend**: Deploy to Vercel.
2. **Database**: Use MongoDB Atlas.
3. **Media**: Set up a free account on Cloudinary.
