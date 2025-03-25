// const express = require("express")
// const app = express()
// const port = process.env.PORT || 5000;

// const cors = require('cors')
// // middelware
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//     res.send('Hello World!')
// })


// // mongodb configuration

// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const uri = " mongodb+srv://marn-store-book:rG9VyQfSUpM6WHHp@cluster0.yezlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();

//     // create a collection of documents
//     const bookCollections = client.db("BookInventory").collection("books");

//     // insert a book to the db: post method

//     app.post('/upload-book', async(req, res) => {
//         const data = req.body;
//         const result = await bookCollections.insertOne(data);
//         res.send(result);
//     })

//     // // get all books from database
//     // app.get("/all-books", async(req, res) => {
//     //     const books = bookCollections.find();
//     //     const result = await books.toArray();
//     //     res.send(result);
//     // })

//     // update a book data: patch or update method
//     app.patch('/update-book/:id', async(req, res) => {
//       const id = req.params.id;
//       // console.log(id);
//       const updateBookdata = req.body;
//       const filter = { _id: new ObjectId(id) };
//       const updateDoc = {
//         $set: {
//           ...updateBookdata,
//         },
//       }
//        const options = { upsert: true };
//       // update 
//       const result = await bookCollections.updateOne(filter, updateDoc, options);
//       res.send(result);

//     })

//     //delete a book data
//     app.delete('/book/:id', async(req, res) => {
//       const id = req.params.id;
//       const filter = { _id: new ObjectId(id) };
//       const result = await bookCollections.deleteOne(filter);
//       res.send(result);
//     })

//     // find by category
//     app.get("/all-books", async(req, res) => {
//         let query = {};
//         if(req.query?.category){
//           query = { category: req.query.category }
//         }
//         const result = await bookCollections.find(query).toArray();
//         res.send(result);

//   })

//  // to get single book data
// app.get("/book/:id", async (req, res) => {
//   const id = req.params.id; 
//   const filter = { _id: new ObjectId(id) };
//   const result = await bookCollections.findOne(filter);
//   res.send(result);
// });


//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);


// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })


// // mongodb+srv://marn-store-book:rG9VyQfSUpM6WHHp@cluster0.yezlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0



// const express = require("express");
// const cors = require("cors");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// const app = express();

// require("dotenv").config();
// const port = process.env.PORT || 8080
// ;

// //  Hardcoded MongoDB URI (without .env)
// const uri ="mongodb+srv://theoneste:1DxuSqYaW9x294NH@cluster0.ik6vr.mongodb.net";

// console.log(` MongoDB URI: ${uri}`);

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// // Middleware
// app.use(cors());
// app.use(express.json());

// async function run() {
//   try {
//     await client.connect();
//     console.log(" Connected to MongoDB!");

//     const bookCollections = client.db("BookInventory").collection("books");

//     //  Home Route (Shows MongoDB URL)
//     app.get("/", (req, res) => {
//       res.send(`Hello, World! MongoDB connected at: <br><code>${uri}</code>`);
//     });

//     //  Add Book (POST)
//     app.post("/upload-book", async (req, res) => {
//       try {
//         const data = req.body;
//         const result = await bookCollections.insertOne(data);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: "Failed to upload book." });
//       }
//     });

//     //  Get All Books (GET)
//     app.get("/all-books", async (req, res) => {
//       try {
//         let query = {};
//         if (req.query?.category) {
//           query = { category: req.query.category };
//         }
//         const result = await bookCollections.find(query).toArray();
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: "Failed to fetch books." });
//       }
//     });

//     //  Get Single Book by ID (GET)
//     app.get("/book/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const filter = { _id: new ObjectId(id) };
//         const result = await bookCollections.findOne(filter);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: "Failed to fetch book." });
//       }
//     });

//     //  Update Book (PATCH)
//     app.patch("/update-book/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const updateBookdata = req.body;
//         const filter = { _id: new ObjectId(id) };
//         const updateDoc = { $set: { ...updateBookdata } };
//         const options = { upsert: true };
//         const result = await bookCollections.updateOne(filter, updateDoc, options);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: "Failed to update book." });
//       }
//     });

//     //  Delete Book (DELETE)
//     app.delete("/book/:id", async (req, res) => {
//       try {
//         const id = req.params.id;
//         const filter = { _id: new ObjectId(id) };
//         const result = await bookCollections.deleteOne(filter);
//         res.send(result);
//       } catch (error) {
//         res.status(500).send({ error: "Failed to delete book." });
//       }
//     })
//   } catch (error) {
//     console.error(" Error connecting to MongoDB:", error);
//   }
// }

// run().catch(console.dir);


// // Start Server
// app.listen(port, () => {
//   console.log(` Server is running on port ${port}`);
// });


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
