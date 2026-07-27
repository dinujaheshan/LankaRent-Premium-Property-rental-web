# LankaRent - Premium Property Rental Web Application

LankaRent is a modern, premium property rental web application built with Next.js. It offers a seamless experience for users to browse property listings, apply for rentals, and track their applications. It also features a robust administrative dashboard for managing properties and applications.

## 🚀 Features

- **Property Listings:** Browse a curated list of premium properties with detailed information and high-quality images.
- **Search & Filtering:** Easily find the perfect property using advanced search and filtering options.
- **Rental Applications:** Apply for properties directly through the website with a seamless application process.
- **Application Tracking:** Track the status of your rental applications in real-time.
- **Admin Dashboard:** Secure admin panel to manage property listings, view applications, and manage user inquiries.
- **Responsive Design:** Fully responsive and optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database:** MongoDB with [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for validation
- **Email:** Nodemailer
- **UI Components:** Swiper for image carousels

## 📁 Project Structure

```text
├── app/                  # Next.js App Router (Pages, Layouts, API routes)
│   ├── admin/            # Admin dashboard pages
│   ├── api/              # Backend API routes
│   ├── apply/            # Rental application flow
│   ├── confirmation/     # Success/confirmation pages
│   ├── help/             # Help and support pages
│   ├── listings/         # Property listings and details
│   └── track/            # Application tracking pages
├── components/           # Reusable UI components
├── lib/                  # Utility functions and database configuration
├── public/               # Static assets (images, fonts, etc.)
└── types/                # TypeScript type definitions
```

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, or pnpm
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "property rental web"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add the necessary environment variables. Refer to the existing `.env.local` file (or provide a sample `.env.example` if available) for the required keys, typically including:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   # Add email configuration for Nodemailer if required
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch and fix code issues.

## 📄 License

This project is licensed under the MIT License.
