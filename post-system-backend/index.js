const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Configuration
const uri = "mongodb+srv://galleria:093V7gmcWmkZo9Tg@cluster0.pqp1ybg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Connect to MongoDB
async function run() {
  try {
    await client.connect();
    const db = client.db("PostSharing");
    const postsCollection = db.collection("posts");

    // API to create a new post (root post)
    app.post("/create-post", async (req, res) => {
      const { text } = req.body;

      if (!text) {
        return res.status(400).send({ error: "Post text is required" });
      }

      const newPost = {
        text: text,
        comments: [] // Initially no comments
      };

      const result = await postsCollection.insertOne(newPost);
      res.status(201).send(result.ops[0]);
    });

    // API to create a comment or a reply to a comment
    app.post("/create-comment/:postId", async (req, res) => {
      const postId = req.params.postId;
      const { text, replyTo } = req.body;

      if (!text) {
        return res.status(400).send({ error: "Comment text is required" });
      }

      const newComment = {
        text: text,
        replies: [] // Initially no replies
      };

      if (replyTo) {
        // Find the comment and add the reply
        const post = await postsCollection.findOne({ _id: new ObjectId(postId) });
        if (!post) {
          return res.status(404).send({ error: "Post not found" });
        }

        const comment = post.comments.find(c => c._id.toString() === replyTo);
        if (!comment) {
          return res.status(404).send({ error: "Comment not found" });
        }

        comment.replies.push(newComment);

        // Update the post with the new comment or reply
        const result = await postsCollection.updateOne(
          { _id: new ObjectId(postId), "comments._id": new ObjectId(replyTo) },
          { $set: { comments: post.comments } }
        );

        res.status(200).send(result);
      } else {
        // Add the new comment to the post's root comments array
        const result = await postsCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $push: { comments: newComment } }
        );

        res.status(200).send(result);
      }
    });

    // API to get paginated root posts
    app.get("/root-posts", async (req, res) => {
      const { page = 1, limit = 10 } = req.query;

      const posts = await postsCollection
        .find()
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .toArray();

      const totalPosts = await postsCollection.countDocuments();
      res.status(200).json({
        posts,
        totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: Number(page),
      });
    });

    // API to get a post with all comments and replies
    app.get("/post/:postId", async (req, res) => {
      const { postId } = req.params;

      const post = await postsCollection.findOne({ _id: new ObjectId(postId) });
      if (!post) {
        return res.status(404).send({ error: "Post not found" });
      }

      res.status(200).json(post);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Optional: Close the client connection after the app is stopped
    // await client.close();
  }
}
run().catch(console.dir);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
