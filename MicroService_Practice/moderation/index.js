const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // is been used as function to prevent error on request sending to different domain


app.post('/events', async (req, res) => { //comes from event bus 4005
  const {
    type,
    data
  } = req.body;
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      }
    });
  };

  // console.log('Event Received:', req.body.type);

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});