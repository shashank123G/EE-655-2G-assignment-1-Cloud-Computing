# EE-655-2G-assignments-Cloud-Computing
#  Assignment - 2
**Blogging Platform API**
   
 A Restful API for a simple blogging platform. This API allows users to create, retrieve, search, and delete blog posts. Built with Node.js and MongoDB, it supports operations on blog posts such as adding new posts, fetching posts by username, searching posts by keywords in titles or content, and deleting posts.

**Features**
- Create blog posts with title, content, and associated username.
- Retrieve all blog posts or filter by username.
- Search for blog posts containing specific keywords in their titles or content.
- Delete all blog posts by a specific username or containing a specific keyword in their content.

**Getting Started** Prerequisites Node.js npm or yarn MongoDB Installation

**Install dependencies:**
npm install

**Configure your environment variables:** Create a .env file in the root directory and specify your MongoDB URI:
MONGODB_URI=your_mongodb_uri
  
**Start the server:**
npm start
The API server will be running on http://localhost:3000.

**API Endpoints**
Create a New Blog Post POST /posts

**Creates a new blog post.**
Body Parameters
userName (required): The username of the post creator. title (required): The title of the blog post. content (required): The content of the blog post. Retrieve All Blog Posts

**GET /posts**
Retrieves all blog posts.
Retrieve Blog Posts by Username

**GET /posts/user/:userName**
Retrieves all blog posts by a given username.
Retrieve Blog Posts by Title Keyword

**GET /posts/title/:searchWord**
Retrieves all blog posts that contain a given word in the title.
Retrieve Blog Posts by Content Keyword

 **GET /posts/content/:searchWord**
Retrieves all blog posts that contain a given word in the content.
Delete All Posts by Username

**DELETE /posts/user/:userName**
Deletes all blog posts by a given username.
Delete All Posts Containing a Keyword in Content

**DELETE /posts/content/:searchWord**
Deletes all blog posts that contain a certain word in the content.
Get Post Count by Username

**GET /posts/count/:userName**
Returns the number of blogs posted by a given username along with the username
