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
* @job: 02
* @day: 03
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> let runtrackApp = new RuntrackApp();
*    -|>
*    -|> runtrackApp.toast("Hello Javascript!", 5000);
*
*   2-|> // shuffle the arcs
*    -|> runtrackApp.suffleArcs();
*
*   3-|> // reset the arcs
*    -|> runtrackApp.resetArcs(true);
*
*   4-|> // move an arc from preview to box 
*    -|> runtrackApp.moveToBox(arcElement);
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
    // Initialize the private attributes
    
    // listen to some events
    this.#_addListeners();
    
  }



  // PUBLIC SETTERS


  // PUBLIC GETTERS

  /**
   * Returns the `<ul id="preview">` element.
   *
   * @return { Element }
   */
  get previewEl() {
    return $('#preview').get(0);
  }


  /**
   * Returns the `<ul id="box">` element.
   *
   * @return { Element }
   */
  get boxEl() {
    return $('#box').get(0);
  }


  /**
   * Returns the `<span id="status">` element
   *
   * @return { Element } 
   */
  get statusEl() {
    return $('#status').get(0);
  }


  /**
   * Returns the `<button id="shuffleButton">` element.
   *
   * @return { Element } 
   */
  get shuffleButtonEl() {
    return $('#shuffleButton').get(0);
  }

  /**
   * Returns the `<button id="resetButton">` element.
   *
   * @return { Element } 
   */
  get resetButtonEl() {
    return $('#resetButton').get(0);
  }


  /* ====================== */


  /**
   * Returns the `<main id="result">` element.
   *
   * @return { Element } 
   */
  get resultEl() {
    return $('#result').get(0);
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



  // PUBLIC METHODS
 
  /**
   * Shows or displays a status with specified `message`
   *
   * @param { String } message - The status message to be displayed
   */
  showStatusMessage(message = '') {
    // show the `statusEl`
    $(this.statusEl).show();
    // update the message
    this.statusEl.textContent = message;
  }

  /**
   * Hides the status message
   */
  hideStatusMessage() {
    $(this.statusEl).hide();
  }



  /**
   * Method used to move the specified `arcElement` into the `boxEl`
   */
  moveToBox(arcElement) {
    // TODO: do something awesome here, before appending `arcElement` to `boxEl`

    // Append `arcElement` to `boxEl`
    this.boxEl.append(arcElement);
  }

  /**
   * Method used to retrieve a list of all the arcs in `previewEl`.
   *
   * @return { Array } 
   */
  getPreviewArcs() {
    return $('#preview .arc').toArray();
  }
  
  /**
   * Method used to retrieve a list of all the arcs in `boxEl`.
   *
   * @return { Array } 
   */
  getBoxArcs() {
    return $('#box .arc').toArray();
  }


  /**
   * Method used to retrieve a list all the avaiable `<li class="arc">` elements.
   *
   * @return { Array } 
   */
  getAllArcs() {
    return $('.arc').toArray();
  }


  
  /**
   * Returns the arc element whose `arcIndex` property matches the specified `arcIndex` 
   *
   * @param { Number } arcIndex
   *
   * @return { Element } 
   */
  getArcByIndex(arcIndex) {
    return $(`.arc[arcIndex=${arcIndex}]`).get(0); 
  }
 

  /**
   * Shuffles all the arcs.
   * NOTE: This method only shuffles the arcs in `previewEl`.
   *
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * TODO:? Rename `shuffleArcs` to just `shuffle`
   *
   * @return { Boolean } shuffled - Returns TRUE if the arcs were shuffled successfully ;)
   */
  shuffleArcs() {
    // Initialize the `shuffled` boolean variable
    let shuffled = false;

    // get a list of all the arcs in preview as `previewArcs`
    let previewArcs = this.getPreviewArcs();

    // Do nothing if there're no arcs in the preview
    if (!previewArcs.length) { return shuffled }


    // IDEA: Let's use the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
    //       to shuffle our `previewArcs`, and have a truly random distribution of items.
   

    // Looping through `previewArcs` (from end to start)...

    // Initialize the `start` and `end` variables
    let start = previewArcs.length - 1; // <- returns eg.: 5 (if there are 6 items in the `previewArcs`)
    let end = 0;
   
    // Looping `previewArcs` from start (say, 5) to end (say, 0) as `index`...
    for (let index = start; index > end; index--) {
      // ...get the arc at this current iteration as `arc`. duh!! ;)
      let arc = previewArcs[index];
    
      // Generate a random position using the `index`
      let randomPosition = Math.floor(Math.random() * (index + 1));

      // pick a random arc from `previewArcs` with this `randomPosition`
      let randomArc = previewArcs[randomPosition];
      
      // Now, move or insert `arc` before `randomArc` in the `previewEl`
      // NOTE: Normally we'd perform a swap, but I prefer just moving one node before another ;)
      this.previewEl.insertBefore(arc, randomArc);

      // Set the `shuffled` to TRUE
      // TODO: Remove this attrocity below ASAP or find a better/cleaner solution !!!
      shuffled = true;

      // DEBUG [4dbsmaster]: tell me about it :)
      // console.log(`[shuffle](1): randomPosition => `, randomPosition);
      // console.log(`[shuffle](2): randomArc => `, randomArc);
      // console.log(`[shuffle](3): arc => `, arc);
       
    } 

    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`[shuffleArcs]: previewArcs => `, previewArcs);
    
    return shuffled;
  }
 
  
  /**
   * Resets the arcs to their original position.
   * IMPORTANT: This is in conformity with this project/runtrack's requirements.
   *
   * TODO:? Rename `resetArcs` to just `reset`
   *
   * @param { Boolean } shuffle - If TRUE, the arcs will be shuffled after the reset
   */
  resetArcs(shuffle = false) {
    // Do nothing if there are no arcs in the box
    if (!this.getBoxArcs().length) { return }

    // hide the status message
    this.hideStatusMessage();

    // get a list of all the arcs as `arcs`
    let arcs = this.getAllArcs();
    
    // Looping through `arcs`...
    for (let arcIndex = 0; arcIndex < arcs.length; arcIndex++) {
      // get the arc which has this `arcIndex` attribute as `currentArc`
      let currentArc = this.getArcByIndex(arcIndex);

      // append or move the `currentArc` to `previewEl`
      this.previewEl.appendChild(currentArc);
    }

    // Shuffle the arcs after the reset, if `shuffle` is TRUE
    if (shuffle) { this.shuffleArcs() }

    // Toast a message confirming this reset w/ a 5 seconds timeout #LOL
    this.toast("Arcs have been reset !", 5000);


    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`[resetArcs]: arcs => `, arcs);
  }


  /* ==================== */


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


  /**
   * Notifies this app of any recent updates.
   * This method is usually called after an arc has been moved from `previewEl` to `boxEl`
   */
  notifyUpdate() {
    // Using our beloved ternary statement...#iDK ;)

    // check if all preview arcs have been moved
    let allPreviewArcsMoved = !this.getPreviewArcs().length ? true : false;

    // check the order or acrs in `boxEl`
    let boxArcsInOrder = this.#_checkBoxArcsOrder() ? true : false;

    // check if the game was a success
    let success = (allPreviewArcsMoved && boxArcsInOrder) ? true : false;

    // If all preview arcs have been moved...
    if (allPreviewArcsMoved) {
      // ...execute the `#_onGameOver()` method passing `success` as an argument
      this.#_onGameOver(success);
    }


    // DEBUG [4dbsmaster]: tell me about all these checks ;)
    console.log(`[notifyUpdate](1): allPreviewArcsMoved ? ${allPreviewArcsMoved}`);    
    console.log(`[notifyUpdate](2): boxArcsInOrder ? ${boxArcsInOrder}`);    
    console.log(`[notifyUpdate](3): success ? ${success}`);    
    
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

    // Get all arcs from preview as `previewArcs`
    let previewArcs = this.getPreviewArcs();
    
    // Adding some click event listeners...:

    // ... to `shuffleButtonEl`
    $(this.shuffleButtonEl).on('click', (event) => this.#_onShuffleButtonClickHandler(event));
    // ... to `resetButtonEl`
    $(this.resetButtonEl).on('click', (event) => this.#_onResetButtonClickHandler(event));
    // ... to `previewArcs`
    $(previewArcs).on('click', (event) => this.#_onPreviewArcsClickHandler(event));

    /* =================== */

    // ... to `drawerEl`
    $(this.drawerEl).on('click', (event) => this.#_onDrawerClickHandler(event));
    // ... to `handleEl`
    $(this.handleEl).on('click', (event) => this.#_onHandleClickHandler(event));
    
  }


  /**
   * Handler that is called whenever the `<button id="shuffleButton">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onShuffleButtonClickHandler(event) {
    // Execute the `shuffleArcs()` method, 
    // to shuffle the arcs, and assign the result to `shuffled` boolean variable
    let shuffled = this.shuffleArcs();

    // If the arcs were shuffled successfully...
    if (shuffled) {
      // ...toast a message to confirm the shuffle
      this.toast(`<code>${this.getPreviewArcs().length}</code> Arcs have been shuffled`, 3000);
    }
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[#_onShuffleButtonClickHandler]: event => `, event);
  }


  /**
   * Handler that is called whenever the `<button id="resetButton">` element is clicked.
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onResetButtonClickHandler(event) {
    // Execute the `resetArcs()` method, 
    // to reset the arcs
    this.resetArcs(true);

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[#_onResetButtonClickHandler]: event => `, event);
  }

 
  /**
   * Handler that is called whenever the a `<li class="arc">` element in `previewEl` is clicked
   *
   * @param { PointerEvent } event
   * @private
   */
  #_onPreviewArcsClickHandler(event) {
    // get this arc element from `event` as `arcElement`
    let arcElement = event.currentTarget;
    
    // Move this `arcElement` to the box
    this.moveToBox(arcElement);
    
    // Notify our app of this update
    this.notifyUpdate();
    
    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[#_onPreviewArcsClickHandler](1): arcElement => `, arcElement);
    console.log(`\x1b[32m[#_onPreviewArcsClickHandler](2): event => `, event);
  }





  /* ======================== */


  /**
   * Handler that is called when the game is over
   *
   * @param { Boolean } success - TRUE if the play has won the game.
   */
  #_onGameOver(success) {
    // Toast a game over message
    this.toast("Game Over !");
    
    // Get the approriate status message, based the `success`
    let statusMessage = (success) ? "Vous avez gagné" : "Vous avez perdu";

    // Show the `statusMessage`
    this.showStatusMessage(statusMessage);

    // If the game was a success...
    if (success) {
      // ...add the '.success' class to `statusEl`, while removing any '.error' class
      $(this.statusEl).addClass('success').removeClass('error');

    }else { // <- game was lost
      // ...add the '.error' class to `statusEl`, while removing any '.success' class
      $(this.statusEl).addClass('error').removeClass('success');
    }



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
    // console.log(`\x1b[2m[#_onDrawerClickHandler](1): drawerEl => `, this.drawerEl);
    // console.log(`\x1b[2m[#_onDrawerClickHandler](2): event => `, event);
  
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
   * Checks the order of all arcs in `boxEl`
   *
   * @return { Boolean } result - Returns TRUE if all the box arcs are in order
   */
  #_checkBoxArcsOrder() {
    // Initialize the `result` boolean variable to TRUE
    let result = true; // <- NOTE: easier to prove a positive #burdenOfProof
    
    // Get a list of all the current arcs in the box as `boxArcs`
    let boxArcs = this.getBoxArcs();

    // looping through `boxArcs`...
    for (let index = 0; index < boxArcs.length; index++) {
      // ...get the arc at this iteration
      let arc = boxArcs[index];

      // Get the next arc (a.k.a sibling)
      let nextArc = arc.nextElementSibling;

      // ...get the `arcIndex` of this `arc` element as `arcIndex` number.
      let arcIndex = parseInt(arc.getAttribute('arcIndex'));

      // [ if there's a `nextArc` sibling ]
      // get the `arcIndex` of this `nextArc` number, else assign -1 to `nextArcIndex`
      let nextArcIndex = (nextArc) ? parseInt(nextArc.getAttribute('arcIndex')) : -1;
     
      // IDEA: the `nextArcIndex` must be greater than the current `arcIndex` for the arcs to be in order. 
      //       and `nextArcIndex` should not be -1 ('cause if that's the case, then `arc` is the last node)

      // So, let's update `result` accordingly, implementing the above idea...
      if ((nextArcIndex !== -1) && (nextArcIndex < arcIndex)) {
        // ...set `result` to FALSE
        result = false;

        // stop the loop
        break;
      }

      // DEBUG [4dbsmaster]: tell me about it ;)
      console.log(`\x1b[32m[#_checkBoxArcsOrder](1): arcIndex => ${arcIndex} & nextArcIndex => ${nextArcIndex}\x1b[0m`);
      console.log(`\x1b[32m[#_checkBoxArcsOrder](2): arc => \x1b[0m`, arc);
      console.log(`\x1b[32m[#_checkBoxArcsOrder](3): nextArc => \x1b[0m`, nextArc);


    }

    // Return `result`;
    return result;
  }


}; // <- End of `RuntrackApp` class





/**
 * Let's wait for our document / current page to be ready ;)
 */
$(document).ready(() => {
  // Create an object of the `RuntrackApp` class as `runtrackApp` 
  // Make it a global variable
  window.runtrackApp = new RuntrackApp();
  
  // shuffle the arcs
  runtrackApp.shuffleArcs();
   
  // runtrackApp.toast("Hello, Javascript!", 5000);

  // Do something else/more, when the window is done loading 

});

