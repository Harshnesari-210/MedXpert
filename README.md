<p align="center">
  <img src="https://img.shields.io/badge/AI-T5--Transformer-1f425f?style=for-the-badge&logo=OpenAI&logoColor=white" />
  <img src="https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-026e00?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React.js%20%7C%20TailwindCSS-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Database-MongoDB-4DB33D?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-JWT%20%7C%20RBAC-f0ad4e?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Event-Team%20Mavericks%20Hackathon-6f42c1?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/Status-Completed-28a745?style=for-the-badge&logo=checkmarx&logoColor=white" />
  <img src="https://img.shields.io/github/license/Harshnesari-210/MedXpert?style=for-the-badge&color=grey&logo=opensourceinitiative&logoColor=white" />
</p>


<h1 align="center">🩺 MedXpert</h1>
<p align="center"><i>AI-powered doctor recommendation & appointment booking platform based on lab reports.</i></p>


---


## 🎓 Project Overview

MedXpert began as an idea during a university hackathon under the team name *Team Mavericks*.  
Inspired by real-world medical challenges, it was later independently developed and scaled into a full-stack AI-powered platform.

🔍 **Why we built it:**  
Patients often struggle to interpret their lab reports and  choose the right specialist. We aimed to bridge this gap using AI.

🧠 **What we built:**  
A full-stack web platform that allows users to upload lab reports, extracts symptoms using a fine-tuned T5 model, and auto-suggests specialized doctors accordingly.

🛠️ **How we built it:**  
The system uses MERN stack (React, Node.js, Express, MongoDB) and a Flask-based AI microservice (T5 Transformer) for NLP.
It includes secure login, role-based access (patient/doctor), and intelligent report analysis.



---

### 🚀 Features
- Upload lab reports (PDF or text)
- Extract key symptoms using a fine-tuned T5 NLP model
- Auto-suggest specialized doctors
- Role-based access for patients and doctors
- Secure session handling and protected routes

---

### 🛠️ Tech Stack
- **Frontend**: React.js + Tailwind CSS
- **Backend**: Node.js + Express
- **AI Module**: Python Flask (T5 Transformer Model)
- **Database**: MongoDB
- **Authentication**: JWT with secure cookies

---

### 📸 Demo
> ⚠️ *Demo video coming soon!*  
We'll add a YouTube link or embedded video/GIF here later.

---

### 📂 Folder Structure 
```
MedXpert/
├── AI_MODEL/                 # Flask backend for AI – T5 model & symptom extraction
│   ├── Flask_back.py         # Main Python server script
│   ├── MyModel.ipynb         # Jupyter notebook with model training
│   ├── requirements.txt      # Python dependencies
│   └── templates/            # HTML templates for basic Flask serving
│
├── backend/                  # Express.js backend for APIs and auth
│   ├── server.js             # App entry point
│   ├── backend.js            # Core backend logic
│   ├── routes/               # API route handlers
│   └── uploads/              # Uploaded lab reports
│
├── src/                      # Frontend source (React)
│   ├── components/           # UI components
│   ├── pages/                # Route-specific pages
│   └── App.js                # App bootstrap
│
├── public/                   # Public assets
├── package.json              # Frontend dependencies
├── backend.js                # (Note: also exists in root, can be renamed if duplicate)
└── README.md
```


---

### ✅ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/Harshnesari-210/MedXpert.git
cd MedXpert

# Install backend dependencies
cd backend
npm install

# Start backend server
npm begin

# Open a new terminal for frontend
cd ../frontend
npm install
npm start

# Flask AI server
cd ../AI_MODEL
pip install -r requirements.txt
python app.py

```
---
## License

This project is licensed under the [MIT License](LICENSE).

