# 🎧 Podcast Search App - Thamanyah Task

A full-stack podcast search application built using Express (Node.js) and Next.js as part of the Thamanyah assignment.  
The app fetches podcast data from the iTunes Search API and displays it in a user-friendly interface.

---

## Project Description

This application allows users to search for podcasts in real-time using the iTunes Search API. It consists of a backend (Node.js + Express) that handles API calls and saves the results to MongoDB Atlas, and a frontend (Next.js + Bootstrap) that presents the results in a visually appealing way.  
The project focuses on practical implementation, responsiveness, and user interactivity such as instant search, error handling, and UI feedback.

---

## Installation & Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/NoraAlkuwaihes/itunes-api.git
cd itunes-api
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and add your MongoDB URI:

Example `.env` content:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/itunesSearch
```

>  If you don’t have one, create a MongoDB Atlas cluster: https://www.mongodb.com/cloud/atlas

Then run:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

###  Additional Notes for Setup

- Be sure to **manually create a `.env` file** in the `backend` directory as it’s not included for security reasons.
- If the frontend throws an error on Bootstrap or Axios imports, run:
```bash
npm install axios bootstrap
```

---

## Technologies Used

### Backend:
- **Node.js + Express**: Server environment and RESTful API routing.
- **Axios**: To send requests to the iTunes API.
- **MongoDB Atlas**: Cloud-hosted NoSQL database.
- **Mongoose**: Schema modeling and querying.
- **dotenv**: Environment variable support.
- **cors**: Allow frontend to make requests across origins.

### Frontend:
- **Next.js**: React framework used for routing and SSR.
- **React Hooks**: (useState, useEffect) for managing state.
- **Axios**: Fetch results from local backend.
- **Bootstrap 5**: Responsive layout and UI styling.

---

## Technical Decisions & Notes

- Initially planned to use **Tailwind CSS** and **DynamoDB** for the project.
- Due to the deadline, switched to **Bootstrap** and **MongoDB Atlas**, which I'm familiar with.
- I plan to explore Tailwind and DynamoDB in future projects.

---

##  Project Structure

```
itunes-api/
├── backend/ 
│ ├── index.js # Main backend application logic
│ ├── .env # Environment variables (MongoDB URI)
│ ├── package.json # Backend dependencies and scripts
│
├── frontend/ 
│ ├── pages/ 
│ │ └── index.js # Home page 
│ ├── public/ # Public assets (e.g., icons, images)
│ ├── styles/ # Global and custom CSS files
│ ├── package.json # Frontend dependencies and scripts
│
└── README.md # Project documentation
```

---

## Challenges & Solutions


### 1. MongoDB Atlas Setup
- I used MongoDB Atlas to store podcast data. Setting it up required creating a new cluster, user, and connection string (URI).

- **Solution**: I stored the MongoDB URI in a .env file instead of writing it directly in the code. This is a best practice to keep sensitive information secure and allow easy configuration.

### 2. Real-Time Search UX
- Needed live search with delayed "no results" display.
-  **Solution**: Controlled search behavior using `buttonClicked` flag.

### 3. File Structure Clarity
- Started with a combined folder, but it was messy.
- **Solution**: Split clearly into `frontend/` and `backend/`.

### 4. README Language Formatting
- Initially wrote README in Arabic, but it became unreadable due to mixed technical terms and formatting.
-  **Solution**: Rewrote it in English for better clarity and structure.

---

##  Tools Used

- **Visual Studio Code (VS Code)** was used for writing and testing the code, managing Git operations, and debugging.
- Built and tested locally using **Node.js**, **Next.js**, and **MongoDB Atlas** cloud integration.

---

##  Ideas for Improvement

- Add a dedicated podcast details page.
- Add favorite/save feature.
- Add filters like language, category.
- Apply a custom-designed UI for a more modern look.
- Add full bilingual support (Arabic/English).

---

##  Summary

This project helped me practice working with APIs, databases, frontend/backend integration, and state management.  
I used technologies I’m already comfortable with to focus on functionality and meeting the deadline.  
With more time and dedication, additional features and improved functionalities could be implemented.