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
* @job: 06
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
 * A function used to print numbers ranging between 1 and 151 to the console, 
 * while replacing a few numbers with "Fizz", "Buzz" or "FizzBuzz", based on the following 3
 * project-specified conditions:
 *
 * Condition #1: If the number is a multiple of 3, display “Fizz”.
 * Condition #2: If the number is a multiple of 5, display “Buzz”.
 * Condition #3: If the number is a multiple of 3 and 5, display “FizzBuzz”.
 *
 * NOTE: This function also prints/display the number in `<ol id="output">` element.
 */
var fizzbuzz = () => {
  // Get the `<ol id="output">` element as `outputEl`
  let outputEl = document.getElementById('output');

  // Initialize the `currentNumber` to 0
  let currentNumber = 0;

  // Reset the inner HTML content of `outputEl`
  outputEl.innerHTML = '';


  // Using a do...while statement...
  do {
    // ...increase/increment the `currentNumber` by 1
    currentNumber += 1;

    // IDEA: Assign 'Fizz', 'Buzz' or 'FizzBuzz' to the `result` variable, 
    //       following the above conditions.


    // Using our beloved ternary statement...
    
    // check if the current number is divisible by 3 as `isDivisibleBy3`
    let isDivisibleBy3 = (currentNumber % 3 === 0) ? true : false;

    // check if the current number is divisible by 3 as `isDivisibleBy5`
    let isDivisibleBy5 = (currentNumber % 5 === 0) ? true : false;


    // Get the dynamic/mixed result 
    // (see condition above, to better understand this ternary statement application ;))
    let result = (isDivisibleBy3 && isDivisibleBy5) ? 'FizzBuzz' : 
      ((isDivisibleBy3) ? 'Fizz' : 
      ((isDivisibleBy5) ? 'Buzz' : currentNumber));


    // Print only the result to console ;)
    console.log(`\x1b[32m[fizzbuzz]: result => \x1b[0;2;35m${result}\x1b[0m`);

    // DEBUG [4dbsmaster]: tell me about the result
    console.log(`\x1b[34m[fizzbuzz](1): currentNumber => ${currentNumber}`);
    console.log(`\x1b[34m[fizzbuzz](2): isDivisibleBy5 ? ${isDivisibleBy5}`);
    console.log(`\x1b[34m[fizzbuzz](3): isDivisibleBy3 ? ${isDivisibleBy3}`);

    // create a `li` element
    let li = document.createElement('li');
    // Set the inner HTML of `li`
    li.innerHTML = `currentNumber (${currentNumber}): <strong>${result}</strong>`;
    // Apppend this `li` to `outputEl`
    outputEl.appendChild(li);


  } while (currentNumber < 151); // <- while the `currentNumber` is less than 151...

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

