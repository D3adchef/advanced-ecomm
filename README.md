# 🛒 Advanced E-COM Store

A fully functional and stylized e-commerce web app built with **React**, **TypeScript**, **Redux Toolkit**, **React Query**, and **Vite**.  
This project blends **modern web development practices** with a **gothic aesthetic**, featuring persistent cart state, category filtering, automated testing, and CI/CD deployment.

---

## 🚀 Live Demo

- **Vercel Production:** [View Live App](https://advanced-ecomm.vercel.app)  
- **GitHub Pages Backup:** [View on GitHub Pages](https://d3adchef.github.io/advanced-ecomm/)

---

## ✨ Features

- ⚡️ **Modern Tech Stack** – React + Vite + TypeScript
- 🧠 **State Management** – Redux Toolkit
- 📡 **Server State** – React Query (FakeStore API)
- 🛍️ **Persistent Cart** – Saves in `sessionStorage`
- 🔎 **Category Filtering** – Filter products by type
- 🦇 **Gothic UI** – Custom fonts, hover effects, and dark theme
- 🛒 **Mini Cart Dropdown** + Full Cart Page
- ✅ **Checkout** + **Clear Cart** Functionality
- 🧪 **Testing Suite** – Jest + React Testing Library
- 🔄 **CI/CD** – Auto build/test/deploy with Vercel

---

## 🧰 Tech Stack

- **Frontend:** React, Vite, TypeScript
- **State:** Redux Toolkit
- **Data Fetching:** React Query
- **Routing:** React Router DOM
- **Styling:** CSS3 + Google Fonts (Cinzel)
- **Testing:** Jest, React Testing Library
- **Deployment:** Vercel (Production) & GitHub Pages (Backup)

---

## 🛠 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/D3adchef/advanced-ecomm.git
cd advanced-ecomm
2. Install Dependencies
bash
Copy
Edit
npm install
3. Run Locally
bash
Copy
Edit
npm run dev
Your app will start at: http://localhost:5173

📦 Build & Deploy
Build:

bash
Copy
Edit
npm run build
Vercel Deployment: Push to main branch to trigger automated build & deploy.
GitHub Pages Deployment:

bash
Copy
Edit
npm run deploy
📂 Project Structure
bash
Copy
Edit
src/
├── api/             # API fetch functions
├── components/      # Navbar, MiniCart, etc.
├── features/        # Redux slice for cart
├── pages/           # Home and Cart pages
├── store/           # Redux store config and typed hooks
├── tests/           # Jest test files
├── App.tsx
└── main.tsx
✅ Testing Status
All Jest tests passing as of final commit:
minimal tests passing, jest config stable, clean structure

💀 Author
D3adchef – GitHub Profile
