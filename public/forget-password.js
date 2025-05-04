document.getElementById('forgotForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value;

  try {
    const response = await fetch('http://localhost:5000/api/v1/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    const messageEl = document.getElementById('message');
    if (response.ok) {
      messageEl.innerText = data.message;
      messageEl.style.color = 'green';
    } else {
      messageEl.innerText = data.message || 'Something went wrong';
      messageEl.style.color = 'red';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('message').innerText = 'Error sending request';
    document.getElementById('message').style.color = 'red';
  }
});
