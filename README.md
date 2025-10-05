# Mini OLX - Full-Stack Marketplace 🌃

A small-scale, feature-rich marketplace application built with a modern tech stack. This project features a React (Vite) frontend and a Node.js (Express) backend with an SQLite database. The user interface is a fully animated dark mode theme.

## ✨ Features

-   **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
-   **Product CRUD:** Authenticated users can Create, Read, Update, and Delete their own product listings.
-   **Advanced Search & Filter:** Users can search for products by title and filter them by category.
-   **Wishlist System:** Logged-in users can add products to a personal wishlist.
-   **Modern UI/UX:** A fully responsive and aesthetic dark mode theme with a custom font, animated backgrounds, and scroll animations.
-   **Image Handling:** Supports optional image URLs for products with a consistent local placeholder for missing images.

## 🛠️ Tech Stack

### **Frontend**
-   **React (Vite):** A fast and modern JavaScript library for building user interfaces.
-   **React Router:** For client-side routing and navigation.
-   **Axios:** For making API requests to the backend.
-   **CSS3:** Custom styling for a fully responsive, animated dark-mode theme.

### **Backend**
-   **Node.js:** JavaScript runtime for the server.
-   **Express.js:** Web application framework for building the REST API.
-   **SQLite:** A simple, file-based SQL database for data persistence.

### **Installation & Setup**

1.  **Clone the repository:**
    Open your terminal and run the following command:
    ```bash
    git clone [https://github.com/your-username/mini-olx-fullstack.git](https://github.com/your-username/mini-olx-fullstack.git)
    ```
    *(Replace `your-username` with your actual GitHub username)*

2.  **Navigate to the project directory:**
    ```bash
    cd mini-olx-fullstack
    ```

3.  **Set up the Backend:**
    -   Navigate to the backend folder:
        ```bash
        cd mini-olx-backend
        ```
    -   **Create the environment file:** Create a new file named `.env` in this directory and add the following line. This is a secret key for signing your JWTs.
        ```
        JWT_SECRET=your_super_secret_key_that_is_long_and_random
        ```
    -   **Install dependencies:**
        ```bash
        npm install
        ```

4.  **Set up the Frontend:**
    -   Navigate from the root project folder to the frontend folder:
        ```bash
        cd mini-olx-frontend
        ```
    -   **Install dependencies:**
        ```bash
        npm install
        ```
    -   **Add Placeholder Image:** Make sure you have a `placeholder.png` image inside the `mini-olx-frontend/public/` directory.

