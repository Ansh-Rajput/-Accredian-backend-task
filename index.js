const express = require('express');
const referralRouter = require("./routes/referralRoutes");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors({
    origin: 'https://accredian-frontend-task-alpha-opal.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json("Hellow");
});

app.use("/api", referralRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
