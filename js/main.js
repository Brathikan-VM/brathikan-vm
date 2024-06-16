document.addEventListener("DOMContentLoaded", function() {
    const articlesContainer = document.getElementById('articles-container');
    
    if (articlesContainer) {
        fetch('/articles')
            .then(response => response.json())
            .then(articles => {
                articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.classList.add('col-md-4', 'mb-4');
                    articleElement.innerHTML = `
                        <div class="card">
                            <img src="${article.image}" class="card-img-top" alt="${article.title}">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.shortPara}</p>
                                <a href="${article.link}" class="btn btn-primary">Read More</a>
                            </div>
                        </div>
                    `;
                    articlesContainer.appendChild(articleElement);
                });
            })
            .catch(error => console.error('Error loading articles:', error));
    }

    const feedForm = document.getElementById('feed-form');
    if (feedForm) {
        feedForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('title').value;
            const shortPara = document.getElementById('shortPara').value;
            const description = document.getElementById('description').value;
            const image = document.getElementById('image').value;
            const link = document.getElementById('link').value;

            const newArticle = {
                title,
                shortPara,
                description,
                image,
                link
            };

            fetch('/articles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newArticle)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Article added successfully!');
                    feedForm.reset();
                } else {
                    alert('Error adding article.');
                }
            })
            .catch(error => console.error('Error:', error));
        });
    }
});