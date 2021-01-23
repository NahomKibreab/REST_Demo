const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const comments = [
  {
    id: 1,
    username: 'Todd',
    comment: 'lol that is so funny',
  },
  {
    id: 2,
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
  },
  {
    id: 3,
    username: 'Sk8erBoi',
    comment: 'Plz delete your accound, todd',
  },
  {
    id: 4,
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
  comments.push({ username, comment });
  res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find((comment) => comment.id === parseInt(id));
  res.render('comments/show', { comment });
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
