const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const http = require('http');
const PORT = process.env.PORT || 8000;
const app = express();
const server = http.Server(app);

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('MongoDB Connected');
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'files')));
app.use(routes);

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
