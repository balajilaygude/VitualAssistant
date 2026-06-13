# AI Virtual Assistant (Jarvis-Inspired)

## Overview

AI Virtual Assistant is a full-stack MERN application inspired by Jarvis that provides users with an intelligent conversational assistant capable of answering questions, assisting with daily tasks, and maintaining natural interactions through AI-powered responses.

The project was created to build something meaningful in the AI space that could genuinely help users during difficult or busy situations by providing instant assistance, information, and support through a simple and intuitive interface.

## Key Features

* AI-powered conversational assistant
* Gemini API integration for intelligent and context-aware responses
* Secure JWT authentication using HTTP-only cookies
* User registration and login system
* Password hashing and security using bcrypt
* Cloudinary image upload and management
* Responsive modern UI built with Tailwind CSS
* Context API for global state management
* Protected routes with React Router DOM
* Real-time chat experience
* Secure backend architecture with Express and MongoDB
* Fully deployed and accessible online

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Context API
* React Router DOM
* Axios
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt
* Multer
* Cloudinary
* CORS
* dotenv

### Deployment

* Render

## Architecture

Frontend (React + Tailwind CSS)
↓
Axios API Calls
↓
Backend (Node.js + Express.js)
↓
Authentication Layer (JWT + Cookies + bcrypt)
↓
MongoDB Database (Mongoose)
↓
Gemini AI API & Cloudinary Services

## Challenges Faced

### 1. Building a Real AI Assistant Experience

One of the biggest challenges was creating an assistant that felt useful rather than a simple chatbot. Integrating the Gemini API and handling dynamic AI responses required careful prompt management and response handling.

### 2. Secure Authentication

Implementing JWT authentication with HTTP-only cookies while maintaining a seamless user experience required balancing security and usability.

### 3. Image Upload Management

Handling image uploads efficiently involved integrating Multer and Cloudinary while ensuring proper validation and storage optimization.

### 4. State Management

Managing authentication state, user data, and AI conversations across multiple components was solved using React Context API.

## Security Implementations

* Password hashing using bcrypt
* JWT-based authentication
* HTTP-only cookie storage
* Protected API routes
* Input validation and error handling
* Environment variable management using dotenv

## Live Project

Live Demo:
https://vitualassistant.onrender.com/

## Some Pages and Video

<img width="1918" height="966" alt="Screenshot 2026-06-13 200224" src="https://github.com/user-attachments/assets/4a944337-3714-4151-9aa3-1de1fef7e6b9" />

<img width="1918" height="967" alt="Screenshot 2026-06-13 200516" src="https://github.com/user-attachments/assets/da5209db-1f10-438e-9fc7-ec5133e8a2de" />

<img width="1918" height="912" alt="Screenshot 2026-06-13 200806" src="https://github.com/user-attachments/assets/2ea66b28-2de2-4375-b0be-17415b0701df" />

## Impact

This project demonstrates full-stack development skills, secure authentication practices, third-party API integration, cloud storage management, and modern React application architecture. It showcases the ability to build a production-ready AI-powered application using the MERN stack.
