const express = require("express");
const cors = require("cors"); // Import cors
const AppDataSource = require("./data-source");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Correct the origin to http
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.use(cookieParser());

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
