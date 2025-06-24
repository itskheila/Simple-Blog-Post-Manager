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

function handlePostClick(id, auto = false) {
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(post => {
            const details = document.getElementById('details');
            details.innerHTML = `
                <h3>${post.title}</h3>
                <img src="${post.image || ''}" alt="${post.title}" style="max-width:100%;border-radius:6px;margin-bottom:1rem;">
                <p>${post.content}</p>
                <p><strong>Author:</strong> ${post.author}</p>
                <button id="edit-btn">Edit</button>
                <button id="delete-btn">Delete</button>
            `;
            document.querySelectorAll('#posts li').forEach(li => {
                li.classList.toggle('active', li.dataset.id == id);
            });
            document.getElementById('edit-btn').onclick = () => showEditForm(post);
            document.getElementById('delete-btn').onclick = () => deletePost(post.id);
        });
}

function showEditForm(post) {
    const form = document.getElementById('edit-post-form');
    form.classList.remove('hidden');
    document.getElementById('edit-title').value = post.title;
    document.getElementById('edit-content').value = post.content;
    document.getElementById('edit-author').value = post.author || '';
    document.getElementById('edit-image').value = post.image || '';

    form.onsubmit = function(e) {
        e.preventDefault();
        const updated = {
            title: document.getElementById('edit-title').value,
            content: document.getElementById('edit-content').value,
            author: document.getElementById('edit-author').value,
            image: document.getElementById('edit-image').value
        };
        fetch(`${API_URL}/${post.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
        })
        .then(res => res.json())
        .then(() => {
            form.classList.add('hidden');
            displayPosts();
        });
    };

    document.getElementById('cancel-edit').onclick = () => {
        form.classList.add('hidden');
    };
}

function deletePost(id) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
        .then(() => {
            document.getElementById('details').innerHTML = '';
            displayPosts();
        });
}

function addNewPostListener() {
    const form = document.getElementById('new-post-form');
    if (!form) return;
    form.onsubmit = function(e) {
        e.preventDefault();
        const title = form['new-title'].value;
        const content = form['new-content'].value;
        const author = form['new-author'].value;
        const image = form['new-image'].value;
        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content, author, image })
        })
        .then(res => res.json())
        .then(() => {
            form.reset();
            displayPosts();
        });
    };
}

function main() {
    displayPosts();
    addNewPostListener();
}

document.addEventListener('DOMContentLoaded', main);
