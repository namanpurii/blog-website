# DevDose - A Server-Side Rendered Blog Platform

Welcome to the Server-Side Rendered Blog Website! This web application is built using Express, MongoDB, EJS, and Bootstrap. It allows you to browse all the blogs, read their content in markdown, create new blogs that are stored in a MongoDB Atlas cloud cluster database via POST requests, edit existing blogs, and delete blogs.

## Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites

1. [Node.js](https://nodejs.org/) installed on your machine.
2. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for cloud database storage.
3. [Git](https://git-scm.com/) to clone the repository.

### Clone the Repository

```bash
git clone https://github.com/namanpurii/blog-website.git
cd blog-website
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory and set the following variables:

```plaintext
PORT=3000  # Port on which the server will run
MONGODB_URI=your_mongodb_atlas_connection_uri
```

Replace `your_mongodb_atlas_connection_uri` with your MongoDB Atlas connection URI.

### Run the Application

```bash
node src/index
```

Visit [http://localhost:3000](http://localhost:3000) in your web browser to access the blog website.

## Features

1. **Browse Blogs:** View a list of all blogs on the homepage.

2. **Read Blogs:** Click on a blog to read its content in markdown format.

3. **Create New Blogs:** Add your own blogs by clicking the "Create New Blog" button on the homepage. Fill in the title, description, and content in markdown.

4. **Edit Blogs:** Edit existing blogs by clicking the "Edit" button on each blog post. Update the title, description, or content as needed.

5. **Delete Blogs:** Remove unwanted blogs by clicking the "Delete" button on each blog post.

## Technologies Used

- **Express:** A web application framework for Node.js to handle routes and requests.
- **MongoDB:** A NoSQL database for storing blog data.
- **EJS:** A templating engine for embedding JavaScript code in HTML pages.
- **Bootstrap:** A popular CSS framework for creating responsive and visually appealing user interfaces.

Enjoy exploring and creating content on your server-side rendered blog website!
