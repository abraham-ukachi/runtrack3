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
* @job: 04
* @day: 01
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> ???
*/


'use strict'; // <- Let's execute our code in strict mode. 
// ^^^^^^^ This helps me write a cleaner code by preventing my from using undeclared variables ;)


/**
 * Returns TRUE if the given `year` is a leap year.
 *
 * @param { Number } year
 *
 * @return { Boolean } leap
 */
var bissextile = (year = 2023) => {
  // IDEA: Check if the month of February in the given `year` contains 29 days.
  // Because, if a month of February contains 29 days - it is a leap year.
  
  // Create a date object as `date`
  let date = new Date(year, 1, 29); // <- 1 = February (0 is January) & 29 = No. of days
  
  // Initialize the `leap` variable to TRUE, if `february` of the given `year` has day 29.  
  let leap = date.getDate() === 29 ? true : false

  // Return `leap`
 return leap;
};



/**
 * Checks if the value of `yearInput` element is a leap year or not.
 * NOTE: This function uses the project-required `bissextile()` function, 
 * and display's the output in the `<span id="output">` element.
 */
var checkLeapYear = () => {
  // Get the `<input id="yearInput">` element as `yearInputEl`
  let yearInputEl = document.getElementById('yearInput');
  // Get the `<span id="output">` elment as `outputEl`
  let outputEl = document.getElementById('output');


  // Get the year from `yearInputEl`
  let year = yearInputEl.value;

  // Check if `year` is a leap year with the `bissextile()` function
  let isLeapYear = bissextile(year);

  // Updating the `outputEl` accordingly...
  
  if (isLeapYear) {
    outputEl.innerHTML = `<strong>${year}</strong> is a leap year &#128512;`;
  } else {
    outputEl.innerHTML = `<strong>${year}</strong> is not a leap year &#128557;`;
  }


  // DEBUG [4dbsmaster]: tell me about it ;)
  console.log(`\x1b[31m[checkLeapYear]: year => ${year} & isLeapYear ? => ${isLeapYear} & yearInputEl => `, yearInputEl);
  

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

