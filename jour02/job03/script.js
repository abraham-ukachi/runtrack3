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
* @name: Jour 2 - JS++
* @job: 03
* @day: 02
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> let runtrackApp = new RuntrackApp();
*    -|>
*    -|> runtrackApp.toast("Hello Javascript!");
*
*   2-|> // increment the displayed number by 1 
*    -|> runtrackApp.addone();
*
*   3-|> // Get the current count number
*    -|> let count = runtrackApp.getCurrentCount();
*    -|> console.log(`count => ${count}`);
*/


'use strict'; // <- Let's execute our code in strict mode. 
// ^^^^^^^ This helps me write a cleaner code by preventing me 
//         from using undeclared variables among other things ;)



// Create a class named `RuntrackApp`
class RuntrackApp {
  
  // TODO: define some constants
  // TODO: define some attributes
  // TODO: define some properties

  // private fields 
  #_toastTimer;


  /**
   * Constructor of this `RuntrackApp` class.
   * NOTE: This constructor will get executed automatically 
   * whenever a new object (eg. `runtrackApp`) is created
   */
  constructor() {
    // Intialize our private `count` field to 0. 
    this.#count = 0;

    // listen to some events
    this.#_addListeners();
    
  }



  // PUBLIC SETTERS


  // PUBLIC GETTERS

  /**
   * Returns the `<main id="result">` element.
   *
   * @return { Element } 
   */
  get resultEl() {
    return document.getElementById('result');
  }


  /**
   * Returns the `<div id="output">` element.
   *
   * @return { Element } 
   */
  get outputEl() {
    return document.getElementById('output');
  }


  /**
   * Returns the `<aside id="drawer">` element.
   *
   * @return { Element } 
   */
  get drawerEl() {
    return document.getElementById('drawer');
  }
  

  /**
   * Returns the `<div id="handle">` element.
   *
   * @return { Element } 
   */
  get handleEl() {
    return document.getElementById('handle');
  }


  /**
   * Returns the `<div id="toast">` element.
   *
   * @return { Element } 
   */
  get toastEl() {
    return document.getElementById('toast');
  }


  /**
   * Returns the `<button id="button">` element.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * @return { Element } 
   */
  get buttonEl() {
    return document.getElementById('button');
  }

  /**
   * Returns the document's `<p id="compteur">` element.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * @return { Element } 
   */
  get compteurEl() {
    return document.getElementById('compteur');
  }
  

  // PUBLIC METHODS
  

  /**
   * Adds 1 to the `count`.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   */
  addone() {
    this.#count += 1;

    // DEBUG [4dbsmaster]: tell me about it;
    console.log(`\x1b[32m[addone] (+1): current count number is \x1b[35m${this.getCurrentCount()}\x1b[0m`);
  }

  /*
   * Returns the current `count` number
   *
   * @return { Number } 
   */
  getCurrentCount() {
    return this.#count;
  }
  
  /*
   * Toggles the Drawer.
   * This function toggles the 'opened' attribute of `drawerEl`.
   */
  toggleDrawer() {
     // Toggle the 'opened' attribute of `drawerEl`
     this.drawerEl.toggleAttribute('opened');
   }
   

  /**
   * Displays the given `message` at the specified `timeout`
   *
   * @param { String } message - The message to display
   * @param { Number } timeout - The timeout in milliseconds
   *
   */
  toast(message = "<code>👋</code> Hello <span>JavaScript</span> !", timeout = 2000) {
    // clear any active toast timer
    clearTimeout(this.#_toastTimer);
    
    // Set the toast message
    this.#_toastMessage = message;

    // Show the toast
    this.#_showToast();
    
    // Create a new toast timer, to hide the toast message after the specified `timeout`
    this.#_toastTimer = setTimeout(() => this.#_hideToast(), timeout);
    
  }



  
  // PRIVATE SETTERS
 
  /**
   * Updates the number or textContent of `compteurEl` with the given `value`
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * @param { Number } value
   */
  set #count(value) {
    this.compteurEl.textContent = value.toString();
  }


  /**
   * Sets the toast message to the given `messageHTML`.
   *
   * @param { String } messageHTML
   * @private
   */
  set #_toastMessage(messageHTML) {
    this.toastEl.innerHTML = messageHTML;
  }





  // PRIVATE GETTERS


  /**
   * Returns the current count number.
   * NOTE: This is the textContent of `computerEl`
   *
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * @return { Number } 
   */
  get #count() {
    return parseInt(this.compteurEl.textContent);
  }


  /**
   * Returns the toast message. 
   *
   * @return { String } toastMessage - The trimmed textContent of `toastEl`
   * @private 
   */
  get #_toastMessage() {
    return this.toastEl.textContent.trim();
  }

  


  // PRIVATE METHODS
 



  /**
   * Method used to listen to events fired 
   * by the main elements of this page or window.
   * 
   * @private
   */
  #_addListeners() {
    
    // Adding some click event listeners...:
    
    // ... to `drawerEl`
    this.drawerEl.addEventListener('click', (event) => this.#_onDrawerClickHandler(event));
    // ... to `handleEl`
    this.handleEl.addEventListener('click', (event) => this.#_onHandleClickHandler(event));
    // ... to `buttonEl`
    this.buttonEl.addEventListener('click', (event) => this.#_onButtonClickHandler(event));
  }


  /**
   * Shows the toast element.
   * This method removes the `hidden` property of `toastEl` by setting it to FALSE
   *
   * @private
   */
  #_showToast() {
    this.toastEl.hidden = false;
  }


  /**
   * Hides the toast element.
   * This method adds the `hidden` property of `toastEl` by setting it to TRUE
   *
   * @private
   */
  #_hideToast() {
    this.toastEl.hidden = true;
  }


  /**
   * Handler that is called whenever the `<aside id="drawer">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onDrawerClickHandler(event) {
    // Check if the drawer element (i.e. `drawerEl`) is opened using...
    // ...you guessed it ! "A TERNARY STATMENT !!!" ;)
    let isOpened = this.drawerEl.hasAttribute('opened') ? true : false;

     // Do nothing if `drawerEl` is already opened.
    if (isOpened) { return }

    // Open the drawer by setting or adding a 'opened' attribute.
    this.drawerEl.setAttribute('opened', '');

    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2m[#_onDrawerClickHandler](1): drawerEl => `, this.drawerEl);
    console.log(`\x1b[2m[#_onDrawerClickHandler](2): event => `, event);
  
  }


  /**
   * Handler that is called whenever the `<div id="handle">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onHandleClickHandler(event) {
     // Stop Propagation of the event
     event.stopPropagation();

    // Toggle the drawer
    this.toggleDrawer();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2m[#_onHandleClickHandler]: event => `, event);
  }


  /**
   * Handler that is called whenever the `<button id="button">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onButtonClickHandler(event) {
    // Run the project-specific `addone()` method, 
    // to increment the `count` or number in `compteurEl` by 1.
    this.addone();
    
    // toast a message that confirms this action
    this.toast(`<code>${this.getCurrentCount()}</code> Number has been increased by <span>1</span>`);
  
  }



  

}; // <- End of `RuntrackApp` class






/**
 * Let's wait for our window / current page to load ;)
 * NOTE: This should make sure our document is ready; kinda like `$(document).ready()` on JQuery #LOL
 */
window.onload = (event) => {
  // Create an object of the `RuntrackApp` class as `runtrackApp` 
  // Make it a global variable
  window.runtrackApp = new RuntrackApp();

  /* runtrackApp.toast("Hello, Javascript!", 5000); */
  
  // Do something else/more, when the window is done loading 
  
};



