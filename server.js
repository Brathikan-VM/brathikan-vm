const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/articles', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'articles.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Unable to fetch articles' });
        } else {
            res.send(JSON.parse(data));
        }
    });
});

app.post('/articles', (req, res) => {
    fs.readFile(path.join(__dirname, 'data', 'articles.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ error: 'Unable to save article' });
        } else {
            const articles = JSON.parse(data);
            articles.push(req.body);
            fs.writeFile(path.join(__dirname, 'data', 'articles.json'), JSON.stringify(articles, null, 2), 'utf8', (err) => {
                if (err) {
                    res.status(500).send({ error: 'Unable to save article' });
                } else {
                    res.send({ success: true });
                }
            });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});