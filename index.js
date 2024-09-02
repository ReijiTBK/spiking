const express = require('express');
const app = express();
const port = 3000;

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
  console.log(process.env.FORM_POST_URI);
});
