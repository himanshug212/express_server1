const express = require('express');
const app = express();



//Middleware...
app.use(express.json()); //application/json
//app.use(express.urlencoded());


// app.use(function body(req,res,next){
//     //This will take to the next handler
//     next();
// })

var todos = [

];


function getNextId() {
    return todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
}

app.get('/api/todos', function (req, res) {
    res.send(todos);
});

app.post('/api/todos', function (req, res) {
    var todo = {
        ...req.body,
        id: getNextId()
    };
    todos.push(todo);
    res.json(todo);
});

app.put('/api/todos/:id', function (req, res) {
    //to get id
    var id = req.params.id;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {
        //todos[idx] = updatedObj;
        todos[idx] = {...todos[idx],...updatedObj,id:id};
        res.send('Updated');
    } else {
        res.send('Could not find the object');
    }

});

app.patch('/api/todos/:id', function (req, res) {

    var id = req.params.id;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {

        //First destructer the first object and then if any value is updated with the 
        //second object then it will be updated.
        todos[idx] = {...todos[idx],...updatedObj,id:id};
        res.send('Updated');
    } else {
        res.send('Could not find the object');
    }


});

app.delete('/api/todos/:id', function (req, res) {

    var id = req.params.id;
    todos = todos.filter(todo => todo.id != id);
    res.json(todos);

});


app.listen(3000, () => {
    console.log('server started at 3000');
});