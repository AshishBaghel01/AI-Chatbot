const fs = require('fs');

(async () => {
  try {
    const cookieRaw = fs.existsSync('cookies.txt') ? fs.readFileSync('cookies.txt', 'utf8') : '';
    const matches = cookieRaw.match(/auth_token=([^;\n\r]+)/g);
    if (!matches || matches.length === 0) {
      console.error('No auth_token found in cookies.txt');
      process.exit(1);
    }
    const last = matches[matches.length - 1].split('=')[1];
    const cookieValue = decodeURIComponent(last);

    const body = JSON.stringify({ message: 'Hello Gemini, please reply briefly.' });
    const res = await fetch('http://localhost:5000/api/v1/chat/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `auth_token=${cookieValue}`,
      },
      body,
    });
    console.log('Status:', res.status);
    const text = await res.text();
    console.log('Response body:', text);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
