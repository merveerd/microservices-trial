const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post('http://posts-clusterip-srv:4000/events', event); //there will be error handler for each post request 
  // axios.post('http://comments-srv:4001/events', event);
  // axios.post('http://query-srv:4002/events', event);
  // axios.post('http://moderation-srv:4003/events', event);

  res.send({ status: 'OK' });
});

app.listen(4005, () => {
  console.log('Listening on 4005');
});
//Whenever a post request comes to event-bus, it makes a post requests for each services
