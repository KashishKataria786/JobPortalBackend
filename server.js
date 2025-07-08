import dotenv from 'dotenv';
import express from 'express'
import colors from 'colors'
import morgan from 'morgan';
import cors from 'cors'
import helmet from 'helmet';
import connectDatabase from './config/db.js';
import AuthRouter from './routes/authRoutes.js';
import bodyParser from 'body-parser';
import JobRouter from './routes/jobRoutes.js';
import UserRoutes from './routes/userRoutes.js';
const app = express();

dotenv.config();

app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(helmet());
app.use(bodyParser.json());
connectDatabase();


app.use('/api/v1/users',AuthRouter);
app.use('/api/v1/user',UserRoutes);
app.use('/api/v1/job',JobRouter);


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server Started at PORT ${PORT}`.bgBlue);
})      