# Fikr Quran Academy Website

This is the official website for Fikr Quran Academy - an online Qur'anic education institution.

## Technology Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3.4
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Deployment on Vercel

This project is optimized for Vercel deployment:

1. Push your code to GitHub/GitLab/Bitbucket
2. Import the project in Vercel
3. Vercel will automatically detect Next.js and deploy

### Important Notes for Vercel:

- Images are stored in `public/images/` directory
- Next.js Image component is configured with `unoptimized: true` for compatibility
- All images will be served from the `/images/` path

## Project Structure

```
├── app/
│   ├── page.tsx          # Main application component
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles and Tailwind
├── public/
│   └── images/           # Static image assets
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Contact Information

- **WhatsApp:** +234 911 438 5960
- **Phone:** +234 818 201 6174
- **Email:** fikrquranacademy@gmail.com
- **Instagram:** @fikr_quran_academy
- **Facebook:** Fikr Qur'an Academy

## Programs Offered

1. Basic Qaidah (Foundation)
2. Reading The Qur'an Fluently (Nazrah)
3. Memorization of The Qur'an (Hifzul Qur'an)
4. Revision For Huffaz (Murojah)

## Pricing

- ₦40,000/month - Twice weekly (8 sessions)
- ₦50,000/month - Three times weekly (12 sessions)
- ₦60,000/month - Four times weekly (16 sessions)

## License

Copyright © 2024 Fikr Quran Academy. All rights reserved.
