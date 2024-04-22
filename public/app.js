// Enhanced error handling function with specific messages
function handleError(error) {
  console.error('Error:', error);
  let errorMessage = 'An error occurred. Please try again.';
  if (error.response) {
    // Handle server-side errors (e.g., validation errors)
    errorMessage = error.response.data.error || 'Server error.';
  } else if (error.request) {
    // Handle network errors (e.g., request timeout)
    errorMessage = 'Network error.';
  }
  alert(errorMessage); // Replace with a more user-friendly error display mechanism
}

// Function to display songs with improved formatting and error handling
function displaySongs(songs) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  if (songs.length === 0) {
    const noSongsMessage = document.createElement('p');
    noSongsMessage.textContent = 'No songs added yet.';
    container.appendChild(noSongsMessage);
  } else {
    songs.forEach(song => {
      const songElement = document.createElement('div');
      songElement.className = 'song';
      songElement.innerHTML = `
        ${song.iframe}
        <div class="info"> 
          <h3 class="song_title">${song.title}</h3>
          <p class="song_description">${song.description}</p>
          <span class="date">Added on: ${new Date(song.dateAdded).toLocaleDateString()}</span>
        </div>
      `;
      container.appendChild(songElement);
    });
  }
}

// Asynchronous function to fetch and update songs with robust error handling
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
      displaySongs(songs);
    } else {
      // Handle HTTP errors with more specific messages
      handleError(new Error(`HTTP error! Status: ${response.status}`));
    }
  } catch (error) {
    handleError(error);
  }
}

// Modal and form submission logic with enhanced error handling
const modal = document.getElementById("songFormModal");
const addSongButton = document.getElementById("addSongButton");
const closeButton = document.getElementsByClassName("close-button")[0];

addSongButton.onclick = function() {
  modal.style.display = "block";
}

closeButton.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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
      handleError(new Error(`HTTP error! Status: ${response.status}`));
    }
  } catch (error) {
    handleError(error);
  }
});

// Function to turn a Spotify link into an iframe
function generateSpotifyIframe(url) {
  // Check if the URL is a valid Spotify track link
  if (!url.includes("spotify.com/track/")) {
    return 'Invalid Spotify URL';
  }

  // Construct the embed URL
  const embedUrl = url.replace("/track/", "/embed/track/");

  // Create the iframe HTML
  return `<iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="352" frameborder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
}

// User authentication and UI logic
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