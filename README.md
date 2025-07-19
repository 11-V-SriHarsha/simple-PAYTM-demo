This is a simple working demonstration of a basic Paytm application clone, built using the MERN stack (MongoDB, Express.js, React, Node.js).

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/11-V-SriHarsha/simple-PAYTM-demo.git
    cd simple-PAYTM-demo
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    # Create a .env file with your MongoDB connection string and JWT secret
    # MONGO_DB_URL=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```

## How to Run the Application

1.  **Start the Backend Server:**
    From the `backend` directory:
    ```bash
    npm start
    ```

2.  **Start the Frontend Development Server:**
    From the `frontend` directory:
    ```bash
    npm run dev
    ```
    The frontend application will typically open in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## Features

*   **User Authentication:** Secure signup and sign-in.
*   **Balance Display:** View your current account balance.
*   **User Search:** Find other users to send money to.
*   **Money Transfer:** Send money to other users within the application.
