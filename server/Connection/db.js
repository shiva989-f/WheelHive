import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()
const CONNECTION_STRING = process.env.DB_CONN_STRING;
mongoose.connect(CONNECTION_STRING)
.then(console.log("Connected to database"))
.catch((e)=> console.log(e))
