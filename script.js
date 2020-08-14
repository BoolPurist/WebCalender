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

// When the user loads the page. The month of the today date is displayed.
setTodayDate();

// Checks if a year is a leap year.
function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// Main routine for building the shown month.
function showMonth() {
  // List of days is all the days as boxes that represent a month
  const dayList = document.getElementById("daylist");

  // Deleting all day boxes.
  while (dayList.firstChild != null) {
    dayList.removeChild(dayList.lastChild);
  }

 
  // Removes the error message in case the user gave a not valid value before. 
  const unvalidYear = document.getElementById("unvalidYear");

  // Checking if an error message is there to be removed.
  if (unvalidYear !== null) {
    wrapper.removeChild(unvalidYear);
  }

  // Get the current entered year as a whole number.
  let currentYear = document.getElementById("yearInput");
  currentYear = currentYear.value.trim();  
  
  const messageAskforPositiveNumber = "Please enter a positive number for the year !"; 

  // Check if the field year is empty.
  if (currentYear === "") {
    appendErrorMessageToCalender(messageAskforPositiveNumber);
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
    appendErrorMessageToCalender(messageAskforPositiveNumber);
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
  if (leapYear(currentYear)) {
    numbersOfDaysPerMonth[1] = 29;
  } else {
    numbersOfDaysPerMonth[1] = 28;
  }

  // Get the first weekday of the month. From that day the counting starts. 
  // From monday to tuesday etc ... .
  const fristWeekday = new Date(currentYear, currentMonth);
  let currentWeekday = fristWeekday.getDay();

  // the container of the day boxes.
  const dayList = document.getElementById("daylist");
  // Start building the day boxes.
  for (let i = 1; i <= numbersOfDaysPerMonth[currentMonth]; i++) {
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
  unvalidYear = document.createElement("div");
  unvalidYear.id = "unvalidYear";
  unvalidYear.innerText = errorMessage;
  wrapper.appendChild(unvalidYear);    
  return;
}