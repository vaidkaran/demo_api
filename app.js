const express = require('express')
const app = express()
const port = 8082

app.get('/', (req, res) => {
  res.send('Welcome to the demo-api');
})

app.get('/test', (req, res) => {
  res.json({success: "true"});
})

app.get('/async', async (req, res) => {
  console.log('request on /async')
  const {timeout} = req.query;
  setTimeout(() => {
    res.send({message: 'success'})
  }, timeout)
})

app.get('/posts/1', (req, res) => {
  res.send(
    {
      "userId": 1,
      "id": 1,
      "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
    }
  )
})

app.get('/users/1', (req, res) => {
  res.send(
    {
      "id": 1,
      "name": "karan",
      "username": "Kkaran",
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