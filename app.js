const express = require('express');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const { sequelize } = require('./api/models/index');
const noteRoutes = require('./api/routes/note_routes')

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParse.json());
app.use(morgan("dev"));

sequelize.sync();

app.use('/notes', noteRoutes);


app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});