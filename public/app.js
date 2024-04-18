// Update addSong function to include the token in the request header
document.getElementById('addSongForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const songUrl = document.getElementById('songUrl').value;
    const songIframe = generateSpotifyIframe(songUrl);
    const songTitle = document.getElementById('songTitle').value;
    const songDescription = document.getElementById('songDescription').value;
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('/api/songs', {
        title: songTitle,
        description: songDescription,
        iframe: songIframe,
        link: songUrl
      }, {
        headers: {
          'Authorization': token
        }
      });
  
      if (response.status === 201) {
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
  async function fetchAndUpdateSongs() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/songs', {
        headers: {
          'Authorization': token
        }
      });
      const songs = response.data;
      addSongs(songs);
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


// User authentication
const loginButton = document.getElementById('loginButton');
const registerButton = document.getElementById('registerButton');
const logoutButton = document.getElementById('logoutButton');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

loginButton.onclick = function() {
  loginModal.style.display = 'block';
};

registerButton.onclick = function() {
  registerModal.style.display = 'block';
};

logoutButton.onclick = async function() {
  localStorage.removeItem('token');
  loginButton.style.display = 'inline-block';
  registerButton.style.display = 'inline-block';
  logoutButton.style.display = 'none';
  addSongButton.style.display = 'none';
  fetchAndUpdateSongs();
};

loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await axios.post('/api/users/login', { email, password });
    const token = response.data.token;
    localStorage.setItem('token', token);
    loginModal.style.display = 'none';
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    addSongButton.style.display = 'block';
    fetchAndUpdateSongs();
  } catch (error) {
    console.error('Error logging in:', error);
    alert('Invalid email or password');
  }
});

registerForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    await axios.post('/api/users/register', { email, password });
    registerModal.style.display = 'none';
    alert('Registration successful. Please log in.');
  } catch (error) {
    console.error('Error registering:', error);
    alert('Registration failed. Please try again.');
  }
});

// Close modals when clicking outside or on the close button
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = 'none';
    }
  };
  
  const closeButtons = document.querySelectorAll('.close-button');
  closeButtons.forEach(function(button) {
    button.onclick = function() {
      const modalId = this.getAttribute('data-modal');
      document.getElementById(modalId).style.display = 'none';
    };
  });

// Check if the user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (token) {
    loginButton.style.display = 'none';
    registerButton.style.display = 'none';
    logoutButton.style.display = 'inline-block';
    addSongButton.style.display = 'block';
  } else {
    loginButton.style.display = 'inline-block';
    registerButton.style.display = 'inline-block';
    logoutButton.style.display = 'none';
    addSongButton.style.display = 'none';
  }
  fetchAndUpdateSongs();
});