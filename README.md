<h1 align="center">🩺 MedXpert</h1>
<p align="center"><i>AI-powered doctor recommendation & appoinment booking platform based on lab reports.</i></p>

---

### 🔍 Overview
MedXpert is a web-based AI platform that helps patients by analyzing lab reports and suggesting the most suitable medical specialists. It aims to reduce manual effort and improve diagnosis direction through intelligent keyword extraction and recommendation.

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
cd ../ml-service
pip install -r requirements.txt
python app.py
