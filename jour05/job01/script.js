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
* @name: Jour 5 - Projet
* @job: 01
* @day: 05
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> let runtrackApp = new RuntrackApp();
*    -|>
*    -|> runtrackApp.toast("Hello Javascript!");
*
*   2-|> //
*    -|>
*    -|> 
*
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

    // listen to some events
    this.#_addListeners();
    
  }

  
  
  // PUBLIC METHODS
 
  
  /**
   * Method used to retrieve the value of the specified `key` from the given `jsonString`
   *
   * @param { String } jsonString
   * @param { String } key
   *
   * @return { String } value 
   */
  jsonValueKey(jsonString, key) {
    // Initialize the `value` variable
    let value = '';
    
    try { // <- Let's try to get the value with `key`
       
      // Convert the `jsonString` into an actual JSON 
      let json = JSON.parse(jsonString);

      // Update the value with the given `key`
      value = json[key];
      
    } catch(exception) {  // <- failed to retrieve value
      // DEBUG [4dbsmaster]: tell me about it ;)
      console.error(`[jsonValueKey](4): Failed to get value from jsonString w/ key (${key})`);
      console.error(`[jsonValueKey](5): exception =>  `, exception);
    }
    
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2m[jsonValueKey](1): jsonString => \x1b[33m${jsonString}\x1b[0m`);
    console.log(`\x1b[2m[jsonValueKey](2): key => \x1b[33m${key}\x1b[0m & value => \x1b[33m${value}\x1b[0m`);
    console.log(`\x1b[2m[jsonValueKey](3): value => \x1b[33m${value}\x1b[0m`);
    
    
    // Return `value`
    return value;
  }

  /* =================== */

  /**
   * Closes the drawer
   */
  closeDrawer() {
    this.drawerEl.removeAttribute('opened');
  }


  /**
   * Opens the drawer
   */
  openDrawer() {
    this.drawerEl.setAttribute('opened', '');
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


  // PUBLIC SETTERS
  

  // PUBLIC GETTERS

  /**
   * Returns the `<textarea id="jsonText">` element
   *
   * @return { Element }
   */
  get jsonTextEl() {
    return document.getElementById('jsonText'); 
  }

  /**
   * Returns the `<select id="keys">` element.
   *
   * @return { Element }
   */
  get keysEl() {
    return document.getElementById('keys');
  }

  /* ================== */

  /**
   * Returns the `<main id="result">` element.
   *
   * @return { Element } 
   */
  get resultEl() {
    return document.getElementById('result');
  }


  /**
   * Returns the `<p id="output">` element.
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


    // Listening to other events...
         
    this.jsonTextEl.addEventListener('change', (event) => this.#_onJsonTextChangeHandler(event));
    // this.jsonTextEl.addEventListener('onkeyup', (event) => this.#_onJsonTextChangeHandler(event));

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
    // Get the json text from `jsonTextEl` as `jsonText`
    let jsonText = this.jsonTextEl.value;

    // Get the json key from `keysEl` as `key`
    let key = this.keysEl.value;
    
    // Get the json value of `key` from `jsonText`,
    // using the project-specific `jsonValueKey()` method
    let value = this.jsonValueKey(jsonText, key);
    
    // Set this `value` as the text content of `outputEl`
    this.outputEl.textContent = value;
    
    // Close the drawer
    this.closeDrawer();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[_onButtonClickHandler](1): jsonText => ${jsonText} & key => ${key}\x1b[0m`, event);
    console.log(`\x1b[32m[_onButtonClickHandler](2): value => ${value} & event => \x1b[0m`, event);
  }
  
  /**
   * Handler that is called whenever the value in `<textarea id="jsonText">` element changes.
   * NOTE: This event is triggered when the `textarea` looses focus.
   *
   * @param { ChangeEvent } event
   * @private
   */
  #_onJsonTextChangeHandler(event) {
    // Empty the `keysEl` 
    this.keysEl.innerHTML = '';

    // Get the value as element/target as `jsonString`
    let jsonString = event.currentTarget.value;
    
    // Get all keys from this `jsonString`
    let jsonKeys = this.#_getKeysFromJsonString(jsonString);
    
    // For each key in `jsonkeys`...
    jsonKeys.forEach((jsonKey) => {
      // ...create an option element with this `jsonKey`

      let optionEl = document.createElement('option');
      optionEl.value = jsonKey;
      optionEl.textContent = jsonKey.toUpperCase();
      
      // Append `optionEl` to `keysEl`
      this.keysEl.appendChild(optionEl);

    });
    
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[_onJsonTextChangeHandler](1): jsonString => \x1b[35m${jsonString}\x1b[0m`);
    console.log(`\x1b[34m[_onJsonTextChangeHandler](2): event => \x1b[0m`, event);
    console.log(`\x1b[34m[_onJsonTextChangeHandler](3): jsonKeys => \x1b[0m`, jsonKeys);

  }

  /**
   * Returns all the current keys in the specified `jsonString`
   *
   * @return { Array } jsonKeys
   */
  #_getKeysFromJsonString(jsonString) {
    // Initialize the `jsonKeys` variable to an empty array
    let jsonKeys = [];

    try {
      // Convert `jsonString` into a JSON object
      let jsonObj = JSON.parse(jsonString);

      // Update the `jsonKeys` by assigning all the keys from `jsonObj`
      jsonKeys = Object.keys(jsonObj);

      // Remove the 'error' class from the `jsonTextEl`
      this.jsonTextEl.classList.remove('error');
      
    } catch(exception) {
      // Reset or empty the `jsonKeys` array 
      // NOTE: not necessary, i know ;) CAN'T I HAVE SOME FUN PLSSS ??!!! #lmao #tempCode
      jsonKeys = [];

      // Add an 'error' class to the `jsonTextEl`
      this.jsonTextEl.classList.add('error');

    }


    // return `jsonKeys`
    return jsonKeys;
  }

  
 
  // PRIVATE SETTERS
 

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
   * Returns the toast message. 
   *
   * @return { String } toastMessage - The trimmed textContent of `toastEl`
   * @private 
   */
  get #_toastMessage() {
    return this.toastEl.textContent.trim();
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



