const express = require('express');
const app = express();

const todoRoute = require('./routes/todo.route');

//Middleware...
app.use(express.json()); //application/json


app.use('/api/todos',todoRoute);

app.listen(3000, () => {
    console.log('server started at 3000');
});