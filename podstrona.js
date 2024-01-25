//podstrona.js

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const nazwaRestauracji = params.get('nazwa');
    const reContainer = document.getElementById('reqContainer');
  
    fetch(`http://localhost:5500/search?term=${nazwaRestauracji}`)
    
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd sieci lub serwera');
        }
        return response.json();
      })
      .then(data => {
        // Aktualizacja wyników na stronie
        if (data.length === 0) {
          reContainer.innerHTML += '<p>Brak wyników.</p>';
        } else {
          data.forEach(restauracja => {
            reContainer.innerHTML += `
            <div class="wynik">
            <div class=foto-container'>
            <ul>
             <li><img class="foto" src="${restauracja.zdjecie.length > 0 ? restauracja.zdjecie[0] : 'brak-obrazu.jpg'}" alt="${restauracja.nazwa}" width="400" height="200"></li>
             <li><img class="foto" src="${restauracja.zdjecie.length > 0 ? restauracja.zdjecie[1] : 'brak-obrazu.jpg'}" alt="${restauracja.nazwa}" width="400" height="200"></li>
             <li><img class="foto" src="${restauracja.zdjecie.length > 0 ? restauracja.zdjecie[2] : 'brak-obrazu.jpg'}" alt="${restauracja.nazwa}" width="400" height="200"></li>
             <li><img class="foto" src="${restauracja.zdjecie.length > 0 ? restauracja.zdjecie[3] : 'brak-obrazu.jpg'}" alt="${restauracja.nazwa}" width="400" height="200"></li>
             <li><img class="foto" src="${restauracja.zdjecie.length > 0 ? restauracja.zdjecie[4] : 'brak-obrazu.jpg'}" alt="${restauracja.nazwa}" width="400" height="200"><br></li>
             </ul>
            </div>
            <h5><br>${restauracja.nazwa}</h5>
            <p>Kuchnia: ${restauracja.kuchnia}</p>
            <p>Ulica: ${restauracja.ulica}</p>
            <p>${restauracja.opis}</p>
            <h6>${restauracja.link}</h6>
            <a href="${restauracja.link2}"><img src="./images/ta.png" alt="Ikona" width="48" height="48"></a>
            
            </div>
            `;
          });
        }
      })
      .catch(error => {
        console.error('Błąd podczas pobierania danych:', error);
      });
  });


