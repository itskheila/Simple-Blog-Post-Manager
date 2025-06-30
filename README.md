# Simple Blog Post Manager

A simple web application to manage blog posts. You can view, add, edit, and delete posts using a user-friendly interface and a mock API.

## Features

- View a list of all blog posts with titles and images
- Ability to click a post to see its details (title, content, author, image)
- Add a new blog post using a form
- Edit an existing post's details
- Delete a post 

## Setup Instructions

1. **Clone or Download the Repository**

2. **Install Dependencies**
   - Install [json-server](https://github.com/typicode/json-server) globally if you haven't:
     
     npm install -g json-server@0.17.4

3. **Start the Fake API**
   - In your project folder, run:
     
     json-server db.json
     
   - The API used: [http://localhost:3000/posts]

4. **Open the App**
   - Open index.html in your browser through use of 
   installed extension, live-server.
   

## Project Files
     index.html - overall structure of the app
     styles.css - styling of the UI, user interface of the app.
     index.js - functionality of the app
     db.json - database for data enered
     


