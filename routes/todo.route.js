var router = require('express').Router();

var todos = [];

function getNextId() {
    return todos.length == 0 ? 1 : todos[todos.length - 1].id + 1;
}

router.get('/', function (req, res) {
    res.send(todos);
});

router.post('/', function (req, res) {
    var todo = {
        ...req.body,
        id: getNextId()
    };
    todos.push(todo);
    res.json(todo);
});

router.put('/:id', function (req, res) {
    //to get id
    var id = req.params.id;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {
        //todos[idx] = updatedObj;
        todos[idx] = {
            ...todos[idx],
            ...updatedObj,
            id: id
        };
        res.send('Updated');
    } else {
        res.send('Could not find the object');
    }
});

router.patch('/:id', function (req, res) {

    var id = req.params.id;
    var updatedObj = req.body;
    var idx = todos.findIndex(todo => todo.id == id);
    if (idx != -1) {

        //First destructer the first object and then if any value is updated with the 
        //second object then it will be updated.
        todos[idx] = {
            ...todos[idx],
            ...updatedObj,
            id: id
        };
        res.send('Updated');
    } else {
        res.send('Could not find the object');
    }


});

router.delete('/:id', function (req, res) {

    var id = req.params.id;
    todos = todos.filter(todo => todo.id != id);
    res.json(todos);

});

module.exports = router;

