const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());

// Routes
// app.get('/restaurants', async (req, res) => {
//   try {
//     const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4491088&lng=78.3565045&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data from Swiggy API:', error);
//     res.status(500).json({ error: 'Failed to fetch data from Swiggy API' });
//   }
// });

app.get('/api/restaurants', (req, res) => {
    const { lat, lng } = req.query;
    console.log(req.query);
    const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4491088&lng=78.3565045&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";
  
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data,'dataa');
        res.json(data);

      })
      .catch(error => {
        console.error(error);
        res.status(500).send('An error occurred');
      });
  });

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
