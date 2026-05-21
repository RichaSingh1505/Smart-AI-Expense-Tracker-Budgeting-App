#  Smart AI Expense Tracker & Budgeting App

A cross-platform mobile application built with **React Native (Expo)** and **Node.js + MongoDB** that helps users track, analyze, and manage their personal finances intelligently — with AI-driven auto-categorization, smart budgeting recommendations, and goal planning.

---

##  Features

- **AI-Driven Auto Categorization** — Automatically categorizes expenses (Food, Transport, Shopping, Bills, Entertainment) based on the expense title using rule-based AI logic
- **Smart Recommendations** — Analyzes spending patterns and provides personalized cost-saving tips (e.g., reducing café spending, switching to public transport)
- **Financial Insights** — Visual breakdown of expenses by category using interactive Pie Charts
- **Goal Planning** — Set financial goals with a target amount and deadline
- **Transaction History** — View and manage all recorded expenses
- **Dark / Light Mode** — Fully themed UI supporting both modes across all screens
- **RESTful API Backend** — Node.js + Express backend with MongoDB for persistent data storage

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native, Expo Router, TypeScript |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI Logic | Rule-based categorization & recommendation engine |
| Charts | react-native-chart-kit (PieChart) |
| API Testing | Thunder Client |

---

##  Project Structure

```
smart-expense-tracker/
│
├── app/
│   └── (tabs)/
│       ├── index.tsx           # Home screen
│       ├── dashboard.tsx       # Dashboard with AI insights
│       ├── add-expense.tsx     # Add new expense
│       ├── transactions.tsx    # Transaction history
│       ├── insights.tsx        # Charts & financial analytics
│       └── goal.tsx            # Goal planning
│
├── backend/
│   ├── ai/
│   │   ├── categorizer.js      # AI auto-categorization logic
│   │   └── recommendations.js  # Smart recommendation engine
│   ├── controllers/
│   │   ├── expenseController.js
│   │   └── goalController.js
│   ├── models/
│   │   ├── Expense.js          # Mongoose expense schema
│   │   └── Goal.js             # Mongoose goal schema
│   └── .env                    # Environment variables
│
└── assets/                     # App icons & images
```

---

##  How the AI Logic Works

### Auto Categorization
When a user adds an expense, the title is matched against keyword rules to assign a category automatically — no manual selection needed.

| Keywords Detected | Category Assigned |
|---|---|
| uber, ola, bus | Transport |
| cafe, coffee, zomato, swiggy | Food |
| amazon, flipkart, myntra | Shopping |
| netflix, spotify | Entertainment |
| rent, electricity | Bills |
| anything else | Others |

### Smart Recommendations
The recommendation engine analyzes monthly spending data and generates personalized tips:
- If food spending exceeds **40%** of total → suggests reducing café visits
- If transport cost exceeds **₹2000** → suggests public transport or carpooling
- If total spending exceeds set budget → alerts to cut non-essential expenses

---

##  Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Expo CLI
- Expo Go app on your phone

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/smart-expense-tracker.git
cd smart-expense-tracker
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `/backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:
```bash
node server.js
```

### 3. Setup Frontend
```bash
cd ..
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone to run the app.

---

##  Screens Overview

| Screen | Description |
|---|---|
| Dashboard | Overview of recent expenses + AI tips |
| Add Expense | Input expense title & amount — category auto-assigned |
| Transactions | Full history of all expenses |
| Insights | Pie chart breakdown + AI smart tips by month |
| Goals | Set and track financial saving goals |

---

##  API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/expenses` | Fetch all expenses |
| POST | `/api/expenses` | Add new expense (AI auto-categorizes) |
| GET | `/api/insights` | Get monthly analytics + recommendations |
| POST | `/api/goals` | Add a new financial goal |
| GET | `/api/goals` | Fetch all goals |

---

##  Screens Overview
<img width="250" height="300" alt="1" src="https://github.com/user-attachments/assets/75e9cd3c-b178-47e9-9e68-6215d12baf80" />
<img width="250" height="300" alt="11" src="https://github.com/user-attachments/assets/a8a9a166-7b55-4d46-91df-6a766751b1ee" />
<img width="250" height="300" alt="9" src="https://github.com/user-attachments/assets/ff128d62-b11e-461f-8dcb-36e6fbe1d1a8" />
<img width="250" height="300" alt="7" src="https://github.com/user-attachments/assets/bb64dc27-e497-49c4-8730-803cd63a79a2" />
<img width="250" height="300" alt="5" src="https://github.com/user-attachments/assets/0e4591d1-1c39-46ab-95f5-8ac404dce9d7" />
<img width="250" height="300" alt="3" src="https://github.com/user-attachments/assets/42caa6b3-be83-4550-9abf-3a6b858f9f0d" />



