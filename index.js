'use strict';
document.getElementById('content').style.display = 'none';

const date = new Date();
const month = (date.getMonth() + 1).toString().padStart(2, '0');
const day = date.getDate().toString().padStart(2, '0');
document.getElementById('day').value = `${date.getFullYear()}-${month}-${day}`;
const minDate = new Date();
minDate.setDate(minDate.getDate() - 7);
const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 7);
document.getElementById('day').min = `${minDate.getFullYear()}-${(
  minDate.getMonth() + 1
)
  .toString()
  .padStart(2, '0')}-${minDate.getDate().toString().padStart(2, '0')}`;
document.getElementById('day').max = `${maxDate.getFullYear()}-${(
  maxDate.getMonth() + 1
)
  .toString()
  .padStart(2, '0')}-${maxDate.getDate().toString().padStart(2, '0')}`;

for (let i = 0; i < 6; i += 1) {
  document.getElementById(`session${i}`).innerHTML = `${2 * i + 10}:00`;
}

const loadMovieName = () => {
  let dataForDB = {
    date: `${document.getElementById('day').value}`,
    session: `${document.getElementById('session').value}`,
  };
  let session = dataForDB.session;
  let day = dataForDB.date;
  console.log(session);
  console.log(day);
  document.querySelector('#content').style.display = 'flex';

  const date1 = new Date(document.getElementById('day').value);
  const date2 = new Date();
  const difference = date1.getTime() - date2.getTime();
  const numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

  if (numberOfDays > -1) {
    document.getElementById('movie').innerHTML = `${
      movies.day[numberOfDays].session[Number(session[7])].name
    }`;
    let loadedData = localStorage.getItem(
      `${dataForDB.date}-${dataForDB.session}`,
    );
    let parsedData = JSON.parse(loadedData);
    let allSeats = document.querySelectorAll('.seatButton');
    for (let i = 0; i < allSeats.length; i++) {
      if (allSeats[i].classList.contains('reservedSeat')) {
        allSeats[i].classList.remove('reservedSeat');
      }
      allSeats[i].disabled = false;
    }
    for (let i = 0; i < parsedData.seats.length; i++) {
      document
        .querySelectorAll('.seatButton')
        [parsedData.seats[i]].classList.add('reservedSeat');
    }
  } else {
    document.getElementById('movie').innerHTML = `${
      archive.day[Math.abs(numberOfDays)].session[Number(session[7])].name
    }`;
    console.log();
    let loadedData = localStorage.getItem(
      `${dataForDB.date}-${dataForDB.session}`,
    );
    let parsedData = JSON.parse(loadedData);

    let allSeats = document.querySelectorAll('.seatButton');
    console.log(allSeats);
    for (let i = 0; i < allSeats.length; i++) {
      if (allSeats[i].classList.contains('reservedSeat')) {
        allSeats[i].classList.remove('reservedSeat');
      }
      allSeats[i].disabled = true;
      allSeats[i].classList.remove(':hover');
    }
    for (let i = 0; i < parsedData.seats.length; i++) {
      document
        .querySelectorAll('.seatButton')
        [parsedData.seats[i]].classList.add('reservedSeat');
    }
  }
};

let audience = ``;
let spanNum = 0;
for (let i = 0; i < 10; i += 1) {
  audience += `<div class="seatRow"><span <span class="rowNum">${
    10 - i
  }</span>`;
  for (let j = 0; j < 10 - parseInt(i / 3); j += 1) {
    audience += `<button class="seatButton" id="${i}${j}">${j + 1}</button>`;
  }
  audience += `<span class="rowNum">${10 - i}</span></div>`;
}
document.querySelector('#audience').innerHTML = audience;

let buttons = document.querySelectorAll('.seatButton');
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', () => {
    buttons[i].classList.toggle('selectedSeat');
    document.querySelector('.screen').innerHTML = orderButton;
  });
}

const sendData = () => {
  let seats = [];
  let buttons = document.querySelectorAll('.seatButton');

  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('selectedSeat')) {
      seats.push(i);
    }
  }
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].classList.contains('reservedSeat')) {
      seats.push(i);
    }
  }
  let data = {
    day: document.getElementById('day').value,
    session: document.getElementById('session').value,
    name: document.getElementById('movie').textContent,
    seats: seats,
  };
  console.log(data);
  localStorage.setItem(`${data.day}-${data.session}`, JSON.stringify(data));
  //console.log(localStorage.getItem("data"))
  if (confirm('Rezervace proběhla v pořádku')) {
    location.reload();
  }
};
const orderButton = `
<button id="buttonPick" onClick="sendData()">Rezervovat</button>
`;
