const express = require('express');
const bodyParser = require('body-parser');
const morgan = require("morgan");
const sequelize = require('./database');
const authorRoutes = require('./api/routes/author_routes');
const noteRoutes = require('./api/routes/note_routes');
const auth_check= require('./api/middlewares/auth_check_middleware');

const app = express();
const PORT = process.env.PORT || 3000;
sequelize.sync();

app.use(morgan("dev"));

app.use(bodyParser.json());

app.use('/authors', authorRoutes);

app.use('/notes',auth_check,noteRoutes);

app.use((req, res, next) => {
    const error = new Error();
    error.message = "NOT FOUND";
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message });
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});