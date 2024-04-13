// Function to add songs to the page
async function addSongs(songs) {
    const container = document.querySelector('.container');
    songs.forEach(song => {
        const section = document.createElement('section');
        section.className = 'songs';
        section.innerHTML = `
            <div class="song">
                ${song.iframeCode}
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

let modal = document.getElementById("songFormModal");

document.addEventListener('DOMContentLoaded', function() {
    addSongs(songs);
});

document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("songFormModal");
    var btn = document.getElementById("addSongButton"); // You need to add this button for opening the form
    var span = document.getElementsByClassName("close-button")[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle form submission
    document.getElementById('addSongForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent actual form submission
        // Extract song details from form inputs
        const songUrl = document.getElementById('songUrl').value;
        const songTitle = document.getElementById('songTitle').value;
        const songDescription = document.getElementById('songDescription').value;
        // Convert the date from input to a more readable string format
        const rawDate = new Date(document.getElementById('songDate').value);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const songDate = `${rawDate.toLocaleDateString('en-US', options)}`;

        // Create a new song object
        const newSong = {
            iframeCode: songUrl,
            title: songTitle,
            description: songDescription,
            dateAdded: songDate
        };
        // Add the new song to the global songs array
        songs.push(newSong);

        // Add the new song to the songs list and update the page
        addSongs([newSong]); // This function is already defined to add songs to the page
        modal.style.display = "none";
    });
});


async function main() {
    // Function to read all songs in the database
    await connectToDatabase()
    const cursor = client.db("songsdb").collection("songlist").find().sort({_id : 1});

    const songs = await cursor.toArray();
    addSongs(songs);
    await closeDatabaseConnection()

    
}

main()