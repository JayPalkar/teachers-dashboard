## Teacher Management Interface

A modern, responsive, and accessible Teacher Management Interface built with Next.js, TypeScript, and Tailwind CSS

# Live Demo
https://teachers-dashboard-umber.vercel.app/

# Routes
- homepage:- /
- dashboard:- /teacher/{id}

# Loom Walkthrough
https://drive.google.com/file/d/1p6MRLajPLC5TGBkv7e6I7lq0xa-csbXx/view?usp=drive_link

## Features
- Fully responsive layout (mobile-first)
- Modern UPI-style payment interface
- Booking form with form validation and error handling
- Visual success states
- Modular component-based architecture
- Clean typography and modern layout
- Hover & tap micro-interactions

## Getting Started
1. Clone the Repository
   ```
    git clone https://github.com/JayPalkar/teachers-dashboard.git
    cd teachers-dashboard
   ```
2. Install Dependencies
     ```
     npm install
     # or
     yarn install
     ```
3. Start the Development Server
   ```
   npm run dev
   ```

## Code Quality Highlights
- Used TypeScript interfaces for all form inputs and props.
- Maintained modular folder structure.
- Reused components and ensured clean hooks usage.
- Added animations using @keyframes and Tailwind utilities.

## Assumptions:
- No backend or API connection is used to store or retrieve booking/session data.
- Teacher data and schedule are assumed to come from static/dummy structures.
- Payment flow is simulated — no actual transaction processing is implemented.
