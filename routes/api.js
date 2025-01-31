var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api', { title: 'api' });
});

/* QR Code API */
router.get('/qr', async (req, res) => {
  const data = req.query.data || 'Example';
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(data)}`;
  res.send(`<h1>QR Code</h1><img src="${url}" alt="QR Code"><br><a href="/">Back</a>`);
});

/* YesNo API */
router.get('/yesno', async (req, res) => {
  try {
    const response = await axios.get('https://yesno.wtf/api');
    res.send(`
      <h1>Yes or No</h1>
      <p>Answer: ${response.data.answer}</p>
      <img src="${response.data.image}" alt="Yes/No GIF"><br>
      <a href="/">Back</a>
    `);
  } catch (error) {
    res.status(500).send('Error fetching data from YesNo API');
  }
});

/* Dog API */
router.get('/dog', async (req, res) => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/image/random');
    res.send(`
      <h1>Random Dog</h1>
      <img src="${response.data.message}" alt="Random Dog"><br>
      <a href="/">Back</a>
    `);
  } catch (error) {
    res.status(500).send('Error fetching data from Dog API');
  }
});

module.exports = router;
