const express = require("express");
const cors = require("cors");
const client = require("prom-client");
const collectDefaultMetrics = client.collectDefaultMetrics;

collectDefaultMetrics();
const app = express();
app.use(cors());
app.use(express.json());

let entries = [];




// Create entry
app.post("/entries", (req, res) => {
  const entry = {
    id: Date.now(),
    content: req.body.content
  };
  entries.push(entry);
  res.status(201).json(entry);
});

// Get all entries
app.get("/entries", (req, res) => {
  res.json(entries);
});

// Delete entry
app.delete("/entries/:id", (req, res) => {
  entries = entries.filter(e => e.id != req.params.id);
  res.json({ message: "Deleted" });
});

// Health check (important for Kubernetes later)
app.get("/health", (req, res) => {
  res.send("OK");
});

//metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Diary backend initialized");
  console.log(`Server running on port ${PORT}`);
});
