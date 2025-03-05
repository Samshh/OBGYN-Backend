const express = require("express");
const cors = require("cors"); // Import cors
const AppDataSource = require("./data-source");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

app.use(cors({
  origin: 'https://frontend.samshh.me', // Correct the origin to http
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  credentials: true,
}));

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    // Routes
    app.use("/users", userRoutes); // Ensure this line is correct

    // Start Server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );
