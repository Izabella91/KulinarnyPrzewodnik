// app.js

document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.querySelector('button');
  const searchBox = document.getElementById('search-box');
  const resultContainer = document.getElementById('aktualnosci');

  searchButton.addEventListener('click', () => {
    const searchTerm = searchBox.value;

    
    fetch(`http://localhost:5500/search?term=${searchTerm}`)
    
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd sieci lub serwera');
        }
        return response.json();
      })
      .then(data => {
        // Aktualizacja wyników na stronie
        resultContainer.innerHTML = `<h2>Wyniki wyszukiwania dla "${searchTerm}":</h2>`;
        if (data.length === 0) {
          resultContainer.innerHTML += '<p>Brak wyników.</p>';
        } else {
          data.forEach(restauracja => {
            resultContainer.innerHTML += `
            <div class="search-result">
            <ul>
             <li><img src="${restauracja.zdjecie.length > 0 ? restauracja.zdjecie[0] : 'brak-obrazu.jpg'}" alt="${restauracja.nazwa}" width="400" height="200"></li>
            <li>
            <h3>${restauracja.nazwa}</h3>
            <p>Kuchnia: ${restauracja.kuchnia}</p>
            <p>Ulica: ${restauracja.ulica}</p>
            <p>Opis: ${restauracja.opis}</p>
            </li>
            </ul>
            </div>

            `;
          });
        }
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  });
});

