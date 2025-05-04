document.getElementById('resetForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();
  const message = document.getElementById('message');

  const token = new URLSearchParams(window.location.search).get('token');

  if (!token) {
    message.textContent = 'Missing token!';
    message.style.color = 'red';
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = 'Passwords do not match!';
    message.style.color = 'red';
    return;
  }

  try {
    const res = await fetch('/api/v1/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = data.message;
      message.style.color = 'lightgreen';
    } else {
      message.textContent = data.message || 'Error';
      message.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    message.textContent = 'Something went wrong!';
    message.style.color = 'red';
  }
});
