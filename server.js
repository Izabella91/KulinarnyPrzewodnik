const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 5500;

const url = 'mongodb://127.0.0.1/'; // Adres lokalnej bazy danych MongoDB
const dbName = 'KulinarnyPrzewodnik';

app.use(express.static('public')); // Katalog z plikami statycznymi (np. HTML, CSS, JS)

// W server.js

app.get('/search', async (req, res) => {
    const searchTerm = req.query.term;
  
    try {
      const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
      const db = client.db(dbName);
  
      const restaurantsCollection = db.collection('restauracje');
  
      const result = await restaurantsCollection.find({
        $or: [
          { nazwa: { $regex: searchTerm, $options: 'i' } },
          { kuchnia: { $regex: searchTerm, $options: 'i' } }
        ]
      }).toArray();
  
      res.json(result);
      client.close();
    } catch (error) {
      console.error('Błąd podczas łączenia z bazą danych:', error);
      res.status(500).send('Błąd serwera');
    }
  });

  app.listen(port, () => {
    console.log(`Serwer uruchomiony na porcie ${port}`);
});
  