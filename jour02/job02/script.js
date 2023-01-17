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
* @job: 02
* @day: 02
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> let runtrackApp = new RuntrackApp();
*    -|>
*    -|> runtrackApp.toast("Hello Javascript!");
*
*   2-|> // show / hide the article
*    -|> runtrackApp.showhide();
*/


'use strict'; // <- Let's execute our code in strict mode. 
// ^^^^^^^ This helps me write a cleaner code by preventing me 
//         from using undeclared variables among other things ;)



// Create a class named `RuntrackApp`
class RuntrackApp {
  
  // Define some constants here

  // Define some properties and/or attributes here


  /**
   * Constructor of this `RuntrackApp` class.
   * NOTE: This constructor will get executed automatically 
   * whenever a new object (eg. `runtrackApp`) is created
   */
  constructor() {

    // listen to some events
    this._addListeners();
    
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
   * Returns the document's article element.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * @return { Element } 
   */
  get articleEl() {
    return document.querySelector('article');
  }
  

  /**
   * Returns TRUE if the `articleEl` is currently hidden  
   * (i.e. the 'hidden' boolean attribute / property has been set to `true`)
   *
   * @return { Boolean }
   */
  get isArticleHidden() {
    // IDEA: the article is hidden if it exists and it's `hidden` property has been set to TRUE.
    return (this.hasArticle && this.articleEl.hidden == true) ? true : false;
  }
  

  /**
   * Returns TRUE if `articleEl` exists in our page.
   * 
   * @return { Boolean }
   */
  get hasArticle() {
    // IDEA: the article exists
    return (this.articleEl !== null) ? true : false;
  }

  // PUBLIC METHODS

  /**
   * Shows or hides the article element.
   * NOTE: This method creates and `article` element inside `outputEl` (if it doesn't already exists)
   */
  showhide() {
    // Initialize the `messageHTML` variable
    let messageHTML = "L'important n'est pas la chute, mais l'atterrissage.";

    // Let's make sure we've got an article element first, shall we?

    // If there's no `articleEl`...
    if (!this.hasArticle) {
      // ...create an `article` node as `articleNode`
      let articleNode = document.createElement('article');
      // put the `messageHTML` in our `articleNode`
      articleNode.innerHTML = messageHTML;
      // append this `articleNode` to our `outputEl`
      this.outputEl.appendChild(articleNode);
      // Initialy, hide the `articleEl` by setting `hidden` to true
      this.articleEl.hidden = true;
    }
  
    // IDEA: At this point, we must have an article. 
    // Now, we just wanna toggle it's `hidden` boolean attribute.
    this.articleEl.hidden = !this.articleEl.hidden;
    
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
    clearTimeout(this._toastTimer);
    
    // Set the toast message
    this._toastMessage = message;

    // Show the toast
    this._showToast();
    
    // Create a new toast timer, to hide the toast message after the specified `timeout`
    this._toastTimer = setTimeout(() => this._hideToast(), timeout);
    
  }



  
  // PRIVATE SETTERS
  
  /**
   * Sets the toast message to the given `messageHTML`.
   *
   * @param { String } messageHTML
   * @private
   */
  set _toastMessage(messageHTML) {
    this.toastEl.innerHTML = messageHTML;
  }


  // PRIVATE GETTERS

  /**
   * Returns the toast message. 
   *
   * @return { String } toastMessage - The trimmed textContent of `toastEl`
   * @private 
   */
  get _toastMessage() {
    return this.toastEl.textContent.trim();
  }

  


  // PRIVATE METHODS
 

  /**
   * Shows the toast element.
   * This method removes the `hidden` property of `toastEl` by setting it to FALSE
   */
  _showToast() {
    this.toastEl.hidden = false;
  }


  /**
   * Hides the toast element.
   * This method adds the `hidden` property of `toastEl` by setting it to TRUE
   */
  _hideToast() {
    this.toastEl.hidden = true;
  }


  /**
   * Method used to listen to events fired 
   * by the main elements of this page or window.
   * 
   * @private
   */
  _addListeners() {
    
    // Adding some click event listeners...:
    
    // ... to `drawerEl`
    this.drawerEl.addEventListener('click', (event) => this._onDrawerClickHandler(event));
    // ... to `handleEl`
    this.handleEl.addEventListener('click', (event) => this._onHandleClickHandler(event));
    // ... to `buttonEl`
    this.buttonEl.addEventListener('click', (event) => this._onButtonClickHandler(event));
  }


  /**
   * Handler that is called whenever the `<aside id="drawer">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  _onDrawerClickHandler(event) {
    // Check if the drawer element (i.e. `drawerEl`) is opened using...
    // ...you guessed it ! "A TERNARY STATMENT !!!" ;)
    let isOpened = this.drawerEl.hasAttribute('opened') ? true : false;

     // Do nothing if `drawerEl` is already opened.
    if (isOpened) { return }

    // Open the drawer by setting or adding a 'opened' attribute.
    this.drawerEl.setAttribute('opened', '');

    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2m[_onDrawerClickHandler](1): drawerEl => `, this.drawerEl);
    console.log(`\x1b[2m[_onDrawerClickHandler](2): event => `, event);
  
  }


  /**
   * Handler that is called whenever the `<div id="handle">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  _onHandleClickHandler(event) {
     // Stop Propagation of the event
     event.stopPropagation();

    // Toggle the drawer
    this.toggleDrawer();

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[2m[_onHandleClickHandler]: event => `, event);
  }


  /**
   * Handler that is called whenever the `<button id="button">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  _onButtonClickHandler(event) {
    // Run the project-specific `showhide()` method, 
    // to toggle the visibility of `articleEl`
    this.showhide();
    
    // If the article is hidden...
    if (this.isArticleHidden) {
      // ...toast a message that confirms this fact too ;)
      this.toast("Article is <span>hidden</span>");

    }else { // <- article is not hidden...
      // ...toast a message that confirms this fact ;)
      this.toast("Article is <span>visible</span>");
    }


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



