const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth/authRoutes');
const adminAngelsRouter = require('./routes/admin/angelsRoutes');
const angelsRouter = require('./routes/angels/angelsRoutes');
const userRouter = require('./routes/user/userRoutes');
const applicationRouter = require('./routes/applicatiions/applicationRoutes');
const contactRouter = require('./routes/contact/contactRoutes');
require('dotenv').config();


const app = express();

app.use(cors({
    origin: [
        'http://localhost:5173/',
        'https://vee-angels.vercel.app'
    ],
    methods: ['GET','POST','DELETE', 'PUT'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Cache-Control',
        'Expires',
        'Pragma',
    ],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/admin/angels', adminAngelsRouter);
app.use('/api/angels/angels', angelsRouter);
app.use('/api/user', userRouter);
app.use('/api/applications', applicationRouter);
app.use('/api/contact', contactRouter);

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI).then(() => {
            console.log('\x1b[36mConnected to mongodb');
        });
    }
    catch(err) {
        console.log(err);
    }
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('listening on port ' + PORT));
