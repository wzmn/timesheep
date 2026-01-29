# TimeSheep

TimeSheep is a cutting-edge timesheet web application designed to revolutionize how you manage employee work hours. Effortlessly track and monitor employee attendance and productivity from anywhere, anytime, using any internet-connected device.

## Features

- **Effortless Tracking**: Seamless, user-first interface for managing work hours.
- **Real-time Monitoring**: Monitor employee attendance and productivity from anywhere.
- **Secure Access**: Data is protected with high-grade encryption.
- **Authentication**: Secure login and registration system powered by NextAuth.js.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/timesheep.git
   cd timesheep
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

This project uses the Next.js App Router. Key directories include:

- `app/`: Contains all routes, pages, and layouts.
- `public/`: Stores static assets like images.

## Assumptions

- **Database**: The application is built to work with MongoDB.
- **Environment Variables**: The application requires specific environment variables to function correctly, typically defined in a `.env` file:
  - `DATABASE_URL`: Your MongoDB connection string.
  - `NEXTAUTH_SECRET`: Used to encrypt session data.
  - `NEXTAUTH_URL`: The canonical URL of your site.