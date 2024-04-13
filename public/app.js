// Function to add songs to the page
async function addSongs(songs) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing songs

    songs.forEach(song => {
        const section = document.createElement('section');
        section.className = 'songs';
        section.innerHTML = `
            <div class="song">
                ${song.iframe}
                <div class="info">
                    <h3 class="song_title">${song.title}</h3>
                    <p class="song_description">${song.description}</p>
                    <span class="date">Added on: ${song.dateAdded}</span>
                </div>
            </div>
        `;
        container.appendChild(section);
    });
}

// Function to fetch songs and update the page
async function fetchAndUpdateSongs() {
    try {
        const response = await fetch('/api/songs');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const songs = await response.json();
        addSongs(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        // Display error message to the user (e.g., in a designated error section on the page)
    }
}

document.addEventListener('DOMContentLoaded', fetchAndUpdateSongs); // Fetch and display songs on page load

// --- Modal and Form Submission Logic (Optional) --- 

const modal = document.getElementById("songFormModal");
const addSongButton = document.getElementById("addSongButton");
const closeButton = document.getElementsByClassName("close-button")[0];

// Open the modal when the "Add a song" button is clicked
addSongButton.onclick = function() {
    modal.style.display = "block";
}

// Close the modal when the close button is clicked
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle form submission
document.getElementById('addSongForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const songUrl = document.getElementById('songUrl').value;
    const songIframe = generateSpotifyIframe(songUrl)
    const songTitle = document.getElementById('songTitle').value;
    const songDescription = document.getElementById('songDescription').value;

    try {
        const response = await fetch('/api/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: songTitle, description: songDescription, iframe: songIframe, link: songUrl })
        });

        if (response.ok) {
            fetchAndUpdateSongs(); // Refresh the song list after adding
            modal.style.display = "none";
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error adding song:', error);
        // Display error message to the user
    }
});

// This function turns any spotify link into the iframe. We store the iframe, but we collect the link.
function generateSpotifyIframe(url) {
    // Check if the URL is a valid Spotify track link
    if (!url.includes("spotify.com/track/")) {
        return 'Invalid Spotify URL';
    }

    // Construct the embed URL by inserting '/embed' into the path
    const embedUrl = url.replace("/track/", "/embed/track/");

    // Create the iframe HTML using a template literal
    return `<iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
}