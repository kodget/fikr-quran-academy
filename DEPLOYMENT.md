# Deployment Guide

## Prerequisites

1. A production database (PostgreSQL recommended)
2. Vercel account (or other hosting platform)
3. Environment variables configured

## Step 1: Set Up Production Database

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel project dashboard
2. Navigate to Storage → Create Database → Postgres
3. Copy the DATABASE_URL connection string

### Option B: Other PostgreSQL Providers
- Supabase: https://supabase.com/
- Neon: https://neon.tech/
- Railway: https://railway.app/
- PlanetScale: https://planetscale.com/

## Step 2: Configure Environment Variables in Vercel

Go to your Vercel project → Settings → Environment Variables and add:

### Required Variables:
```
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
ADMIN_EMAIL=fikrquranacademy@gmail.com
ADMIN_PASSWORD=your-secure-admin-password
ADMIN_NAME=Fikr Admin
```

### Payment (Paystack):
```
PAYSTACK_PUBLIC_KEY=pk_live_xxxxx
PAYSTACK_SECRET_KEY=sk_live_xxxxx
```

### Email (Resend):
```
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=fikrquranacademy@gmail.com
```

### App Configuration:
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Step 3: Deploy

### First-Time Deployment:
```bash
# Push to GitHub
git add .
git commit -m "Prepare for deployment"
git push

# Vercel will automatically build and deploy
```

### Manual Deployment (Alternative):
```bash
npm install -g vercel
vercel --prod
```

## Step 4: Run Database Migrations

After deployment, run migrations in Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Functions
2. Or use Vercel CLI:
```bash
vercel env pull .env.production
npx prisma migrate deploy
npx prisma db seed
```

## Step 5: Verify Admin Access

1. Navigate to: `https://your-domain.vercel.app/admin/login`
2. Login with:
   - Email: The value you set in `ADMIN_EMAIL`
   - Password: The value you set in `ADMIN_PASSWORD`

## Troubleshooting

### Admin login not working:
1. Check that environment variables are set in Vercel
2. Verify DATABASE_URL is correct
3. Run seed command manually:
   ```bash
   npx prisma db seed
   ```

### Database connection errors:
1. Verify DATABASE_URL format
2. Check database is accessible from Vercel's region
3. Ensure SSL is configured if required

### Build failures:
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in package.json
3. Ensure Node.js version compatibility

## Database Schema Migration

When you make schema changes:

```bash
# Create migration
npx prisma migrate dev --name your_migration_name

# Deploy to production
npx prisma migrate deploy
```

## Admin User Management

### Create additional admin users:
```bash
npx ts-node scripts/create-admin.ts <email> <password> <name>
```

Example:
```bash
npx ts-node scripts/create-admin.ts admin@example.com SecurePass123 "Admin User"
```

## Security Checklist

- [ ] Change JWT_SECRET to a secure random string (min 32 characters)
- [ ] Use strong ADMIN_PASSWORD
- [ ] Use production Paystack keys (not test keys)
- [ ] Configure proper CORS settings
- [ ] Enable database SSL connections
- [ ] Review and restrict API rate limits
- [ ] Set up monitoring and error tracking

## Maintenance

### Backup Database:
Regular backups are crucial. Most providers offer automatic backups.

### Monitor Application:
- Set up error tracking (Sentry, LogRocket)
- Monitor performance (Vercel Analytics)
- Check database performance

### Update Dependencies:
```bash
npm update
npm audit fix
```
