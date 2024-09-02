const express = require('express');
const app = express();
const port = 8000;
const POST_URI = process.env.POST_URI
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/', (req, res)=>{
    console.log("request received");
    console.log("========================");
    console.log(req);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(POST_URI);
});
