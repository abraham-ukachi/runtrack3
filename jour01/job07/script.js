/* 
* @license
* runtrack3
* Copyright (c) 2023 Abraham Ukachi
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*
* @project: runtract3
* @name: Jour 1 - Hello JS
* @job: 07
* @day: 01
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> ???
*/


'use strict'; // <- Let's execute our code in strict mode. 
// ^^^^^^^ This helps me write a cleaner code by preventing me 
//         from using undeclared variables among other things ;)


/**
 * Create a holiday object as `holidayObj`.
 * This object contains an id/key, name and date of all current holidays.
 * According to [FRANCE PUBLIC HOLIDAYS 2023]('https://publicholidays.fr/2023-dates/'), 
 * There are currently 11 public holidays in France.
 *
 * NOTE: - Date format is "day,month" (eg.: "1,0" => "1st January")
 *       - Good Friday and St Stephen's Day are observed in Alsace and Moselle only
 *       - There are obv. simpler ways to tackle this problem, but where's the fun in that :)
 */
const holidayObj = {
  "newYear": { date: "1,0", name: "New Year's Day" },
  "goodFriday": { date: "7,3", name: "Good Friday" },
  "easterMonday": { date: "10,3", name: "Easter Monday" },
  "labourDay": { date: "1,4", name: "Labour Day" },
  "victoryDay": { date: "8,4", name: "Victory Day" },
  "ascensionDay": { date: "18,4", name: "Ascension Day" },
  "whitSunday": { date: "28,4", name: "Whit Sunday" },
  "whitMonday": { date: "29,4", name: "Whit Monday" },
  "bastilleDay": { date: "14,6", name: "Bastille Day" },
  "assumptionDay": { date: "15,7", name: "Assumption Day" },
  "allSaintsDay": { date: "1,10", name: "All Saint's Day" },
  "armisticeDay": { date: "11,10", name: "Armistice Day" },
  "christmasDay": { date: "25,11", name: "Christmas Day" },
  "stStephenDay": { date: "26,11", name: "St Stephen's Day" }
};

// Create a list of all the days in a week as `weekDays` 
const weekDays = [
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday', 
  'Friday', 
  'Saturday', 
  'Sunday'
];


// Create a list of all the months in a year as `months`
const months = [
  'January', 
  'February', 
  'March', 
  'April', 
  'May', 
  'June', 
  'July', 
  'August', 
  'September', 
  'October',
  'November',
  'December'
];

/**
 * Returns the holiday name of the specified `date`
 *
 * @param { String } date - A specific day/month date string (e.g. '1,0' for 1st January)
 *
 * @return { String } holidayName
 */
var getHolidayNameByDate = (date) => {
  // Initialize the `holiday` variable
  let holidayName = '';
  
  // For each holiday in `holidayObj`...
  // TODO: Use every method instead
  Object.keys(holidayObj).forEach((holiday) => {
    // ...find the date in `holidayObj`
    let foundDate = (holidayObj[holiday].date == date) ? true : false;

    // If the current date in `holidayObj` matches the given `date`...
    if (foundDate) {
      // ...update the `holidayName`
      holidayName = holidayObj[holiday].name;
    }


    // DEBUG [4dbsmaster]: tell me about it ;)
    // console.log(`\x1b[39m[getHolidayNameByDate](2): foundDate ? ${foundDate} & date => ${date}\x1b[0m`);
    // console.log(`\x1b[39m[getHolidayNameByDate](3): holiday => ${holiday} &  holidayName =>  ${holidayName}\x1b[0m`);
    // console.log(`\x1b[39m[getHolidayNameByDate](4): holidayObj => \x1b[0m`, holidayObj);

  });
  

  // DEBUG [4dbsmaster]: tell me about it ;)
  // console.log(`\x1b[39m[getHolidayNameByDate](1): holidayName => ${holidayName}\x1b[0m`);

  // Return `holidayName`
  return holidayName;
};

/**
 * Checks if the given `date` is a public holiday in France. 
 * NOTE: This function prints a message to the browser's console
 *
 * @param { String } date - Any date string
 *
 * @return { Object } message
 */
