const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const comments = [
  { username: 'Todd', comment: 'lol that is so funny' },
  {
    username: 'Skyler',
    comment: 'I like to go birdwatching with my dog',
  },
  {
    username: 'Sk8erBoi',
    comment: 'Plz delete your accound, todd',
  },
  {
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
