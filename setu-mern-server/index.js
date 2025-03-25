
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 8080;

// Use Environment Variables for MongoDB URI
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MongoDB URI is missing! Set it in .env");
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const bookCollections = client.db("BookInventory").collection("books");

    // Home Route (No URI Exposure)
    app.get("/", (req, res) => {
      res.send(`📚 Welcome to the Book Inventory API`);
    });

    // Add Book (POST)
    app.post("/upload-book", async (req, res) => {
      try {
        const data = req.body;
        const result = await bookCollections.insertOne(data);
        res.status(201).json(result);
      } catch (error) {
        console.error("Error uploading book:", error);
        res.status(500).json({ error: "Failed to upload book." });
      }
    });

    // Get All Books (GET)
    app.get("/all-books", async (req, res) => {
      try {
        const query = req.query?.category ? { category: req.query.category } : {};
        const result = await bookCollections.find(query).toArray();
        res.json(result);
      } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({ error: "Failed to fetch books." });
      }
    });

    // Get Single Book by ID (GET)
    app.get("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await bookCollections.findOne({ _id: new ObjectId(id) });
        if (!result) {
          return res.status(404).json({ error: "Book not found" });
        }
        res.json(result);
      } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Failed to fetch book." });
      }
    });

    // Update Book (PATCH)
    app.patch("/update-book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;
        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: updateData };
        const result = await bookCollections.updateOne(filter, updateDoc);
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Book not found" });
        }
        res.json(result);
      } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ error: "Failed to update book." });
      }
    });

    // Delete Book (DELETE)
    app.delete("/book/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await bookCollections.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: "Book not found" });
        }
        res.json(result);
      } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ error: "Failed to delete book." });
      }
    });

  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

run().catch(console.dir);

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
