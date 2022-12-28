'use strict';

// Data
const account1 = {
  owner: 'Hritik Dangi',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Madhav Mishra',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Nikhil Kumar',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


// //Dom manupulation
// const displayMovements = function (movements) {
//   containerMovements.innerHTML = '';
//   movements.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';
//     const html = `
//   <div class="movements__row">
//           <div class="movements__type movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//           <div class="movements__value">${mov}</div>
//         </div>
//   `;

//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
// };

// displayMovements(account1.movements);

//sorting user names like we have name as ('Hritik Dangi -> hd) we login using it 
const user= 'Hritik Dangi';
const userName= user.toLocaleLowerCase().split(' ').map(function(startLetter){
 return startLetter[0]}).join('')

console.log(userName)