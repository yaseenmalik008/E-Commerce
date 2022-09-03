import mongoose from "mongoose";

const connectDB =  async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology : true,
            useNewUrlParser : true
        })
        console.log(`MongoDb Connected ${conn.connection.host}`.yellow.bold)
    } catch (err) {
        console.error(`Error ${err.message}`.red.underline)
        process.exit(1)
    }
}

export default connectDB