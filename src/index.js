import dotenv from "dotenv";
dotenv.config({
    path : './.env'
})
import connectDB from "./db/db.js";
import { app } from "./app.js";
const port = process.env.PORT || 3000;

connectDB()
.then( () => {
    app.listen(port, () =>{
        console.log(`Server is running on PORT ${port}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed !!!", error);
})