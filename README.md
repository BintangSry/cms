# Tailwind Landing Page CMS

A lightweight, modern Content Management System (CMS) built specifically for managing landing pages. This project uses **Node.js/Express** on the backend and is fully styled using **Tailwind CSS** on the frontend. It allows you to easily edit your landing page content, update images, and manage settings through an intuitive admin dashboard without touching the code.

## Features

- **Utility-First Styling:** Built completely with Tailwind CSS utility classes.
- **Dynamic Content:** Edit Hero sections, About, Services, Galleries, Testimonials, FAQs, and Contact info dynamically.
- **Real-Time Previews:** Updates are saved immediately and reflect directly on the public website.
- **No Database Needed:** Stores data efficiently in local JSON files (`data/`).
- **Media Uploads:** Integrated image uploads via Multer.
- **Secure Admin Panel:** Built-in authentication (bcrypt + express-session) to protect your CMS.
- **Responsive Design:** Completely mobile-friendly dashboard and landing page.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** HTML, JavaScript (Vanilla), Tailwind CSS
- **Authentication:** bcrypt, express-session
- **Storage:** Local JSON (no external database required)

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/BintangSry/cms.git
   cd cms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Rename `.env.example` to `.env` and configure your settings:
   ```bash
   cp .env.example .env
   ```
   *(Ensure you change the default session secret and admin credentials in production!)*

### Running the Project

To run both the server and Tailwind CSS watcher in development mode:
```bash
npm run dev
```

To build Tailwind CSS for production:
```bash
npm run build
```

To start the server only:
```bash
npm start
```

Your public landing page will be available at: `http://localhost:3000`  
Your admin dashboard will be available at: `http://localhost:3000/admin`

### Default Admin Credentials
- **Username:** `admin`
- **Password:** `admin123` 
*(Note: Change these immediately by modifying your data configuration or using the settings panel)*

## Project Structure

```text
├── admin/               # Admin dashboard HTML and JS
├── data/                # JSON files storing website content, settings, and credentials
├── public/              # Public facing assets, CSS, JS, and index.html
├── server/              # Express route handlers (API, Auth, Uploads)
├── uploads/             # Directory for user-uploaded images
├── server.js            # Main Express application entry point
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
