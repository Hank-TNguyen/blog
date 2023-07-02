let allPosts = [];

window.onload = function() {
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            allPosts = posts;  // Save all the posts in allPosts variable
            
            // Call displayPosts initially to show all posts
            displayPosts(posts);
            
            const searchInput = document.getElementById('searchInput');
            searchInput.addEventListener('keyup', function(e) {
                const searchText = e.target.value.toLowerCase();
                const filteredPosts = allPosts.filter(post => 
                    post.title.toLowerCase().includes(searchText) || 
                    post.excerpt.toLowerCase().includes(searchText)
                );
                displayPosts(filteredPosts);  // Display the filtered posts
            });
        });
};

function displayPosts(posts) {
    
    // Get a reference to the post-container element
    const postContainer = document.querySelector('.post-container');
    // Clear the existing posts
    postContainer.innerHTML = '';
    // Get a reference to the header element
    const header = document.querySelector('header');

    // Get a reference to the main element
    const main = document.querySelector('main');

    // Get a reference to the footer element
    const footer = document.querySelector('footer');

    // Get a reference to the viewer iframe
    const viewer = document.getElementById('viewer');

    const hideButton = document.getElementById('hideButton');

    // Iterate over each post
    posts.forEach((post, index) => {
        // Create a new article element
        const article = document.createElement('article');

        // Create a new anchor element for the title
        const anchor = document.createElement('a');
        anchor.href = '#';
        anchor.textContent = post.title;

        // Style the anchor like a heading
        anchor.style.display = 'block';
        anchor.style.fontSize = '2em';
        anchor.style.fontWeight = 'bold';
        anchor.style.textDecoration = 'none';
        anchor.style.color = '#333';

        // Create a new p element for the excerpt
        const excerpt = document.createElement('p');
        excerpt.className = 'excerpt';
        excerpt.textContent = post.excerpt;
        
        // Create a new p element for the last modified date
        const lastModifiedDate = document.createElement('p');
        lastModifiedDate.className = 'date';
        lastModifiedDate.textContent = `Last Modified: ${new Date(post.last_modified_date).toLocaleDateString()}`;

        // Create a new span element for the tag
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = `tags: ${post.tag}`;
        tag.style.marginLeft = '10px';
        tag.style.fontSize = '0.8em';
        tag.style.color = '#888';
        
        // Add an onclick event to the anchor
        anchor.onclick = function(e) {
            e.preventDefault();

            // Hide header, main, and footer
            header.style.display = 'none';
            main.style.display = 'none';
            footer.style.display = 'none';

            // Set the source of the iframe to the post path
            viewer.src = post.path;

            // Display the iframe
            viewer.style.display = 'block';
            hideButton.style.display = 'block';

            // Add the postId parameter to the URL
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('postId', post.path.replace('.html', ''));
            window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
        };

        // Add the anchor to the article
        article.appendChild(anchor);

        // Add the excerpt to the article
        article.appendChild(excerpt);
        
        // Add the last modified date to the article
        article.appendChild(lastModifiedDate);

        article.appendChild(tag);

        // Add the article to the post container
        postContainer.appendChild(article);

        // If the post is not the last one, add a divider
        if (index !== posts.length - 1) {
            const divider = document.createElement('hr');
            postContainer.appendChild(divider);
        }
    });
}