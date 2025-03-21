const express = require('express')
const app = express()
const port = 8082
const token = '3h55w452h23h4234234j2hlkhg3453l';

const checkAuth = (req, res, next) => {
  if (req.headers.authorization !== token) {
    res.send('No or invalid token');
    return;
  }
  next();
};

app.get('/', async (req, res) => {
  await new Promise(resolve => setTimeout(() => {
    resolve();
  }, 5000));
  res.send('Welcome to the demo-api');
})

app.get('/auth', (req, res) => {
  res.send({token});
})

app.get('/test', checkAuth, (req, res) => {
  res.json({success: "true"});
})

app.get('/async', async (req, res) => {
  console.log('request on /async')
  const {timeout} = req.query;
  setTimeout(() => {
    res.send({message: 'success'})
  }, timeout)
})

app.get('/posts/1', checkAuth, (req, res) => {
  res.send(
    {
      "userId": 1,
      "id": 1,
      "body": "quia et suscipit suscipit",
    }
  )
})

app.get('/users/1', (req, res) => {
  res.send(
    {
      "id": 1,
      "name": "karan",
      "username": "karan",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.31",
          "lng": "81.1496"
        }
      },
      "phone": "1-770-736-8031 x56442",
      "website": "hildegard.org",
      "company": {
        "name": "Romaguera-Crona",
        "catchPhrase": "Multi-layered client-server neural-net",
        "bs": "harness real-time e-markets"
      }
    }
  )
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})