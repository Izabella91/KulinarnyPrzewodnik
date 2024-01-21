document.addEventListener('DOMContentLoaded', () => {
  const kuchnie = ['amerykanska', 'arabska', 'chinska', 'grecka', 'gruzinska', 'indynska', 'japonska', 'koreanska', 'meksykanska', 'tajska', 'turecka', 'ukrainska', 'wegetarianska', 'wietnamska', 'wloska', 'polska']; // Dodaj inne kuchnie według potrzeb
  kuchnie.forEach(kuchnia => {
    const gridContainer = document.getElementById(`${kuchnia}-grid-container`);

    // Pobierz wszystkie restauracje dla danej kuchni
    fetch(`http://localhost:5500/${kuchnia}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Błąd sieci lub serwera dla kuchni ${kuchnia}`);
        }
        return response.json();
      })
      .then(data => {
        // Aktualizacja wyników w divie grid-container
        gridContainer.innerHTML = ''; // Wyczyść poprzednie dane

        if (data.length === 0) {
          gridContainer.innerHTML += `<p>Brak wyników dla kuchni ${kuchnia}.</p>`;
        } else {
          data.forEach(restauracja => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            
            // Sprawdź, czy istnieje obiekt zdjecie i czy posiada co najmniej jeden element
            const zdjecieSrc = restauracja.zdjecie && restauracja.zdjecie.length > 0 ? restauracja.zdjecie[0] : '';

            gridItem.innerHTML = `
              <h3>${restauracja.nazwa}</h3>
              <p>Lokalizacja: ${restauracja.ulica}</p>
              <p>Opis: ${restauracja.opis}</p>
              <img src="${zdjecieSrc}" alt="${restauracja.nazwa}">
              <p>Link: <a href="${restauracja.link}" target="_blank">${restauracja.link}</a></p>
              <p>Link 2: <a href="${restauracja.link2}" target="_blank">${restauracja.link2}</a></p>
            `;

            gridContainer.appendChild(gridItem);
          });
        }
      })
      .catch(error => {
        console.error(`Błąd podczas pobierania danych dla kuchni ${kuchnia}:`, error);
      });
  });
});