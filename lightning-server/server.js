// server.js
import express from 'express';
import cors from 'cors';
import foodSearch from './foodSearch.js';
import fileReader from './fileReader.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS for all routes

// it's not REST-ful. It's just getting a server up and running so we can run backend services.

// Define an endpoint to execute foodSearch
app.get('/food-search', async (req, res) => {
  try {
    const result = await foodSearch(req.query.url);
    res.json(result.choices[0].message.content);
  } catch (error) {
    console.error('Error executing food Search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint to execute restaurant search
app.get('/restaurant-search', async (req, res) => {
  try {
    const foodType = req.query.foodType
    const searchResponse = await fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_SEARCH_API_KEY}&q=${foodType}+restaurants+in+halifax+west+yorkshire`, {method: 'GET'});
    const restaurants = await searchResponse.json();
    res.json(restaurants);
  } catch (error) {
    console.error('Error executing restaurant Search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define an endpoint to read image data
app.get('/file-reader', async (_, res) => {
  try {
    const images = await fileReader()
    res.json(images);
  } catch (error) {
    console.error('Error executing File Reader', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
