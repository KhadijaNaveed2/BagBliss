import express  from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./Routes/authRoute.js"; 
import cors from "cors";
import categoryRoute from "./Routes/categoryRoute.js";
import productRoute from "./Routes/productRoute.js";
import path from "path";
import { fileURLToPath } from 'url';

//dotenv configure
dotenv.config();

//database config
connectDB();

//es module fix
const __filename = (fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);
//rest objects
const app = express();

 
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./Frontend/build")));

// ROUTES
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);

//rest Api's
app.use("*", function(req,res) {
   res.sendFile(path.join(__dirname, "./Frontend/build/index.html"));
})


//PORT
const PORT =process.env.PORT || 5000;
//Run Listen
app.listen(PORT, () => {
    console.log(`Server on running ${PORT}`.bgCyan.bgWhite);
});
