const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 5500;

const url = 'mongodb+srv://Kulinarny:Przewodnik@kulinarnyprzewodnik.dnyypxj.mongodb.net/'; // Adres lokalnej bazy danych MongoDB
const dbName = 'KulinarnyPrzewodnik';

app.use(express.static('public')); // Katalog z plikami statycznymi (np. HTML, CSS, JS)
// W server.js
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods',  'GET, POST , OPTIONS, PUT ,PATCH ,DELETE');
  res.setHeader('Access-Control-Allow-Headers',  'X-Requested-with,content-type');
  res.setHeader('Access-Control-Allow-Credentials',  true);
  next();
});

const handleKuchniaRequest = async (kuchnia, req, res) => {
  try {
    const client = await MongoClient.connect(url, {});
    const db = client.db(dbName);

    const restaurantsCollection = db.collection('restauracje');

    const result = await restaurantsCollection.find({ kuchnia }).toArray();

    res.json(result);
    client.close();
  } catch (error) {
    console.error(`Błąd podczas łączenia z bazą danych dla kuchni ${kuchnia}:`, error);
    res.status(500).json({ error: 'Błąd serwera' });
  }
};

app.get('/arabska', async (req, res) => {
  await handleKuchniaRequest('Arabska', req, res);
});

app.get('/amerykanska', async (req, res) => {
  await handleKuchniaRequest('Amerykańska', req, res);
});

app.get('/chinska', async (req, res) => {
  await handleKuchniaRequest('Chińska', req, res);
});

app.get('/grecka', async (req, res) => {
  await handleKuchniaRequest('Grecka', req, res);
});

app.get('/gruzinska', async (req, res) => {
  await handleKuchniaRequest('Gruzińska', req, res);
});

app.get('/indynska', async (req, res) => {
  await handleKuchniaRequest('Indyjska', req, res);
});

app.get('/japonska', async (req, res) => {
  await handleKuchniaRequest('Japońska', req, res);
});

app.get('/koreanska', async (req, res) => {
  await handleKuchniaRequest('Koreańska', req, res);
});

app.get('/meksykanska', async (req, res) => {
  await handleKuchniaRequest('Meksykańska', req, res);
});

app.get('/polska', async (req, res) => {
  await handleKuchniaRequest('Polska', req, res);
});

app.get('/tajska', async (req, res) => {
  await handleKuchniaRequest('Tajska', req, res);
});

app.get('/turecka', async (req, res) => {
  await handleKuchniaRequest('Turecka', req, res);
});

app.get('/ukrainska', async (req, res) => {
  await handleKuchniaRequest('Ukraińska', req, res);
});

app.get('/wegetarianska', async (req, res) => {
  await handleKuchniaRequest('Wegetariańska', req, res);
});

app.get('/wietnamska', async (req, res) => {
  await handleKuchniaRequest('Wietnamska', req, res);
});

app.get('/wloska', async (req, res) => {
  await handleKuchniaRequest('Włoska', req, res);
});

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
  