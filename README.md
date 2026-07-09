# 🚀 GrowEasy AI CSV Importer

An AI-powered CSV Importer built for the GrowEasy Software Developer Assignment.

The application intelligently extracts CRM lead information from CSV files with different structures using Google's Gemini AI and converts them into the GrowEasy CRM format.

---

## ✨ Features

### Frontend

- 📂 Drag & Drop CSV Upload
- 📄 CSV Preview before processing
- 📱 Fully Responsive UI
- 🔍 Search CRM Records
- ↕️ Sort by Name, Email, Company, City & Status
- 📑 Pagination
- 📥 Export Parsed Records
  - CSV
  - JSON
  - Excel
- 📊 Import Summary Dashboard
- 🚦 Loading States
- ⚠️ Error Handling
- ♻️ Duplicate Records Table

---

### Backend

- Upload CSV API
- CSV Parsing
- CSV Validation
- AI Batch Processing (Gemini)
- Intelligent Field Mapping
- Duplicate Detection
- Statistics Generation
- Structured CRM JSON Response
- Error Handling
- Stateless Architecture

---

## 🧠 AI Features

Gemini AI intelligently maps different CSV structures into GrowEasy CRM fields.

Supported CRM fields:

- created_at
- name
- email
- country_code
- mobile_without_country_code
- company
- city
- state
- country
- lead_owner
- crm_status
- crm_note
- data_source
- possession_time
- description

The application supports CSV files from:

- Facebook Lead Export
- Google Ads Export
- Excel Sheets
- Marketing CSV
- Real Estate CRM
- Sales Reports
- Custom CSV files

---

## 🛠 Tech Stack

### Frontend

- Next.js
- React
- Tailwind CSS
- React Dropzone
- PapaParse
- Axios
- React Hot Toast
- Lucide Icons

### Backend

- Node.js
- Express.js
- Multer
- Gemini AI API

---

## 📂 Project Structure

```
GrowEasy-AI-Importer
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── utils
│   ├── prompts
│   ├── middleware
│   └── server.js
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   └── utils
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Abinash2648/GrowEasy-AI-Importer.git

cd GrowEasy-AI-Importer
```

---

### Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run backend

```bash
npm start
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🌐 Application URLs

Frontend

```
http://localhost:3000
```

Backend

```
http://localhost:5000
```

---

## 📸 Workflow

1. Upload CSV
2. Preview Data
3. Confirm Import
4. AI Processing
5. View CRM Records
6. Search / Sort / Pagination
7. Export Results

---

## 📊 Import Summary

The application displays

- Imported Records
- Skipped Records
- Duplicate Records
- Success Rate
- Total Records

---

## 📤 Export Options

Parsed CRM records can be exported as

- CSV
- JSON
- Excel

---

## 🚀 Deployment

Frontend

- Vercel

Backend

- Render

---

## 🔒 Environment Variables

```
PORT
GEMINI_API_KEY
```

---

## 👨‍💻 Author

Abinash Mishra

Software Developer  Assignment

GrowEasy AI
