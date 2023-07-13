const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const todoController = require('./controllers/todoController');

const app = express();
app.use(bodyParser.json());



// User Routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/data', userController.userData);

// Todo Routes
app.get('/todos', todoController.getAllTodos);
app.get('/todos/:id', todoController.getTodoById);
app.post('/todos', todoController.createTodo);
app.put('/todos/:id', todoController.updateTodo);
app.delete('/todos/:id', todoController.deleteTodo);

// Other Routes
app.use((req, res) => {
  res.status(404).send();
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
