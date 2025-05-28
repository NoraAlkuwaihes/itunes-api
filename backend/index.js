const express =require("express");
const axios = require ("axios");
const cors= require("cors");
const mongoose=require("mongoose");
const app= express();
const PORT=5000;

require("dotenv").config();


app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Define the Podcast schema
const podcastSchema = new mongoose.Schema({
  title: String,
  author: String,
  image: String,
  link: String,
  searchTerm: String,
  savedAt: { type: Date, default: Date.now },
});

const Podcast = mongoose.model("Podcast", podcastSchema);

app.get("/api/search", async(req,res) => {
    const query = req.query.q;

    if(!query){
        return res.status(400).json({ error: "Missing search query" });
    }
    
    try{

        const response = await axios.get("https://itunes.apple.com/search",{
           params: {
        term: query,
        media: "podcast",
        limit: 10,
      }, 
    

        });

      const results = response.data.results.map((item) => ({
      title: item.trackName,
      author: item.artistName,
      image: item.artworkUrl600,
      link: item.collectionViewUrl,
    }));
    
    // Save to MongoDB
    for (const item of results) {
      const podcast = new Podcast({ ...item, searchTerm: query });
      await podcast.save();
    }

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from iTunes API" });
    console.error("iTunes fetch error:", error.message);

  }

});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});