import mongoose from "mongoose";

export const connectToDB = () => {
    const mongoURI = process.env.DB_CONNECTION || "mongodb://localhost:27017/Shop";
    mongoose.connect(mongoURI)
        .then((suc) => { console.log("mongo db connected sucessfully!!!", suc.connection.host) })
        .catch(err => {
            console.log("cannot connect mongoDB")
            console.log(err)
            process.exit(1);
        })
}    
    
