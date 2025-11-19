# Order-App  
> A modern, high-performance web application built with Vue 3, TypeScript & Vite  

## 🚀 Overview  
Order-App is a sleek, scalable frontend solution designed for managing and processing orders in real-time. Built with Vue 3 and TypeScript, powered by Vite for lightning-fast builds and a snappy developer experience.

## 🔧 Tech Stack  
- **Framework:** Vue 3 (with `<script setup>` syntax)  
- **Language:** TypeScript  
- **Bundler / Dev Environment:** Vite  
- **Testing:** Vitest (with configuration ready)  
- **Version Control:** Git (with `develop` branch representing latest features)  
- **Configuration:** `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `tsconfig.vitest.json` pre-setup  
- **Docker:** Includes `Dockerfile` for containerised builds  

## 🧭 Key Features  
- Clean and modular architecture for rapid feature development  
- Type-safe data flows with TypeScript  
- Fast HMR (Hot Module Replacement) thanks to Vite  
- Configured for both development and production modes  
- Built-in unit testing capability  
- Docker-ready for deployment in containerised environments  

## 📝 Getting Started  
### Prerequisites  
Ensure you have the following installed:  
- Node.js (-recommended version: 16 or above)  
- npm (or yarn)  
- Docker (if you plan to containerise)  

### Installation  
```bash
# Clone the repository
git clone --branch develop https://github.com/ali-feiz/order-app.git  
cd order-app  

# Install dependencies
npm install  

# Start development server
npm run dev  

# Build for production
npm run build  

#Running test
npm run test:unit  



