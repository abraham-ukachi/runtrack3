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
* @name: Jour 3 - jQuery
* @job: 01
* @day: 03
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> let runtrackApp = new RuntrackApp();
*    -|>
*    -|> runtrackApp.toast("Hello Javascript!");
*
*   2-|> // set/update a message
*    -|> runtrackApp.message = "Les logiciels...est un peu la même chose...ensuite on prie";
*
*   3-|> // toggle the message 
*    -|> runtrackApp.toggleMessage();
*
*   4-|> // check message visibility
*    -|> if (runtrackApp.isMessageHidden) {
*    -|>  console.log(`The message is hidden`);
*    -|> }
*
*   4-|> // hide all elements
*    -|> runtrackApp.hideAllElements();
*/


'use strict'; // <- Let's execute our code in strict mode. 
// ^^^^^^^ This helps me write a cleaner code by preventing me 
//         from using undeclared variables among other things ;)



// Create a class named `RuntrackApp`
class RuntrackApp {
  
  // TODO: define some constants
  // TODO: define some attributes
  // TODO: define some properties


  // public attributes

  // private fields 
  #_toastTimer;


  /**
   * Constructor of this `RuntrackApp` class.
   * NOTE: This constructor will get executed automatically 
   * whenever a new object (eg. `runtrackApp`) is created
   */
  constructor() {
    // Initialize the `message` attribute variable
    this.message = '';

    // listen to some events
    this.#_addListeners();
    
  }



  // PUBLIC SETTERS

  /**
   * Sets / updates the message with the given `value`
   *
   * @param { String } value
   */
  set message(value) {
    this.messageEl.innerHTML = value;
  }
 



  // PUBLIC GETTERS

  /**
   * Returns TRUE if the `message` is hidden
   *
   * @return { Boolean }
   */
  get isMessageHidden() {
    return this.messageEl.style.display === 'none';
  }

  /**
   * Returns the current message.
   *
   * @return { String } 
   */
  get message() {
    return this.messageEl.textContent;
  }

  /**
   * Returns the `<main id="result">` element.
   *
   * @return { Element } 
   */
  get resultEl() {
    return $('#result').get(0);
  }


  /**
   * Returns the `<p id="message">` element.
   *
   * @return { Element } 
   */
  get messageEl() {
    return $('#message').get(0);
  }


  /**
   * Returns the `<aside id="drawer">` element.
   *
   * @return { Element } 
   */
  get drawerEl() {
    return $('#drawer').get(0);
  }
  

  /**
   * Returns the `<div id="handle">` element.
   *
   * @return { Element } 
   */
  get handleEl() {
    return $('#handle').get(0);
  }


  /**
   * Returns the `<div id="toast">` element.
   *
   * @return { Element } 
   */
  get toastEl() {
    return $('#toast').get(0);
  }


  /**
   * Returns the `<button id="toggleMessageButton">` element.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * @return { Element } 
   */
  get toggleMessageButtonEl() {
    return $('#toggleMessageButton').get(0);
  }


  /**
   * Returns the `<button id="hideAllButton">` element.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * @return { Element } 
   */
  get hideAllButtonEl() {
    return $('#hideAllButton').get(0);
  }


  // PUBLIC METHODS
  
  /**
   * Toggles the `message`.
   * This method shows or hides the message in `messageEl`, 
   * depending on it's current visibility.
   *
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   */
 toggleMessage() {
  $(this.messageEl).toggle();
 }

  /**
   * Hides all the HTML Elements.
   * WARNING: You might want to refresh your page after #LOL
   *
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   */
  hideAllElements() {
    $('*').hide();
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
   * NOTE: This method uses jQuery selectors as per project requirement.
   * 
   * @private
   */
  #_addListeners() {
    
    // Adding some click event listeners...:


    // ... to `drawerEl`
    $(this.drawerEl).on('click', (event) => this.#_onDrawerClickHandler(event));
    // ... to `handleEl`
    $(this.handleEl).on('click', (event) => this.#_onHandleClickHandler(event));
    // ... to `toggleMessageButtonEl`
    $(this.toggleMessageButtonEl).on('click', (event) => this.#_onToggleMessageButtonClickHandler(event));
    // ... to `hideAllButtonEl`
    $(this.hideAllButtonEl).on('click', (event) => this.#_onHideAllButtonClickHandler(event));

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
   * Handler that is called whenever the `<button id="toggleMessageButton">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onToggleMessageButtonClickHandler(event) {
    // Run the `toggleMessage()` method, to hide or show the `message`
    this.toggleMessage();

    // If the message is hidden...
    if (this.isMessageHidden) {
      // ...toast a message to confirm this fact
      this.toast("Message is <span>hidden</span>");

    }else { // <- message is not hidden
      // toast another message to confirm this fact ;)
      this.toast("Message is <span>visible</span>");
    }
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[#_onToggleMessageButtonClickHandler]: isMessageHidden ? ${this.isMessageHidden} & event => `, event);
  }



  /**
   * Handler that is called whenever the `<button id="hideAllButton">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onHideAllButtonClickHandler(event) {
    // Run the `hideAllElements()` method, to hide all the HTML Elements
    this.hideAllElements();
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[#_onHideAllButtonClickHandler]: event => `, event);
  }  

}; // <- End of `RuntrackApp` class





/**
 * Let's wait for our document / current page to be ready ;)
 */
$(document).ready(() => {
  // Create an object of the `RuntrackApp` class as `runtrackApp` 
  // Make it a global variable
  window.runtrackApp = new RuntrackApp();

  // Set/update the message to the project-specific "text" 
  runtrackApp.message = `Les logiciels et les cathédrales, \
  c'est <strong>un peu la même chose</strong> - d'abord on les construit, ensuite on prie`;

  // runtrackApp.toast("Hello, Javascript!", 5000);

  // Do something else/more, when the window is done loading 

});

