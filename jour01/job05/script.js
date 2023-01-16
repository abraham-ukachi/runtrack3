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
* @job: 05
* @day: 01
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> ???
*/


'use strict'; // <- Let's execute our code in strict mode. 
// ^^^^^^^ This helps me write a cleaner code by preventing my from using undeclared variables ;)



// Initialize the `weekDaysData` variable to an empty object
var weekDaysData = {};
// Initialize the `jourssemaines` variable to an empty list/array
var jourssemaines = [];


// Add a list of week days in ENGLISH to `weekDaysData`
weekDaysData['en'] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Add a list of week days in FRENCH to `weekDaysData`
weekDaysData['fr'] = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

// Add a list of week days in RUSSIAN to `weekDaysData`
weekDaysData['ru'] = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

// Add a list of week days in SPANISH to `weekDaysData`
weekDaysData['es'] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];








/**
 * Prints to console all the days of the week in the `jourssemaines` list/array
 */
var afficherjourssemaines = () => {
  for (let index = 0; index < jourssemaines.length; index++) {
    // Get the day of the week from `jourssemaines` as `dayOfWeek`
    let dayOfWeek = jourssemaines[index];

    // Display the `dayOfWeek` in console
    console.log(`\x1b[32m[afficherjourssemaines]: dayOfWeek => \x1b[0;2;35m${dayOfWeek}\x1b[0m`);
  }
}


/**
 * Function used to dynamically display a list of week days based on the currently
 * selected language from `<select id="languages">` element.
 *
 * NOTE: This function uses the job-specific `afficherjourssemaines()` function & `jourssemaines` list.
 *       A bit redundant I know, but "them's the rules!!!" :)
 */
var showWeekDays = () => {
  // Get the `<select id="languages">` and `<ul id="output">` elements
  // as `languagesSelectEl` and `outputEl` respectively
  let languagesSelectEl = document.getElementById('languages');
  let outputEl = document.getElementById('output');

  // Get the value of `languagesSelectEl` as `lang`
  let lang = languagesSelectEl.value; // <- returns eg.: 'en', 'fr', 'ru' or 'es'

  // IDEA: Use this `lang` to retrieve the corresponding / appropriate  list of week days

  // Update the project-specific `jourssemaines` list
  jourssemaines = weekDaysData[lang];

    
  // Print the week days to console 
  afficherjourssemaines();


  // Showing the week days in the `outputEl` too...
  
  // First, reset the inner HTML content of `outputEl`
  outputEl.innerHTML = '';

  for (let index = 0; index < jourssemaines.length; index++) {
    // create a `li` element
    let li = document.createElement('li');
    // Set the inner HTML of `li`
    li.innerHTML = `index (${index}): <strong>${jourssemaines[index]}</strong>`;
    // Apppend this `li` to `outputEl`
    outputEl.appendChild(li);
  }
  
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

