const express = require('express')
const app = express();
const axios = require('axios')
const cors = require('cors');


app.use(cors({
  origin: 'https://weather-domain.netlify.app',
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
}));


app.get('/', (req, res)=>{
  res.send('<h1>Hello World! Thanks for coming here...</h1>')
})

app.get(`/weather`, async (req,res)=>{
   try{
    const cityname = req.query.q;
    const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=9b484074f9274ffa85c181050241101&q=${cityname}&days=3`)
    const Apidata = response.data;
        // Modify or combine data as needed
        const modifiedData = {
            ...Apidata,
            additionalInfo: 'Some additional server-side data'
          };

    res.json(modifiedData).status(200);
   }
   catch (error){
    console.log('Error in fetching the data')
    res.status(500).send({ error: 'Internal Server error' }); // Send a JSON object

   }
});

app.listen(5000, ()=>{
    console.log('server is listening on localhost:5000')
})
