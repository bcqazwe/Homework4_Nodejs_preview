CPC Oil Price Management System (Minimalist UI)A professional, streamlined web application designed to manage and query historical oil price data from CPC Taiwan (1999–2026). This project focuses on high readability and a focused user experience through modular interface design.  

🌟 Key Features

    Modular Tab Interface: Uses a "ui-minimalist" approach to separate "Data Entry" and "History Search" into distinct functional tabs, improving user focus.
    
    Minimalist Data Tables: Displays oil price data (92, 95, 98, and Diesel) using a high-readability table format featuring zebra stripes and hover-highlighting effects.
    
    Modern Form Components: Input fields are optimized with consistent padding, clear placeholders, and focus highlighting for a professional feel.
    
    CPC-Inspired Visuals: The UI utilizes a professional color palette featuring "CPC Blue" (#0059b3) against a light grey background (#f8f9fa) to reduce visual fatigue.
    
    Real-time Feedback: Provides clear, color-coded success (green) or failure (red) messages upon form submission or data processing.
  

🛠️ Tech Stack

    Backend: Node.js & Express
    
    Database: SQLite (Storing historical data from 1999 to 2026)
    
    Frontend: Native HTML5, CSS3 (Flexbox), and Vanilla JavaScript
    
    Specification: OpenAPI Specification (OpenSpec) for API documentation
  

⚠️ Important Note: GitHub Pages Limitation

    GitHub Pages is a static hosting service and does not support server-side environments or databases. As this project relies on Node.js/Express and an SQLite database to fetch and store oil prices:
    
    The live demo on GitHub Pages (if enabled) will only show the static UI.
    
    The Search and Add Data functions will not work on GitHub Pages.
    
    To experience the full functionality, you must download and run the project locally on your machine.
  

🚀 Getting Started (Run Locally)

    Prerequisites
  
    Node.js installed on your computer.
    
    A terminal or command prompt.
    
    Installation & Usage
  
    1.Clone or Download this repository to your local machine.
    
    2.Open your terminal and navigate to the project directory.
    
    3.Install the required dependencies:
    
      Bash:
        npm install
    4.Start the local server:
    
        Bash:
        npm start
        
    5.Open your browser and visit: http://localhost:3000

    
  📁 Project Structure
  
    public/index.html: The main modular UI containing the Tabs and Tables.
    
    public/stylesheets/style.css: Modernized styles including zebra patterns and CPC branding.
    
    app.js: The Express server handling SQLite queries and API routes.
    
    design.md & spec.md: Documentation for design decisions and system requirements.
