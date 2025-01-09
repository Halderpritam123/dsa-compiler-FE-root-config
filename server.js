const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 9000;

// Enable CORS
app.use(cors());

// Serve static files from the "dist" directory
const distPath = path.join(__dirname, "dist");
app.use(express.static(distPath));

// Catch-all route to serve index.html (for SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
