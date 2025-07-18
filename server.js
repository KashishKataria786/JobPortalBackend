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
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi  from 'swagger-ui-express'  
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


// SwaggerUI for API's
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Job Portal API',
      version: '1.0.0',
      description: 'API documentation for the Job Portal MERN backend',
      contact: {
        name: 'Kashish Kataria',
      },
      servers: [
        {
          url: 'http://localhost:5000', // or your production URL
        },
      ],
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            phone: { type: 'string' },
            role: {
              type: 'string',
              example: 'recruiter',
            },
          },
        },
        Job: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            job_position: { type: 'string' },
            company: { type: 'string' },
            location: { type: 'string' },
            jobType: { type: 'string' },
            workMode: { type: 'string' },
            description: { type: 'string' },
            requirements: { type: 'string' },
            salary: { type: 'string' },
            experienceLevel: { type: 'string' },
            education: { type: 'string' },
            skills: {
              type: 'array',
              items: { type: 'string' },
            },
            postedBy: { type: 'string' },
            isActive: { type: 'boolean' },
            applicants: {
              type: 'array',
              items: { type: 'string' },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'],
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server Started at PORT ${PORT}`.bgBlue);
})      