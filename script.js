const numbersOfDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Elements that change the date. Here they get the events attached.
// Id "showButton": Button to click to show the current month of today.
document
  .getElementById("showButton")
  .addEventListener("click", setTodayDate, false);
// Id "month": the drop down list to choose the month.
document.getElementById("monthSelector").addEventListener("change", showMonth, false);
// Id "year": field in which the year as number is entered.
document.getElementById("yearInput").addEventListener("input", showMonth);

// wrapper is the container of all objects of the website.
const wrapper = document.getElementById("calender");
const containerForCalenderWeeks = document.getElementById("calenderWeeks");

// When the user loads the page. The month of the today date is displayed.
setTodayDate();

// Checks if a year is a leap year.
function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// Main routine for building the shown month.
function showMonth() {
  // List of days is all the days as boxes that represent a month
  const dayList = document.getElementById("dayList");

  // Deleting all day boxes.
  while (dayList.firstChild != null) {
    dayList.removeChild(dayList.lastChild);
  }

 
  // Removes the error message in case the user gave a not valid value before. 
  const invalidYear = document.getElementById("invalidYear");

  // Checking if an error message is there to be removed.
  if (invalidYear !== null) {
    wrapper.removeChild(invalidYear);
  }

  // Get the current entered year as a whole number.
  let currentYear = document.getElementById("yearInput");
  currentYear = currentYear.value.trim();  
  
  const messageAskForPositiveNumber = "Please enter a positive number for the year !"; 

  // Check if the field year is empty.
  if (currentYear === "") {
    appendErrorMessageToCalender(messageAskForPositiveNumber);
    return;
  }
  // Checks if the field year not only digits. The field should only have digits.
  else if (isNaN(currentYear) === true) {
    appendErrorMessageToCalender("A year must be made of digits !");
    return;
  }
  
  currentYear = parseInt(currentYear);

  // Checks if the input field for year has a negativ number
  if (currentYear < 0) {
    appendErrorMessageToCalender(messageAskForPositiveNumber);
    return;
  }
  
  // Get the current month from the drop down list.
  let currentMonth = document.getElementById("monthSelector");
  currentMonth = currentMonth.value;
  currentMonth = parseInt(currentMonth);

  createMonth(currentYear, currentMonth);
}

// Builds the month with its days as day boxes.
function createMonth(currentYear, currentMonth) {
  const daysOfMonth = getDaysPerMonth(currentYear, currentMonth);
  
  // Get the first weekday of the month. From that day the counting starts. 
  // From monday to tuesday etc ... .
  const fristWeekday = new Date(currentYear, currentMonth);
  let currentWeekday = fristWeekday.getDay();

  // the container of the day boxes.
  const dayList = document.getElementById("dayList");
  // Start building the day boxes.
  for (let i = 1; i <= daysOfMonth; i++) {
    let currentDay = document.createElement("div");
    // Class "day": How a box for a day looks like. 
    // A Day box shows the number of the day in the month and which weekday it is.
    currentDay.classList.add("day");
    // Write the respective week day to the current day.
    currentDay.innerText = `${i}\n${translateDayNumberToName(currentWeekday)}`;
    // Attach day box to the calender.
    dayList.appendChild(currentDay);
    // A week has only 7 days. So the range is from 0 to 6 as values in numbers for a weekday.
    currentWeekday = (currentWeekday + 1) % 7;
  }

  createCalenderWeeks(currentYear, currentMonth);
}


// returns a array of strings. Each string is line showing a calender week with the start date and end date
function createCalenderWeeks(currentYear, currentMonth) {

  const calenderWeeks = [];
  let currentIndexForWeek = -1;
  let currentDateString = "";
  let currentDate = new Date(currentYear, currentMonth, 1);
  
  const printToDate = () => ` => ${dateToString(currentDate)}`;
  const printFromDate = () => ` ${dateToString(currentDate)}`;
  const printCW = () => `${currentIndexForWeek}. CW`;
  
  
  const currentDay = currentDate.getDay();
  
  currentIndexForWeek = getCW(currentDate);
  console.log(getCW(currentDate));
  currentDateString += printCW();
  currentIndexForWeek %= 53;


  // Going back to last monday. Can may be end up in the previous month.
  currentDate.setDate(currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1));

  currentDateString += printFromDate();
  
  // Go to the 1. monday of this month
  currentDate.setDate(currentDate.getDate() + 6);

  currentDateString += printToDate();

  calenderWeeks.push(currentDateString);
  
  const selectedMonth = currentDate.getMonth();
  // Performs first move to next day before loop to do append the next move to the next day at the end of the loop

  currentDate.setDate(currentDate.getDate() + 1);

  do {
    currentDateString = "";
    currentIndexForWeek++;
    currentDateString += printCW();
    currentDateString += printFromDate();
    currentDate.setDate(currentDate.getDate() + 6);
    currentDateString += printToDate();
    calenderWeeks.push(currentDateString);
    // Append at the end will prevent doing loops for a first week of the next week in some cases.
    currentDate.setDate(currentDate.getDate() + 1);
  } while (selectedMonth === currentDate.getMonth())

  containerForCalenderWeeks.innerHTML = "";

  for (week of calenderWeeks) {
    const p = document.createElement("p");
    p.classList.add("calenderWeek");
    p.innerText = week;
    containerForCalenderWeeks.appendChild(p);
  }
}

// For showing the month of the month of today.
function setTodayDate() {
  // Getting the year and month of today.
  const now = new Date();
  let nowMonth = now.getMonth();
  let nowYear = now.getFullYear();

  // Setting up the drop down list for month and input text field for the year.
  document.getElementById("monthSelector").value = nowMonth;
  document.getElementById("yearInput").value = nowYear;

  showMonth();
}

// Translates a number from 0 to 6 into its respective weekday.
function translateDayNumberToName(day) {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";

    default:
      // Something went wrong !! Should not happen.
      console.Error("Weekday could not be assigned !");
  }
}

// Appends an error message to the place where usually the days of a month 
// are shown. The message tells the user how to enter a valid value in the 
// input box for the year.
function appendErrorMessageToCalender(errorMessage) {
  invalidYear = document.createElement("div");
  invalidYear.id = "invalidYear";
  invalidYear.innerText = errorMessage;
  wrapper.appendChild(invalidYear);
  return;
}

function getDaysPerMonth(currentYear, currentMonth) {

  if (leapYear(currentYear)) {
    numbersOfDaysPerMonth[1] = 29;
  } else {
    numbersOfDaysPerMonth[1] = 28;    
  }

  return numbersOfDaysPerMonth[currentMonth];
}

function dateToString(date) {
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
}

function getPastDaysToDate(date) {
  let totalDays = 0;
  
  for (let i = 0; i < date.getMonth(); i++)
  {
    totalDays += getDaysPerMonth(date.getFullYear(), i);
  }

  return totalDays + date.getDate();
}

function getCW(date) {  
  // Part of the solutions comes from stack overflow 
  // Link: https://stackoverflow.com/questions/7765767/show-week-number-with-javascript
  const year = date.getFullYear();
  const firstDate = new Date(year, 0, 1); 
  const firstDay = firstDate.getDay();
  const hasNo53WeekAtStart = firstDay > 0 && firstDay < 5;
  // Added consideration of leap year and starting with 53 or 1 week according to 1. day of year.
  const weekNumber = Math.ceil((((date - firstDate) / 86400000) + firstDate.getDay() - ( leapYear(year) ? 1 : 0 ) + 1) / 7) - ( hasNo53WeekAtStart ? 0 : 1);

  return weekNumber === 0 ? 53 : weekNumber;
}