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
* @name: Jour 4 - Fetch
* @job: 01
* @day: 04
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> let runtrackApp = new RuntrackApp();
*    -|>
*    -|> runtrackApp.toast("Hello Javascript!");
*
*   2-|> // fetch my motto from a text file named "expression"
*    -|> runtrackApp.fetchMotto("expression.txt");
*
*   3-|> // show any motto 
*    -|> runtrackApp.showMotto("Be amazing like Nicolas!");
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
  
  
  // PUBLIC METHODS
 

  /**
   * Method used to fetch or retrieve our motto from the specified `file`.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   * 
   * @param { String } file
   * @return { String } motto 
   */
  async fetchMotto(file = 'expression.txt') {
    // Initialize the `motto` variable
    let motto = '';

    // fetch the resource of the given `file`
    let resource = await fetch(file);

    // Update our `motto` with the text from `resource`
    motto = await resource.text();

    // Show this `motto`
    this.showMotto(motto);

    // toast a message that confirms this fetch
    this.toast(`<code>200</code> Motto <span>fetched</span> !`);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[fetchMotto] motto => \x1b[35m${motto}\x1b[0m`);

    // return `motto`
    return motto;
  }


  /**
   * Displays a motto in the `outputEl`
   *
   * @param { String } motto
   */
  showMotto(motto) {
    // Do nothing if theres' no motto
    if (!motto) { return }

    // IDEA: Let's try to follow the inscructions to the letter, this time! #LOL

    // But first, remove any child in `outputEl`
    if (this.outputEl.children.length) { this.outputEl.firstElementChild.remove() }


    // 1. Fetch my motto 
    //let motto = "I'll always do <strong>more</strong>"; // this.fetchMotto();

    // 1. Create a paragraph as `p`
    let p = document.createElement('p');
    
    // 3. Insert our motto into `p`
    p.innerHTML = motto;

    // 4. Append our `p` into the `outputEl`
    this.outputEl.appendChild(p);
 

  }

 
  /* =================== */

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
    // Fetch the motto
    this.fetchMotto();

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



