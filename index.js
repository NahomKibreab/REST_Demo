const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let comments = [
  {
    id: uuidv4(),
    username: 'Todd',
    comment: 'lol that is so funny',
  },
  {
    id: uuidv4(),
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
  },
  {
    id: uuidv4(),
    username: 'Sk8erBoi',
    comment: 'Plz delete your accound, todd',
  },
  {
    id: uuidv4(),
    username: 'onlysayswoof',
    comment: 'woof woof woof',
  },
];

app.get('/', (req, res) => {
  res.send('Welcome to Node Express!');
});

app.get('/comments', (req, res) => {
  res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
  res.render('comments/new');
});

app.post('/comments', (req, res) => {
  const { username, comment } = req.body;
  comments.push({ username, comment, id: uuidv4() });
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === id);
  res.render('comments/show', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === id);
  res.render('comments/edit', { comment });
});

app.patch('/comments/:id', (req, res) => {
  const { id } = req.params;
  const foundComment = comments.find((c) => c.id === id);
  const newCommentText = req.body.comment;
  foundComment.comment = newCommentText;
  res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect('/comments');
});

app.get('/tacos', (req, res) => {
  const { meat, qty } = req.query;
  res.send(`You selected ${qty} ${meat} tacos`);
});

app.post('/tacos', (req, res) => {
  console.log(req.body);
  const { meat, qty } = req.body;
  res.send(`You selected ${qty} ${meat} tacos`);
});

app.listen('3000', () => {
  console.log('Listening port 3000');
});
