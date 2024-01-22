const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://Kulinarny:Przewodnik@kulinarnyprzewodnik.dnyypxj.mongodb.net/';
const dbName = 'KulinarnyPrzewodnik';

const restaurants = [
  {
    zdjecia: 'url_do_obrazka_1z',
    kuchnia: 'Amerykańska',
    nazwa: 'Restauracja 1z',
    ulica: 'ul. Przykładowa 6z',
    opis: 'Opis restauracji 1z',
    link:'LinkResturacjiz',
    link2:'LinkResturacji2z',
  },
];

async function addRestaurantsToDatabase() {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const restaurantsCollection = db.collection('restauracje');

    // Wyczyszczenie obecnych danych (opcjonalne)
    //await restaurantsCollection.deleteMany({});

    // Wprowadzenie nowych danych
    await restaurantsCollection.insertMany(restaurants);

    console.log('Dane zostały dodane do bazy danych.');
  } catch (error) {
    console.error('Błąd podczas dodawania danych do bazy:', error);
  } finally {
    // Zamykanie połączenia z bazą danych
    client.close();
  }
}

addRestaurantsToDatabase();
