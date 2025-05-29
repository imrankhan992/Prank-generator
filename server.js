import express from 'express';
import axios from 'axios';
import cors from 'cors'; // if needed
import path from 'path';
// const __filename = fileURLToPath(import.meta.url);
const app = express();
const PORT = 3000;

const __dirname = path.resolve()
app.use(cors());

// Put your actual token here or use dotenv
const BRAWL_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQ2Y2Y0ZTJjLWE4MWEtNDFjZS05NTU1LWFmMjYwYjI0MTM0YyIsImlhdCI6MTc0ODIxNzY3OCwic3ViIjoiZGV2ZWxvcGVyLzE5ZjEwOTg1LWFjZGYtYjU2YS1jMjJjLWUyYzE3NDIyMGVmMyIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTk4LjU0LjExNC4xMiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.LzUQjEpsdkty9sy4AMIZgfBK_RiCc0dEhjoJ09zLpp91pWO9cGsjhwKUz5dk0kSG8i4itxDi6H_KZyn_uS9GVA';

app.get('/brawl-api', async (req, res) => {
  const tag = req.query.tag;

  if (!tag) {
    return res.status(400).json({ error: true, reason: 'Missing player tag' });
  }

  const cleanedTag = tag.replace('#', '');
  const url = `https://api.brawlstars.com/v1/players/%23${cleanedTag}`;
// jflsa
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: BRAWL_API_TOKEN,
        Accept: 'application/json',
      },
    });

    res.status(200).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    res.status(status).json({
      error: true,
      reason: 'Player not found',
      code: status,
    });
  }
});
// console.log(path.join(__dirname, 'dist', 'index.html'))
// Serve static files from React
app.use(express.static(path.join(__dirname, 'dist')));
console.log("Serving static files from: ", path.join(__dirname, 'dist'));
// // Fallback for React Router
app.get("*",(req,res)=>{

    res.sendFile(path.join(__dirname,"dist","index.html"))
})

app.listen(PORT, () => {
  console.log(`Brawl API server is running on http://localhost:${PORT}`);
});

















