# 🛍️ Heart Cart — E-Commerce Web App

Heart Cart is a responsive e-commerce web application built with **React + Vite** and powered by **Firebase**.  
It allows users to register, log in, browse products, and manage their own shopping cart, with real-time updates stored in **Firestore**.

This is a demo project, if you don't want to register, you can use this test account:
- email: test@test.com
- password: 123456a

[Live Demo](https://heartcart.netlify.app/)

---

## ✨ Features

- 🔐 **Authentication**
  - User registration with email & password
  - Custom user profile with **name** and **phone number**
  - Log in & log out functionality
  - Auth state persistence across sessions

- 🛒 **Shopping Cart**
  - Add products to cart (saved per user in Firestore)
  - Increment / decrement item quantity
  - Remove individual items
  - Empty entire cart
  - Real-time cart synchronization (using `onSnapshot`)
  - Dynamic badge in navbar showing total items

- 📱 **Responsive UI**
  - Custom **responsive navbar**
  - Mobile menu (hamburger with slide-down menu)
  - Adaptive layout for desktop, tablet, and mobile

- 📦 **Products**
  - Products displayed with image, name, price
  - Fake store API integration (or placeholder data)

---

## 🛠️ Technologies Used

- **Frontend**
  - [React 18](https://react.dev/) (with **Vite**)
  - [React Router 7](https://reactrouter.com/) for navigation
  - [TypeScript](https://www.typescriptlang.org/) for type safety
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - SVG icons imported as React components

- **Backend / Database**
  - [Firebase Authentication](https://firebase.google.com/docs/auth)  
  - [Cloud Firestore](https://firebase.google.com/docs/firestore)  
  - Firestore Security Rules (to secure user data and cart items)

- **Hosting**
  - [Netlify](https://www.netlify.com/) for deployment and environment variables

---

## 📚 Knowledge & Skills Applied

- **Authentication Flow**
  - `createUserWithEmailAndPassword`  
  - `updateProfile` to store `displayName`  
  - `onAuthStateChanged` with React’s `useEffect`  

- **Firestore Integration**
  - CRUD operations with `getDoc`, `getDocs`, `setDoc`, `deleteDoc`  
  - Real-time updates using `onSnapshot`  
  - Collection structure:  
    ```
    users/{uid}/cart/{productId}
    ```

- **React Concepts**
  - Context API (`AuthContext`, `CartContext`) for global state management
  - Custom hooks for accessing contexts
  - Controlled forms with `useRef`
  - `useState`, `useEffect`, and `useMemo`

- **Responsive Design**
  - Tailwind breakpoints (`md:`, `lg:`)
  - Mobile menu toggle state (`useState` for hamburger menu)
  - Conditional rendering for authenticated vs non-authenticated users

- **Deployment**
  - Vite build process
  - Netlify environment variables (`VITE_FIREBASE_...`)
  - `_redirects` file for React Router compatibility
