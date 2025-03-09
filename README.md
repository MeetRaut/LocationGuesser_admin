# 🛠️ Admin Dashboard - Decked Out (Geo-Location Game) 🗺️

This is the Admin Dashboard for the Decked Out event for Geo-Location Game.  
It allows admins to view **team submissions**, track **uploaded images**, and manage the event smoothly.

---

## 🎯 Features
✅ **Secure Admin Login (Firebase Authentication)**  
✅ **View Team Submissions (Number of images & last uploaded time)**  
✅ **Filter/Search Teams by Name**  
✅ **Click on a Team to View Their Uploaded Images**  
✅ **Logout Functionality**  
✅ **Fully Responsive (Optimized for Desktop & Mobile)**  

---

## 🛠️ Tech Stack
- **Frontend:** React + Vite + TailwindCSS 
- **Backend:** Firebase Realtime Database  
- **Auth:** Firebase Authentication  
- **Hosting:** Vercel  

---

## ⚙️ Setup & Installation
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/MeetRaut/LocationGuesser_admin.git
cd LocationGuesser_admin
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Setup Environment Variables
Create a .env file in the root directory and add:

```sh
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_DATABASE_URL=your_firebase_database_url
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```
Replace your_firebase_* values with actual Firebase credentials.

4️⃣ Start the Development Server
```sh
npm run dev
```

Then open http://localhost:5173.

---
## 🔗 Related Repositories
🎮 User Side Website:
👉 Geo-Location Game (User Side)
https://github.com/MeetRaut/Decked_Out_Locationguesser_Game


This is the main website where teams can upload images based on locations.
