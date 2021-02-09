//dependencies
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './utilities/error-handler';
import 'dotenv/config';
import './config/db';
import userRoute from './routes/user.route';
import protectedRoute from './routes/protected.route';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

//config
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());

//routes
app.use(userRoute);
app.use(protectedRoute);

//error handler middleware
app.use(errorHandler);

//start server
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
})
