# 🎲 Random Student App

A simple and fun web app for teachers and students to **randomly select names** or **form random groups** from an Excel list.  
Built with **HTML, CSS, JavaScript**, and **MySQL** for storing student data.

---

## ✨ Features

- 📂 **Import Excel File:** Upload a student list directly from Excel (`.xlsx` or `.csv`)  
- 🧍 **Random Student Picker:** Choose one student at random with animation  
- 👥 **Random Group Generator:** Split students into random groups  
- 🗃️ **Database Integration (MySQL):** Save and load student lists  
- 🔁 **Reset / Re-randomize:** Easily start over for a new random order  
- 🎨 **Clean UI:** One HTML file, one CSS file — simple and responsive design

---

## 🛠️ Tech Stack

| Type | Technology |
|------|-------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | PHP / Node.js (depending on your version) |
| Database | MySQL |
| File Import | XLSX / CSV (via JavaScript) |

---

## 📦 Installation

### 1️⃣ Clone or Download the Project
```bash
git clone https://github.com/molika207/random-student-app.git
cd random-student-app
```

### 2️⃣ Import Database
1. Open **phpMyAdmin** (or MySQL Workbench).  
2. Create a new database named `random_student_db`.  
3. Import the SQL file (if included) or run:
   ```sql
   CREATE TABLE students (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL
   );
   ```

### 3️⃣ Run the App
- If using **PHP**:
  - Move files to your `htdocs` folder.
  - Run `http://localhost/random-student-app` in your browser.  
- If using **Node.js**:
  - Run:
    ```bash
    npm install express cors mysql2 xlsx
    node server.js
    ```
  - Open `http://localhost:3000`.

---

## 📘 How to Use

1. Click **Import Excel** and select your file.  
2. The student names will appear in the list.  
3. Choose:
   - 🎯 **Random One** → Pick one student  
   - 👥 **Make Groups** → Enter number of groups and randomize  
4. Optionally, **save** the student list to MySQL for future use.

---

## 📁 Folder Structure
```
random-student-app/
│
├── index.html        # Main HTML file
├── style.css         # App styling
├── script.js         # JavaScript logic
├── server.js         # Backend server (optional)
└── database.sql      # MySQL schema
```

---

## 🧠 Example Excel Format
| Name |
|------|
| SreyRoth |
| SievMey |
| Chandy |
| Sophea |

---

## 💡 Future Improvements
- Export random results to Excel  
- Group history and exclusion feature  
- Beautiful animation or sound effects  
- Teacher login system  

---

## 🩵 Author
**Lon Molika**  
<!-- 📚 Foundation Year Student @ University of Economics and Finance   -->
📚 Foundation by first Year Student @ Passerelles numeriques Cambodia
💬 “Even a small random can bring big smiles!”
