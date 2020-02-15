numbersOfDaysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// Elements that change the date. Here they get the events attached.
// Id "showButton": Button to click to show the current month of today.
document
  .getElementById("showButton")
  .addEventListener("click", setTodayDate, false);
// Id "month": the drop down list to choose the month.
document.getElementById("month").addEventListener("change", showMonth, false);
// Id "year": field in which the year as number is entered.
document.getElementById("years").addEventListener("input", showMonth);

// When the user loads the page. The month of the today date is displayed.
setTodayDate();

// Checks if a year is a leap year.
function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// Main routine for building the shown month.
function showMonth() {
  // Daylist is all the days as boxes that represent a month
  let dayList = document.getElementById("daylist");

  // Deleting all day boxes.
  while (dayList.firstChild) {
    dayList.removeChild(dayList.lastChild);
  }

  // wrapper is the container of all objects of the website.
  let wrapper = document.getElementById("wrapper");
  // Box for the error box that says that the user should only use digits.
  let unvalidYear = document.getElementById("unvalidYear");

  // Checking if an error message is there to be removed.
  if (unvalidYear !== null) {
    wrapper.removeChild(unvalidYear);
  }

  // Get the current typed year as a whole number.
  let currentYear = document.getElementById("years");
  currentYear = currentYear.value;

  // Check if the field year is empty.
  if (currentYear === "") {
    unvalidYear = document.createElement("div");
    unvalidYear.id = "unvalidYear";
    unvalidYear.classList.add("unvalidYearNoSign");
    unvalidYear.innerText = "Es wird eine Zahl für das Jahr gebraucht.";
    wrapper.appendChild(unvalidYear);
    return;
  }

  // Checks if the field year not only digits. The field should only have digits.
  if (isNaN(currentYear)) {
    unvalidYear = document.createElement("div");
    unvalidYear.id = "unvalidYear";
    unvalidYear.innerText = "Das Jahr darf nur aus Zahlen bestehen !";
    wrapper.appendChild(unvalidYear);
    return;
  }

  // Convert string to integer.
  currentYear = parseInt(currentYear);

  // Get the current month from the drop down list.
  let currentMonth = document.getElementById("month");
  currentMonth = currentMonth.value;
  currentMonth = parseInt(currentMonth);

  createMonth(currentYear, currentMonth);
}

// Build the month made of day boxes.
function createMonth(currentYear, currentMonth) {
  if (leapYear(currentYear)) {
    numbersOfDaysPerMonth[1] = 29;
  } else {
    numbersOfDaysPerMonth[1] = 28;
  }

  // Get the first weekday of the month. From that day the counting starts. From monday to tuesday etc ... .
  let fristWeekday = new Date(currentYear, currentMonth);
  let currentWeekday = fristWeekday.getDay();

  // id "daylist": the container of the day boxes.
  let dayList = document.getElementById("daylist");

  for (let i = 1; i <= numbersOfDaysPerMonth[currentMonth]; i++) {
    let currentDay = document.createElement("div");
    // Class "day": How a box for a day looks like. A Day box shows the number of the day in the month and which weekday it is.
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
  let now = new Date();
  let nowMonth = now.getMonth();
  let nowYear = now.getFullYear();

  // Setting up the drop down list for month and input text field for the year.
  document.getElementById("month").value = nowMonth;
  document.getElementById("years").value = nowYear;

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
      console.log("Weekday could not be assigned !");
  }
}
