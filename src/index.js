const API_URL = "http://localhost:3000/posts"; // <-- API URL

function displayPosts() {
    fetch(API_URL) // Fetch posts from the API
        .then(res => res.json())
        .then(posts => {
            const postsList = document.getElementById('posts');
            postsList.innerHTML = ''; // Clear existing posts
            posts.forEach((post, idx) => {
                const li = document.createElement('li'); // Create a new list item for each post
                li.innerHTML = `
                    <img src="${post.image || ''}" alt="${post.title}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;margin-right:8px;vertical-align:middle;">
                    <span>${post.title}</span>
                `;
                li.dataset.id = post.id;
                li.style.display = "flex";
                li.style.alignItems = "center";
                li.style.gap = "8px";
                li.addEventListener('click', () => handlePostClick(post.id));
                postsList.appendChild(li);
                if (idx === 0) handlePostClick(post.id, true);
            });
        });
}

