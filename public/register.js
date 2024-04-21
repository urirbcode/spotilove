const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Check if password is at least 6 characters long
    if (password.length < 6) {
        alert('Password must be at least 6 characters long.');
        return;
    }

    try {
        const response = await axios.post('/api/users/register', { email, password });
        if (response.status === 201) {
            alert('Registration successful. Please log in.');
            window.location.href = '/login';
        } else {
            throw new Error('Registration failed');
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('Registration failed. Please try again.');
    }
});