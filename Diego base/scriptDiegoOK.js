
// Dati dinamici delle card
let cardsData = [
  { id: 1, title: "Trasquera, Italia", description: "241 € a notte" },
  { id: 2, title: "Useglio, Italia", description: "732 € a notte" },
  { id: 3, title: "Bettmeralp, Svizzera", description: "213 € a notte" },
  { id: 4, title: "Varzo, Italia", description: "142 € a notte" },
  { id: 5, title: "Lauterbrunnen, Svizzera", description: "277 € a notte" },
  { id: 6, title: "Boleto - Madonna del sasso, Italia", description: "125 € a notte" },
  { id: 7, title: "Bormio, Italia", description: "1.624 € a notte" },
  { id: 8, title: "Monno, Italia", description: "211 € a notte" },
  { id: 9, title: "Mund, Svizzera", description: "153 € a notte" },
  { id: 10, title: "Casa Vacanze - Varenna, Italia", description: " € a notte" },
];

document.addEventListener('DOMContentLoaded', () => {
  let cardSection = document.getElementById("cardSection"); // Seleziona la sezione in cui inserire le card
  let userIcon = document.getElementById('userIcon'); // icona utente
  let userMenu = document.getElementById('userMenu'); // menu utente

  let hoverSections = document.querySelectorAll('.hover-section'); // focus su input, al clik dell'intera sezione

  let searchButton = document.getElementById('search-button'); // search button

  let sezioneDove = document.getElementById('location-section'); // sezione DOVE
  let dropdownMenuDove = sezioneDove.querySelector('.location-menu'); //menu DOVE 

  let sezioneCheckin = document.getElementById('check-in-section'); // sezione checkin
  let dropdownMenu = sezioneCheckin.querySelector('.calendar-menu'); // menu checkin
  let calendarGrid = document.getElementById('calendarGrid'); // Griglia per calendario dinamico
  let prevMonthButton = document.getElementById('prevMonth'); // bottone mese precedente
  let nextMonthButton = document.getElementById('nextMonth'); // bottone mese successivo

  let tabDates = document.getElementById('tab-dates'); //tabs data header menu calendario
  let tabMonths = document.getElementById('tab-months'); //tabs mesi header menu calendario
  let tabFlexible = document.getElementById('tab-flexible'); //tabs flessible header menu calendario

  let checkinInput = document.querySelector('#check-in-section input'); // selezione l'input del chekin
  let checkoutInput = document.querySelector('#check-out-section input'); // seleziono l'input del chekput

  let isSelectingCheckin = true; // Flag per sapere se si sta selezionando il check-in o il check-out

  let sezioneChi = document.getElementById('sezione-chi'); // sezione chi
  let dropdownChi = document.querySelector('.chi-dropdown'); // menu chi)



  //--------------------CARD-------------------------

  // Funzione per creare e aggiungere le card
  function populateCards(data) {
    data.forEach(card => {
      // Crea il contenitore della card
      let cardDiv = document.createElement("div");
      cardDiv.className = "cardHome";
      let cardImg = document.createElement("div");
      cardImg.className = "cardImg";

      // Crea l'immagine
      let img = document.createElement("img");
      img.src = `assets/CARD/${card.id}.webp`;
      img.alt = card.title;

      // Crea il titolo
      let title = document.createElement("h5");
      title.textContent = card.title;

      // Crea la descrizione
      let description = document.createElement("p");
      description.textContent = card.description;

      // Aggiungi gli elementi al contenitore della card
      cardImg.appendChild(img);
      cardDiv.appendChild(cardImg)
      cardDiv.appendChild(title);
      cardDiv.appendChild(description);

      // Aggiungi la card alla sezione
      cardSection.appendChild(cardDiv);
    });
  }

  // Popola le card con i dati
  populateCards(cardsData);

  // -------------Gestione del menu utente-----------------------

  // Toggle menu al clic sull'icona utente
  userIcon.addEventListener('click', (event) => {
    event.stopPropagation();
    userMenu.classList.toggle('show');
  });

  document.addEventListener('click', (event) => {
    if (!userMenu.contains(event.target) && !userIcon.contains(event.target)) {
      userMenu.classList.remove('show');
    }
  });

  // focus su input, al clik dell'intera sezione
  hoverSections.forEach(section => {
    section.addEventListener('click', () => {
      let input = section.querySelector('input');
      if (input) {
        input.focus(); // Sposta il cursore nel campo input
      }
    });
  });

  // --------------CENTRALE gestione MENU BARRA-------------------



  // --------------ATTIVAZIONE SERACH-------------

  // Aggiungi l'evento a ciascuna sezione
  hoverSections.forEach((section) => {
    section.addEventListener('click', () => {
      // Aggiungi la classe "expanded" al pulsante di ricerca
      searchButton.classList.add('expanded');
    });
  });

  // Rimuovi l'espansione cliccando fuori
  document.addEventListener('click', (event) => {
    if (!searchButton.contains(event.target) && !Array.from(hoverSections).some(section => section.contains(event.target))) {
      searchButton.classList.remove('expanded');
    }
  });

  // ---------------MENU DOVE--------------------

  // Mostra/nascondi il menu a tendina al clic
  sezioneDove.addEventListener('click', () => {
    let isMenuOpen = dropdownMenuDove.classList.contains('show');

    // Chiudi il menu se è già aperto
    if (isMenuOpen) {
      dropdownMenuDove.classList.remove('show');
    } else {
      dropdownMenuDove.classList.add('show');
    }
  });

  // Chiudi il menu se clicco fuori
  document.addEventListener('click', (event) => {
    if (!sezioneDove.contains(event.target)) {
      dropdownMenuDove.classList.remove('show');
    }
  });

  //--------------CHECKIN--------------------

  // Gestione dei tab (solo visivo per ora)
  [tabDates, tabMonths, tabFlexible].forEach((tab) => {
    tab.addEventListener('click', (event) => {
      document.querySelectorAll('.tab-button').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      event.stopPropagation(); // Previene la chiusura al clic sulla stessa area
    });
  });

  let currentDate = new Date();

  // Mostra/nascondi il Calendario al clic
  sezioneCheckin.addEventListener('click', (event) => {
    if (!dropdownMenu.classList.contains('show')) {
      populateCalendars(currentDate);
      dropdownMenuDove.classList.remove('show'); // chiude il menu Dove, se aperto
      dropdownChi.classList.remove('show'); // chiude il menu Chi, se aperto
    }
    dropdownMenu.classList.toggle('show');
    event.stopPropagation(); // Previene la chiusura al clic sulla stessa area
  });

  // Evita la chiusura quando si clicca sulle frecce
  prevMonthButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Impedisce la propagazione del clic
    currentDate.setMonth(currentDate.getMonth() - 1);
    populateCalendars(currentDate);
  });

  nextMonthButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Impedisce la propagazione del clic
    currentDate.setMonth(currentDate.getMonth() + 1);
    populateCalendars(currentDate);
  });

  // Chiudi il menu se clicco fuori
  document.addEventListener('click', (event) => {
    if (!sezioneCheckin.contains(event.target)) {
      dropdownMenu.classList.remove('show');
    }
  });

  // Popola i calendari con due mesi affiancati
  function populateCalendars(date) {
    let year = date.getFullYear();
    let month = date.getMonth();

    // Ottieni il mese successivo
    let nextMonthDate = new Date(year, month + 1, 1);

    // Cancella i calendari esistenti
    calendarGrid.innerHTML = '';

    // Popola il calendario per il mese corrente
    calendarGrid.appendChild(createCalendarMonth(date));

    // Popola il calendario per il mese successivo
    calendarGrid.appendChild(createCalendarMonth(nextMonthDate));
  }

  // Crea un calendario per un mese specifico
  function createCalendarMonth(date) {
    let year = date.getFullYear();
    let month = date.getMonth();

    // Intestazione del mese
    let monthNames = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
    let calendarContainer = document.createElement('div');
    calendarContainer.classList.add('calendar-month');

    let monthHeader = document.createElement('h6');
    monthHeader.textContent = `${monthNames[month]} ${year}`;
    calendarContainer.appendChild(monthHeader);

    let table = document.createElement('table');
    table.classList.add('table', 'table-borderless', 'text-center');

    // Giorni della settimana
    let thead = document.createElement('thead');
    let weekdaysRow = document.createElement('tr');
    let weekdays = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'];
    weekdays.forEach(day => {
      let th = document.createElement('th');
      th.textContent = day;
      weekdaysRow.appendChild(th);
    });
    thead.appendChild(weekdaysRow);
    table.appendChild(thead);

    // Corpo del calendario
    let tbody = document.createElement('tbody');
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    let lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    let day = 1;
    let nextMonthDay = 1;
    let today = new Date();

    for (let week = 0; week < 6; week++) {
      let tr = document.createElement('tr'); // aggiungo una riga per ogni settimana (massimo 6 righe)

      for (let weekday = 0; weekday < 7; weekday++) {
        let td = document.createElement('td'); // creo una cella del giorno (7 giorni)

        if (week === 0 && weekday < firstDayOfMonth - 1) {
          // Giorni del mese precedente
          td.textContent = lastDateOfPrevMonth - (firstDayOfMonth - 2 - weekday);
          td.classList.add('inactive');
        } else if (day <= lastDateOfMonth) {
          // Giorni del mese corrente
          let currentDay = new Date(year, month, day);
          td.textContent = day++;

          if (currentDay < today) {
            // Rendi inattivo se il giorno è antecedente alla data corrente
            td.classList.add('inactive');
          } else {
            // Giorni attivi
            td.classList.add('active');
          }
          ;
        } else {
          // Giorni del mese successivo
          td.textContent = nextMonthDay++;
          td.classList.add('inactive');
        }

        tr.appendChild(td);
      }

      tbody.appendChild(tr);

      if (day > lastDateOfMonth && nextMonthDay > 7) {
        break; // Ferma la creazione di righe aggiuntive
      }
    }

    table.appendChild(tbody);
    calendarContainer.appendChild(table);

    return calendarContainer;
  }

  //-----------SELEZIONE DELLE DATE-------------

  // Funzione per resettare le selezioni sul calendario
  const resetSelections = () => {
    // Rimuovi le classi di selezione da tutte le celle attive
    document.querySelectorAll('.active').forEach((cell) => {
      cell.classList.remove('selected-checkin', 'selected-checkout');
    });
  };

  // Listener per la griglia del calendario
  calendarGrid.addEventListener('click', (event) => {
    let cell = event.target;


    // Previene la chiusura del menu
    event.stopPropagation();

    // Verifica che l'elemento cliccato sia una cella valida del calendario
    if (cell.tagName === 'TD' && !cell.classList.contains('inactive')) {
      let selectedDate = cell.textContent.trim(); // Legge la data selezionata
      let currentMonth = currentDate.getMonth() + 1; // Mese corrente (1-based)
      let currentYear = currentDate.getFullYear(); // Anno corrente

      if (isSelectingCheckin) {
        // Selezione del check-in
        resetSelections(); // Resetta tutte le selezioni precedenti
        cell.classList.add('selected-checkin'); // Evidenzia la data selezionata
        checkinInput.value = `${selectedDate}/${currentMonth}/${currentYear}`; // Aggiorna l'input del check-in
        isSelectingCheckin = false; // Passa alla selezione del check-out
      } else {
        // Selezione del check-out
        if (!cell.classList.contains('selected-checkin')) {
          cell.classList.add('selected-checkout'); // Evidenzia la data selezionata
          checkoutInput.value = `${selectedDate}/${currentMonth}/${currentYear}`; // Aggiorna l'input del check-out

          // Torna alla selezione del check-in
          isSelectingCheckin = true;
        }
      }
    }
  });

