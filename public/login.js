const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await axios.post('/api/users/login', { email, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        window.location.href = '/'; // Redirect to the home page after successful login
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Invalid email or password');
    }
});