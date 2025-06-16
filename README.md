# Resetrix Invoice App

A modern invoice management application built with Next.js 15, React 19, and Prisma, designed specifically for Resetrix's internal invoice processing and management needs.

## Access

This application is restricted to Resetrix employees only.
Unauthorized access or distribution is prohibited.

## Prerequisites

- Resetrix employee access credentials
- Node.js (Latest LTS version recommended)
- npm, yarn, pnpm, or bun
- PostgreSQL database
- Access to Resetrix's internal development environment

## Getting Started

1. Ensure you have proper authorization from Resetrix IT department
2. Clone the repository from Resetrix's private repository
3. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

4. Set up your environment variables:
```bash
cp .env.example .env
```

5. Initialize the database:
```bash
npm run db:generate
npm run db:push
# or
yarn db:generate
yarn db:push
```

6. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Management

The project uses Prisma for database management. Here are some useful commands:

```bash
# Generate Prisma Client
npm run db:generate

# Push schema changes to database
npm run db:push

# Create and apply migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio

# Reset database
npm run db:reset

# Seed database
npm run db:seed
```

## Project Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/component` - Reusable React components
- `/src/config` - Configuration files
- `/src/style` - Global styles and Tailwind configuration
- `/prisma` - Database schema and migrations

## Features

- Modern UI with Tailwind CSS
- Type-safe development with TypeScript
- Authentication with NextAuth.js
- Form validation with React Hook Form and Zod
- Database management with Prisma
- Email functionality with Resend
- Responsive design with DM Sans font

## Development

- The project uses ESLint and Prettier for code formatting
- TypeScript for type safety
- Tailwind CSS for styling
- Custom hooks for reusable logic
- Component-based architecture

## License

This project is proprietary and confidential. All rights reserved by Resetrix.
- Unauthorized copying, distribution, or use of this software is strictly prohibited
- This software is for internal Resetrix use only
- No part of this software may be reproduced or transmitted in any form without written permission from Resetrix

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
