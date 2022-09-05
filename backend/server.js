import  express  from 'express';
import productRoutes from "./routes/productRoutes.js"
import dotenv from "dotenv"
import colors from 'colors';
import connectDB from "./config/db.js"


dotenv.config();
connectDB()

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products',productRoutes);


const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold);
});
