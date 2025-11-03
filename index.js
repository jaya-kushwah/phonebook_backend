    // const express = require('express');
    // const bodyParser = require('body-parser');
    // const cors = require('cors')
    // const userRoutes = require('./routes/userRoutes.js');
    // const contactRoutes = require('./routes/contactRoutes.js');
    // const groupRoutes = require('./routes/groupRoutes.js');
    // const app = express();

    // app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(cors());
    // app.use("/user", userRoutes);
    // app.use("/api", contactRoutes);
    // app.use("/group", groupRoutes);


    // app.listen(5000, () => { console.log("SERVER STARTED") });



const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes.js");
const contactRoutes = require("./routes/contactRoutes.js");
const groupRoutes = require("./routes/groupRoutes.js");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/api", contactRoutes);
app.use("/group", groupRoutes);

// MongoDB connection (single time)
if (mongoose.connection.readyState === 0) {
  mongoose
    .connect(process.env.MONGO_URI) // ✅ updated - removed deprecated options
    .then(() => {
      console.log("✅ MongoDB connected successfully!");
      app.listen(process.env.PORT || 5000, () =>
        console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
      );
    })
    .catch((err) => console.error("❌ MongoDB connection error:", err));
} else {
  console.log("⚠️ MongoDB already connected!");
}
