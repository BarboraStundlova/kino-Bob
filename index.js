'use strict';
document.getElementById('content').style.display = 'none';

const inputDate = (n) => {
  const date = new Date();
  date.setDate(date.getDate() + n);
  let weekday = new Array(7);
  weekday[1] = 'Pondělí';
  weekday[2] = 'Úterý';
  weekday[3] = 'Středa';
  weekday[4] = 'Čtvrtek';
  weekday[5] = 'Pátek';
  weekday[6] = 'Sobota';
  weekday[0] = 'Neděle';
  weekday[7] = 'Neděle';
  let dayName = weekday[date.getDay()];

  const input = `${dayName} ${date.getDate()}. ${
    date.getMonth() + 1
  }. ${date.getFullYear()}`;

  return input;
};

const date = new Date();

let dayInput = [
  inputDate(0),
  inputDate(1),
  inputDate(2),
  inputDate(3),
  inputDate(4),
  inputDate(5),
  inputDate(6),
];

for (let i = 0; i < dayInput.length; i += 1) {
  document.getElementById(`day${i}`).innerHTML = dayInput[i];
}
for (let i = 0; i < dayInput.length - 1; i += 1) {
  document.getElementById(`session${i}`).innerHTML = `${2 * i + 10}:00`;
}

const loadMovieName = () => {
  const dataForDB = {
    date: `${document.getElementById('day').value}`,
    session: `${document.getElementById('session').value}`,
  };
  let session = dataForDB.session;
  let day = dataForDB.date;
  document.querySelector('#content').style.display = 'flex';
  document.getElementById('movie').innerHTML = `${
    movies.day[Number(day[3])].session[Number(session[7])].name
  }`;
};

let audience = ``;
let spanNum = 0;
for (let i = 0; i < 10; i += 1) {
  audience += `<div class="seatRow"><span <span class="rowNum">${
    10 - i
  }</span>`;
  for (let j = 0; j < 10 - parseInt(i / 3); j += 1) {
    audience += `<button class="seatButton id="${i}${j}">${j + 1}</button>`;
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
  let data = {
    day: document.getElementById('day').value,
    session: document.getElementById('session').value,
    name: document.getElementById('movie').textContent,
    seats: seats,
  };
  console.log(data);
  alert('Rezervace proběhla v pořádku');
};
const orderButton = `
<button id="buttonPick" onClick="sendData()">Rezervovat</button>
`;
