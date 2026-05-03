const express = require("express");
const cors = require("cors");
const client = require("prom-client");
const { MongoClient, ObjectId } = require("mongodb");

collectDefaultMetrics();
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://florensiahiro1_db_user:<db_password>@cluster0.dvh0z6y.mongodb.net/?appName=Cluster0";
const dbClient = new MongoClient(MONGO_URI);
let db, entriesCollection;

async function connectDB() {
  try {
    await dbClient.connect();
    db = dbClient.db("diary");
    entriesCollection = db.collection("entries");
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Custom metrics
const httpRequestCounter = new client.Counter({
  name: 'diary_http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status']
});

const diaryEntriesGauge = new client.Gauge({
  name: 'diary_entries_total',
  help: 'Total number of diary entries'
});

// Middleware
app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.path,
      status: res.statusCode
    });
  });
  next();
});

// Create entry
app.post("/entries", async (req, res) => {
  try {
    const entry = {
      content: req.body.content,
      createdAt: new Date()
    };
    await entriesCollection.insertOne(entry);
    const count = await entriesCollection.countDocuments();
    diaryEntriesGauge.set(count);
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all entries
app.get("/entries", async (req, res) => {
  try {
    const entries = await entriesCollection.find().toArray();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete entry
app.delete("/entries/:id", async (req, res) => {
  try {
    await entriesCollection.deleteOne({ _id: new ObjectId(req.params.id) });
    const count = await entriesCollection.countDocuments();
    diaryEntriesGauge.set(count);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get("/health", async (req, res) => {
  try {
    await dbClient.db("admin").command({ ping: 1 });
    res.send("OK");
  } catch (err) {
    res.status(500).send("DB Error");
  }
});

// Metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = 3000;
connectDB()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log("Diary backend initialized");
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("FATAL: MongoDB connection failed:", err.message);
    // Still start server for health checks
    app.listen(PORT, () => {
      console.log(`Server running WITHOUT database on port ${PORT}`);
    });
  });