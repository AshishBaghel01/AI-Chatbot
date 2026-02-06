import fs from 'fs';
const env = fs.readFileSync('backend/.env','utf8');
const m = env.match(/GEMINI_API_KEY=(.*)/);
if(!m){console.error('GEMINI_API_KEY not found'); process.exit(1);}
const key = m[1].trim();
(async()=>{
  try{
    const res = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${key}`);
    console.log('status',res.status);
    console.log(await res.text());
  }catch(e){console.error(e)}
})();
