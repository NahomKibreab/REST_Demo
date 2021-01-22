const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Node Express!');
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
