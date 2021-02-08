import mongoose from 'mongoose'

mongoose.connect(process.env.DB_URI || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false})
.then((db) => console.log('Mongodb is connected to', db.connection.host))
.catch((err) => console.error(err));
