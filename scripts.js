document.addEventListener('DOMContentLoaded', function () {
    const blogForm = document.getElementById('blogForm');
    const articlesDiv = document.getElementById('articles');

    function loadArticles() {
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        articlesDiv.innerHTML = '';
        articles.forEach(article => {
            const articleElement = document.createElement('article');
            const titleElement = document.createElement('h2');
            titleElement.textContent = article.title;
            const contentElement = document.createElement('p');
            contentElement.textContent = article.content;
            articleElement.appendChild(titleElement);
            if (article.image) {
                const imageElement = document.createElement('img');
                imageElement.src = article.image;
                articleElement.appendChild(imageElement);
            }
            articleElement.appendChild(contentElement);
            articlesDiv.appendChild(articleElement);
        });
    }

    blogForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const image = document.getElementById('image').value;
        const articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles.push({ title, content, image });
        localStorage.setItem('articles', JSON.stringify(articles));
        loadArticles();
        blogForm.reset();
    });

    loadArticles();
});

