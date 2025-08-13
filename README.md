# 🎨 Color Palette Generator

A responsive **Next.js + TailwindCSS** web application that generates beautiful color palettes instantly.  
Users can select a base color and receive a curated palette, with the option to fetch the API directly.

## 🚀 Features

- 🎯 Generate palettes based on a chosen base color
- 🌐 Public API endpoint to get color palettes
- 📱 Fully responsive design
- ⚡ Built with Next.js 14 and TailwindCSS
- 🔄 Fast server-side rendering

## 📂 Project Structure

├── app/ # Next.js App Router pages and components
├── public/ # Static assets
├── styles/ # Global styles
├── package.json # Dependencies and scripts
└── README.md # Project documentation

## 🛠️ Tech Stack

- **Next.js 14** – React framework for SSR and routing
- **TailwindCSS** – Utility-first styling
- **TypeScript** – Type safety
- **Vercel** – Deployment platform

## 📦 Installation & Setup

-1. **Clone the repository**

```bash
git clone https://github.com/yourusername/color-palette-generator.git
cd color-palette-generator
```

-2. **Install dependencies**

```bash
npm install
```

-3. **Run the development server**

```bash
 npm run dev
```

-4. **Open in browser**

```bash
 http://localhost:3000
```

-🌐 API Usage
The application exposes a simple public API to generate a color palette.

-Endpoint:

```bash
 GET /api/colors?base=#HEXCODE
```

-Example:

```GET https://your-deployment-url.vercel.app/api/colors?base=#ff5733

```

```
[
"#FF5733",
"#FFD700",
"#33FF57",
"#6A0DAD",
"#1E90FF"
]
```

-📜 License
This project is licensed under the MIT License.

```
**I can also add a **"Run API on Same Website"** section in the README so your users know they can test the API right from the site without leaving it. **

**Do you want me to add that?**
```
