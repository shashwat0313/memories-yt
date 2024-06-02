const express = require('express');
const app = express();
const path = require('path');

app.use('/static', express.static(path.join(__dirname, '/build/static')));

console.log(path.join(__dirname, 'static'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'));
})
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port', process.env.PORT || 3000);
})