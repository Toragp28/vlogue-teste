document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('blogForm');
    const articlesDiv = document.getElementById('articles');

    // Fonction pour afficher un article
    function displayArticle(articleData) {
        const article = document.createElement('div');
        article.classList.add('article');

        const articleTitle = document.createElement('h2');
        articleTitle.textContent = articleData.title;
        article.appendChild(articleTitle);

        if (articleData.imageUrl) {
            const articleImage = document.createElement('img');
            articleImage.src = articleData.imageUrl;
            articleImage.alt = articleData.title;
            article.appendChild(articleImage);
        }

        const articleContent = document.createElement('p');
        articleContent.textContent = articleData.content;
        article.appendChild(articleContent);

        articlesDiv.appendChild(article);
    }

    // Fonction pour récupérer les articles du localStorage
    function loadArticles() {
        const savedArticles = localStorage.getItem('articles');
        if (savedArticles) {
            const articles = JSON.parse(savedArticles);
            articles.forEach(displayArticle);
        }
    }

    // Fonction pour enregistrer les articles dans le localStorage
    function saveArticle(articleData) {
        const savedArticles = localStorage.getItem('articles');
        const articles = savedArticles ? JSON.parse(savedArticles) : [];
        articles.push(articleData);
        localStorage.setItem('articles', JSON.stringify(articles));
    }

    // Chargement des articles à partir du localStorage
    loadArticles();

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imageFile = document.getElementById('imageFile').files[0];

        const articleData = {
            title: title,
            content: content,
            imageUrl: ''
        };

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                articleData.imageUrl = e.target.result;
                displayArticle(articleData);
                saveArticle(articleData);
            };
            reader.readAsDataURL(imageFile);
        } else {
            displayArticle(articleData);
            saveArticle(articleData);
        }

        form.reset();
    });
});