//------------------MENU CHI---------------

  // Mostra/nascondi il menu a tendina al clic
  sezioneChi.addEventListener('click', () => {
    let isMenuOpen = dropdownChi.classList.contains('show');

    // Chiudi il menu se è già aperto
    if (isMenuOpen) {
      dropdownChi.classList.remove('show');
    } else {
      dropdownChi.classList.add('show');
    }
  });

  // Chiudi il menu se clicco fuori
  document.addEventListener('click', (event) => {
    if (!sezioneChi.contains(event.target)) {
      dropdownChi.classList.remove('show');
    }
  });

  // calcolo dei pulsanti del modale
  document.querySelectorAll('.counter-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation()
      // Trova il target da aggiornare
      const targetId = button.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
  
      // Prende il valore corrente
      let currentValue = parseInt(targetElement.textContent, 10);
  
      // Controlla se il valore corrente è NaN (fallback a 0)
      if (isNaN(currentValue)) {
        currentValue = 0;
      }
  
      // Aggiorna il valore in base al tipo di pulsante (+ o -)
      if (button.classList.contains('btn-plus')) {
        currentValue++;
      } else if (button.classList.contains('btn-minus') && currentValue > 0) {
        currentValue--;
      }
  
      // Imposta il nuovo valore
      targetElement.textContent = currentValue;
    });
  });

//---------------BOTTONE CERCA CLICK----------------

let bottoneCerca = document.getElementById('bottoneCerca')
let diego = document.getElementById('diego')
let nico = document.getElementById('nico')

bottoneCerca.addEventListener('click', ()=>{
  diego.style.display === 'none'
  nico.style.display === 'block'

} )

}); //---------------FINE---------------------


