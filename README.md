# tripyTrack
Project Description

Tripy Track is a travel-stay web application inspired by Airbnb, designed to help users explore, list, and book unique stays seamlessly. The platform focuses on creating a smooth and interactive user experience while maintaining a clean backend structure for scalability and performance.

Objectives

• To create a responsive travel accommodation platform with CRUD functionality.
• To integrate MongoDB with Node.js and Express for efficient data handling.
• To provide secure, error-handled user interactions through middleware and validations.
• To offer modular, maintainable, and scalable backend architecture.

Project Highlights

• Responsive Frontend using HTML, CSS, and Bootstrap.
• Backend Integration with Node.js and Express.js.
• Database Setup using MongoDB and Mongoose.
• RESTful APIs built for property listings.
• Middleware Architecture for modular request handling.
• Error Handling and Validation for data integrity.

Tech Stack

Frontend: HTML, CSS, Bootstrap
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Templating Engine: EJS (Embedded JavaScript Templates).

DEFINE routes:
    GET '/' → render home page
    GET '/listings' → fetch all listings from MongoDB and render 'index.ejs'
    GET '/listings/new' → render form to create new listing
    POST '/listings' → add new listing to database
    GET '/listings/:id' → fetch and display specific listing details
    GET '/listings/:id/edit' → render edit form for a listing
    PUT '/listings/:id' → update listing in database
    DELETE '/listings/:id' → remove listing from database

START server on PORT 3000

