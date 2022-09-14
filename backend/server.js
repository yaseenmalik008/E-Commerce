import  express  from 'express';
import productRoutes from "./routes/productRoutes.js"
import dotenv from "dotenv"
import colors from 'colors';
import connectDB from "./config/db.js"
import {notFound,errorHandler} from "./middlewares/errorMiddlewares.js"
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectDB()

const app = express();
app.use(express.json()) //body parsing converting json file into javascript readable language.

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes)

// Error MiddleWares
app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(process.env.PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold);
});
