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
  movements: [430, 1000, -333,700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//  Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginusername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseusername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');




//  ALL THE TRANSACTION LOGIC STARTS FROM HERE
//Dom manupulation
const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
  <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov} ₹</div>
        </div>
  `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

///    ENDS HERE    ///




/// DISPLAY BALANCE STARTS HERE   //
//this function will calculate the total balance (including depost + withdrew) and show
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

/// DISPLAY BALANCE END HERE   //




// BOTTOM AMOUNT LOGIC HERE (IN , OUT, INTEREST)   ///
const calcDisplaySummary = function (acc) {
  //jo paisa aa raha hai uska status
  const incomeIn = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomeIn} ₹`;
  //jo paisa jaa raha h uska status
  const incomeOut = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(incomeOut)} ₹`;

  //count the interest on amount  interest 1.2%
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    
    //from line no 108 to 120 is master code which means if in future bank introduces condition that only people have more than 1 rs in bank will get intrest so we can add by this otherwise simply remove this logic it will work with reduce  ..
    .filter((inter, arr) => {
      // console.log(arr);
      return inter >= 1; //IF INETEREST IS GREATER THAN 1
    }) //till now
    .reduce((acc, inter) => acc + inter, 0);
  labelSumInterest.textContent = `${interest} ₹`;
};


/////  BOTTOM LOGIC ENDS HERE  //////



//    username LOGIC STARTS HERE
//sorting user names like we have name as ('Hritik Dangi -> hd) we login using it
const createusername = function (accs) {
  accs.forEach(function (acc) {
    //here forEach producing a sideEffect where things working without returning
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(function (startLetter) {
        return startLetter[0]; //eska matlab particular array ko pehle split karke  point to its 0th index and take that element,
      })
      .join('');
  });
};
createusername(accounts);
// console.log(accounts);  //username added 
//   ENDS HERE     //

const updateUI= function(acc){
  
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};


///  THE USER LOGIN LOGIC GOES HERE 
let currentAccount;
  btnLogin.addEventListener('click', function(e){
  e.preventDefault()
// console.log("hey")
currentAccount=accounts.find(acc => acc.username === inputLoginusername.value);
console.log(currentAccount) 

if(currentAccount.pin=== Number(inputLoginPin.value)){
// Dsiplay UI ans welcome msg
labelWelcome.textContent= `Welcome back, ${currentAccount.owner.split(' ')[0]}`
containerApp.style.opacity=100;


//Clear input fields
inputLoginusername.value= inputLoginPin.value= '';
inputLoginPin.blur()  //thsi will remove the cursor blink/focus

//update UI
updateUI(currentAccount)
}

})

//   USER LOGIN LOGIC ENDS HERE


//amount transfer logic goes here 
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount= Number(inputTransferAmount.value);
  const receiverAcc= accounts.find(acc=>acc.username=== inputTransferTo.value);
  inputTransferAmount.value= inputTransferTo.value= '';
  // console.log(amount, receiverAcc)

    // logic for 
    // 1. (Transfer amount should not be negative ,
    // 2. user should have minimum amount to transfer  
    // 3. user should not transfer amount to self account 
 if( amount > 0 && receiverAcc &&
  currentAccount.balance >=amount && receiverAcc?.username !==
  // here ? after receiverAcc called as optional chaining 
   currentAccount.username ){
currentAccount.movements.push(-amount);
receiverAcc.movements.push(amount)
  // console.log('Transfer valid ')
 }

//updateUcI
updateUI(currentAccount)

})

//closing button user deletion on click logic goes here 
btnClose.addEventListener('click', function (e){
  e.preventDefault();
  // console.log('workingg')

  //here we are checking is the inputclose login credential is same as actual credential if yet than close the existing account
if(inputCloseusername.value=== currentAccount.username && Number(inputClosePin.value)=== currentAccount.pin){
  const index= accounts.findIndex(acc=> acc.username===currentAccount.username)
  console.log(index)

  //delete the user
  accounts.splice(index,1)
}


})