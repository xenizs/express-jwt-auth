//dependencies
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import errorHandler from './utilities/error-handler';
import 'dotenv/config';
import './config/db';
import userRoute from './routes/user.route';

const app = express();
dotenv.config();

//config
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(errorHandler);

//routes
app.use(userRoute);

//start server
app.listen(app.get('port'), () => {
    console.log(`listening on port ${app.get('port')}`)
})
