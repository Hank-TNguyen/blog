window.onload = function() {
    // Fetch the posts metadata
    fetch('posts.json')
        .then(response => response.json())
        .then(posts => {
            // Get a reference to the main element
            const postContainer = document.querySelector('.post-container');

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
            posts.forEach(post => {
                // Create a new article element
                const article = document.createElement('article');

                // Create a new anchor element for the title
                const anchor = document.createElement('a');
                anchor.href = '#'; // to make it appear clickable
                anchor.textContent = post.title;

                // Style the anchor like a heading
                anchor.style.display = 'block'; // display as block to take full width like a header
                anchor.style.fontSize = '2em'; // size of h2
                anchor.style.fontWeight = 'bold'; // make it bold
                anchor.style.textDecoration = 'none'; // remove underline
                anchor.style.color = '#333'; // set color
                
                // Add an onclick event to the anchor
                anchor.onclick = function(e) {
                    e.preventDefault(); // prevent the default action (navigate to href)

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

                // Add the article to the main element
                postContainer.appendChild(article);
            });
        });
};
