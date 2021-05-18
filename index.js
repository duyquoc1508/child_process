const express = require('express');
const app = express();
const { fork } = require('child_process');

app.get('/', (req, res) => {
  res.send('hello world');
});

const slowFunction = () => {
  let counter = 0;
  while (counter < 5000000000) {
    counter++;
  }

  return counter;
};

const requestListener = function (req, res) {
  console.log('======================================');
  if (req.url === '/total') {
    const child = fork(__dirname + '/getCount');
    child.on('message', (message) => {
      console.log('Returning /total results');
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(200);
      res.end(message);
    });

    child.send('count');
  } else if (req.url === '/hello') {
    console.log('Returning /hello results');
    res.setHeader('Content-Type', 'application/json');
    res.writeHead(200);
    res.end(`{"message":"hello"}`);
  }
};

app.use(requestListener);

app.listen(3000, () => {
  console.log('App running on port 3000');
});
