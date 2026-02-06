const key = 'AIzaSyAQizX4atPyvx_rU4fVLyChQhTH-4FN_fM';

(async () => {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${key}`
    );
    console.log('Status:', res.status);
    const data = await res.json();
    if (data.models) {
      console.log('Available models:');
      data.models.forEach(m => console.log('-', m.name));
    } else {
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
