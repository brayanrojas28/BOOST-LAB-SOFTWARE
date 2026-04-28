# 🚀 BOOST LAB SOFTWARE

## 📌 Descripción
BOOST LAB SOFTWARE es una aplicación web fullstack que integra un backend en Node.js y un frontend en React.

El proyecto está estructurado bajo buenas prácticas de desarrollo:
- Backend con arquitectura por capas (controllers, services, repositories)
- Frontend modular por páginas (cada módulo contiene vista, estilos y lógica)

---

## 🏗️ Arquitectura del proyecto

### 🔙 Backend (Node.js)

Estructura por capas:

- **controllers** → Manejo de peticiones HTTP  
- **services** → Lógica de negocio  
- **repositories** → Acceso a datos  
- **routes** → Endpoints de la API  
- **middlewares** → Autenticación y validaciones  
- **config** → Configuración (DB, variables, etc.)

---

### 🎨 Frontend (React)

Arquitectura modular por páginas:

Cada módulo contiene:
- Componente (`.jsx`)
- Estilos (`.css`)
- Lógica (`services`)

Ejemplo:
pages/
└── login.module/
    ├── Login.jsx
    ├── Login.css
    └── auth.service.js

## 🛠️ Tecnologías utilizadas

### Backend
- Node.js
- Express

### Frontend
- React
- CSS

---

## ⚙️ Requisitos previos

- Node.js
- npm
- Git

---

## 🚀 Instalación

### 1. Clonar repositorio

git clone https://github.com/brayanrojas28/BOOST-LAB-SOFTWARE.git
cd BOOST-LAB-SOFTWARE

---

## ▶️ Ejecución del proyecto

### 🔙 Backend

cd backend
npm install
npm run start

---

### 🎨 Frontend

cd frontend
npm install
npm start

---

## 📡 API - ENDPOINTS BOOST

### Base URL

http://localhost:8080/api

---

### 🔐 Autenticación

#### 🔹 Login

**POST** `/auth/login`

json
{
  "userName": "1111111111",
  "password": "123456"
}


---

#### 🔹 Registro de usuario (primer paso)

**POST** `/auth/register`

json
{
  "userName": "111111111",
  "fullName": "Usuario de prueba #1",
  "email": "user1@boost.com",
  "password": "123456",
  "role": "professional"
}

---

### 👤 Registro de Cliente (segundo paso)

**POST** `/register/client`

json
{
  "idUser": 2,
  "address": "Calle 45 #12",
  "city": "Medellín",
  "birthDate": "1995-06-15",
  "occupation": "Estudiante",
  "bio": "Me interesa aprender Matemáticas",
  "phoneNumber": "30000000000"
}

---

### 🧑‍💼 Registro de Profesional (segundo paso)

**POST** `/register/professional`

json
{
  "idUser": 2,
  "profession": "Psicólogo",
  "experience": 5,
  "languages": ["es", "en"],
  "softSkills": ["empatía", "comunicación"],
  "professionalLicense": "LIC-98765"
}

---

## 🧠 Flujo del sistema

1. Registro inicial:

POST /auth/register

2. Completar registro según rol:

* Cliente:
POST /register/client

* Profesional:
POST /register/professional

3. Login:
POST /auth/login

## 📁 Estructura del proyecto
---
BOOST-LAB-SOFTWARE/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│
└── README.md
---

## 📌 Funcionalidades

* ✔️ Autenticación de usuarios
* ✔️ Registro de clientes y profesionales
* ✔️ Gestión de perfiles
* ✔️ Arquitectura escalable
* ✔️ Frontend modular

---

## 🤝 Contribución

git checkout -b feature/nueva-funcionalidad
git commit -m "Nueva funcionalidad"
git push origin feature/nueva-funcionalidad

Luego abrir Pull Request.

## 👨‍💻 Autores

**Brayan Roja y Daniel Castro**
