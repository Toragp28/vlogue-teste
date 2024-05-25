require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Modèle de données pour les articles
const Article = mongoose.model('Article', new mongoose.Schema({
    title: String,
    content: String,
    image: String
}));

app.use(bodyParser.json());
app.use(express.static('public'));

// Route pour récupérer les articles
app.get('/api/articles', async (req, res) => {
    const articles = await Article.find();
    res.json(articles);
});

// Route pour ajouter un nouvel article
app.post('/api/articles', async (req, res) => {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res.json(newArticle);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