var jourtravaille = (date = '2023-01-17') => {
  // Create a date object of the given `date` as `dateObj`
  let dateObj = new Date(date);

  // Get the year from `dateObj` as `year`
  let year = dateObj.getFullYear(); // <- returns eg.: 2023 (Number)

  // Get the week day from `dateObj` as `weekDay`
  let weekDay = dateObj.getDay(); // <- returns eg.: 2 (Number) for 'Tuesday'
  
  // Get the month from `dateObj` as `month`
  let month = dateObj.getMonth(); // <- returns eg.: 0 (Number) for 'January'

  // Get the actual day of the month from `dateObj` as `d`
  let d = dateObj.getDate(); // <- returns eg.: 17 (Number) for '17th'
   
  
  // Now, get the string value of `weekDay` and `month` as `weekDayStr` and `monthStr` respectively.
  let weekDayStr = weekDays[weekDay == 0 ? 6 : weekDay - 1]; // <- returns eg.: "Monday" (String) if `weekday` is 1
  let monthStr = months[month]; // <- returns eg.: "January" (String) if month is 0
  
  // Generate the full date string as `fullDateString` to be reused ;)
  let fullDateString = `${weekDayStr} ${d} ${monthStr} ${year}`; // <- returns eg.: "Friday 25 July 2023" 

  
  // Initialize the `message` variable 
  // by setting it to an object which includes `text` & `html` keys w/ empty value strings.
  let message = { text: '', html: '' };
  

  // Run some checks...

  // Check if the given date is today,
  // Using our beloved ternary statement
  let isToday = (dateObj.toLocaleDateString() === (new Date()).toLocaleDateString()) ? true : false;
  
  // Check if the given `date` is on a weekend
  let isWeekend = ((weekDay === 6) || (weekDay === 0)) ? true : false;

  // Format the date to something like: '1,0' (for the 1st January);
  let formattedDate = `${d},${month}`; 


  /*
   * Check if the given `date` is on a holiday. #oneLiner ;)
   * But, without our a complete ternary statement usage :(
   *
   * IDEA: The formatted date (i.e "day,month" / "${d},${month}") must be in `holidayObj` (i.e. not -1)
   */
  let isHoliday = Object.keys(holidayObj).map((holiday) => holidayObj[holiday].date).indexOf(formattedDate) !== -1;

  // Updating the `message...
  
  // If the given `date` is on a weekend...
  if (isWeekend) {
    // ...update the `message` accordingly
    message.text = `Nope, ` + (isToday ? ' Today - ' : '') +`${fullDateString} - is a weekend 😢`;
    message.html = `<strong>Nope,</strong>&nbsp;` + (isToday ? ' Today - ' : '') +`<b>${fullDateString}</b> - is a weekend 😢`;
    
  }else { // <- not a weekend
    

    // If the given `date` is on a holiday...
    if (isHoliday) {
      // ...get the name of the holiday as `holidayName`
      let holidayName = getHolidayNameByDate(formattedDate); 

      // Update the `message` accordingly
      message.text = `Hooray!!! ` + (isToday ? ' Today - ' : '') +`${fullDateString} - is a public holiday (${holidayName}) in France 🥳🎊😀🎉`;
      message.html = `<strong>Hooray!!!</strong>&nbsp;` + (isToday ? ' Today - ' : '') +`<b>${fullDateString}</b> - is a public holiday (${holidayName}) in France 🥳🎊😀🎉`;

    }else { // <- not a weekend and not a holiday, therefore it is a working day!
      // So, update the `message` accordingly
      message.text = `Yep, `+ (isToday ? ' Today - ' : '') + `${fullDateString} - is a working day in France 🤨`;
      message.html = `<strong>Yep,</strong>&nbsp;` + (isToday ? ' Today - ' : '') +`<b>${fullDateString}</b> - is a working day in France 🤨`;
    }

  
  }

  
  // Print the text version of `message` to the browser's console
  console.log(`\n\x1b[35m${message.text}\x1b[0m\n\n`);


  // DEBUG [4dbsmaster]: tell me about all of this ;)
  console.log(`\x1b[32m[jourtravaille](1): \
    year => ${year} & weekDay => ${weekDay} & month => ${month} \x1b[0m`);
  console.log(`\x1b[32m[jourtravaille](2): \
    d => ${d} & weekDayStr => ${weekDayStr} & monthStr => ${monthStr} \x1b[0m`);
  console.log(`\x1b[32m[jourtravaille](3): fullDateString => ${fullDateString} \x1b[0m`);
  console.log(`\x1b[32m[jourtravaille](4): \
  isToday ? ${isToday} & isWeekend ? ${isWeekend} & isHoliday ? ${isHoliday} \x1b[0m`);
  
  // Return the `message` object
  return message;
   
};



/**
 * Handler that is called whenever the `<button id="holidayChecker">` element is clicked.
 *
 * @param { Element } holidayCheckerEl
 */
var handleHolidayCheckerClick = (holidayCheckerEl) => {
  // Get the  previous sibling element (i.e. `<input id="date">`) from `holidayCheckerEl` as `dateEl`
  let dateEl = holidayCheckerEl.previousElementSibling;
  let outputEl = document.getElementById('output');

  // Retrieve the actual date value from `dateEl`
  let date = dateEl.value;

  // Check if this `date` is a holiday, 
  // and get the corresponding html version of the `message` as `messageHTML`,
  // using our project-specific `jourtravaille()` function 
  let messageHTML = jourtravaille(date).html;

  // Display the `messageHTML` in the `outputEl`
  outputEl.innerHTML = `<li>${messageHTML}</li>`;

  // DEBUG [4dbsmaster]: tell me about it ;)
  console.log(`\x1b[36m[handleHolidayCheckerClick](1): date => ${date} & dateEl => \x1b[0m`, dateEl);
  console.log(`\x1b[36m[handleHolidayCheckerClick](2): messageHTML => ${messageHTML} \x1b[0m`);
  
};



/*
 * Handler that is called whenever the `<aside>` element is clicked or tapped.
 *
 * @param { PointerEvent } event
 * @param { Element } asideEl
 */
var handleAsideClick = (event, asideEl) => {
  // Get the aside eleemnt as `asideEl`
  // let asideEl = event.target;

  // Check if the aside element is opened using...
  // ...you guessed it ! "A TERNARY STATMENT !!!"
  let isOpened = asideEl.hasAttribute('opened') ? true : false;
   // Do nothing if the aside element is already opened.
  if (isOpened) { return }

   // Open the aside / drawer by setting or adding a 'opened' attribute.
  asideEl.setAttribute('opened', '');
  // DEBUG [4dbsmaster]: tell me about it :)
  // console.log(`[handleAsideClick]: asideEl => `, asideEl);
  
 };
  

/*
 * Toggles the Drawer 
 * This function toggles the 'opened' attribute of `<aside id="drawer">`.
 */
var toggleDrawer = (event) => {
   // Stop Propagation of the event
   event.stopPropagation();
   
   // Get the drawer element as `drawerEl`
   let drawerEl = document.getElementById('drawer');
    // Toggle the 'opened' attribute of `drawerEl`
   drawerEl.toggleAttribute('opened');
    // DEBUG [4dbsmaster]: tell me about it :)
   // console.log(`[toggleDrawer](1): drawerEl => `, drawerEl);
   // console.log('[toggleDrawer](2): event => ', event);
 };

