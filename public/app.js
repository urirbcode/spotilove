document.getElementById('addSongForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const songUrl = document.getElementById('songUrl').value;
  const songIframe = generateSpotifyIframe(songUrl);
  const songTitle = document.getElementById('songTitle').value;
  const songDescription = document.getElementById('songDescription').value;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        title: songTitle,
        description: songDescription,
        iframe: songIframe,
        link: songUrl
      })
    });

    if (response.ok) {
      fetchAndUpdateSongs();
      modal.style.display = 'none';
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding song:', error);
    alert('Error adding song. Please try again.');
  }
});

// Update fetchAndUpdateSongs function to include the token in the request header
function displaySongs(songs) {
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
          <span class="date">Added on: ${new Date(song.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    `;
    container.appendChild(section);
  });
}

async function fetchAndUpdateSongs() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/songs', {
      headers: {
        'Authorization': token
      }
    });

    if (response.ok) {
      const songs = await response.json();
      displaySongs(songs); // Call the displaySongs function to update the UI with songs added by the user
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error fetching songs:', error);
    // Display error message to the user (e.g., in a designated error section on the page)
  }
}
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
  const songIframe = generateSpotifyIframe(songUrl);
  const songTitle = document.getElementById('songTitle').value;
  const songDescription = document.getElementById('songDescription').value;

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/songs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        title: songTitle,
        description: songDescription,
        iframe: songIframe,
        link: songUrl
      })
    });

    if (response.ok) {
      fetchAndUpdateSongs();
      modal.style.display = 'none';
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error adding song:', error);
    alert('Error adding song. Please try again.');
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


// User authentication
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const logoutButton = document.getElementById('logoutButton');

loginButton.addEventListener('click', function() {
  window.location.href = '/login';
});

registerButton.addEventListener('click', function() {
  window.location.href = '/register';
});

logoutButton.addEventListener('click', async function() {
  localStorage.removeItem('token');
  loginButton.style.display = 'inline-block';
  registerButton.style.display = 'inline-block';
  logoutButton.style.display = 'none';
  document.getElementById('addSongButton').style.display = 'none';
  fetchAndUpdateSongs();
});

// Check if the user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (token) {
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    document.getElementById('addSongButton').style.display = 'block';
  } else {
    loginButton.style.display = 'inline-block';
    registerButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';
    document.getElementById('addSongButton').style.display = 'none';
  }
  fetchAndUpdateSongs();
});