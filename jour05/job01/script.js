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
*   1-|> let runtrackApp = new RuntrackApp(PAGE_HOME);
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


// Defining some constants...

// pages
const PAGE_HOME = 'home';
const PAGE_LOGIN = 'login';
const PAGE_REGISTER = 'register';

// input fields
const FIELD_FIRST_NAME = 'firstname';
const FIELD_LAST_NAME = 'lastname';
const FIELD_EMAIL = 'email';
const FIELD_PASSWORD = 'password';
const FIELD_CONFIRM_PASSWORD = 'confirmPassword';

// validation method
const METHOD_VALIDATE_JS = 2; // <- Just having fun w/ `int` #LOL
const METHOD_VALIDATE_PHP = 3; 


// Errors
// - 'requires' errors
const ERROR_FNAME_REQUIRED = 'firstnameRequired';
const ERROR_LNAME_REQUIRED = 'lastnameRequired';
const ERROR_EMAIL_REQUIRED = 'emailRequired';
const ERROR_PASS_REQUIRED = 'passRequired';
// - 'too small' errors
const ERROR_FNAME_TOO_SMALL = 'firstnameTooSmall';
const ERROR_LNAME_TOO_SMALL = 'lastnameTooSmall';
const ERROR_EMAIL_TOO_SMALL = 'emailTooSmall';
const ERROR_PASS_TOO_SMALL = 'passTooSmall';
// - 'other' password errors
const ERROR_PASS_UPPER_LOWER = 'passUpperLower';
const ERROR_PASS_NO_NUMBER = 'passNoNumber';
const ERROR_PASS_NOT_MATCH = 'passNotMatch';
// - 'other' email errors
const ERROR_EMAIL_INVALID = 'emailInvalid';
const ERROR_ALREADY_EXISTS = 'emailAlreadyExists';
// - 'other' errors
const ERROR_NO_SPEC_CHARS_ALLOWED = 'noSpecCharsAllowed';


// Create a class named `RuntrackApp`
class RuntrackApp {
  
  // TODO: Define some properties

  // private attributes
  #page;

  // private fields 
  #_toastTimer;
  #_errorMessages;


  /**
   * Constructor of this `RuntrackApp` class.
   * NOTE: This constructor will get executed automatically 
   * whenever a new object (eg. `runtrackApp`) is created
   *
   * @param { String } page - The current page of the app. `PAGE_HOME` is default
   */
  constructor(page = PAGE_HOME) {
  
    // Initialize the `page`
    this.#page = page;

    // listen to some events
    this.#_addListeners();

    // Load the Error Message Data
    this.#_loadErrorMessages();
    
  }

  
  
  // PUBLIC METHODS
 
 
  /**
   * Method used to retrieve the error message of the specified `errorId`
   * 
   * @param { String } errorId - The associative key of the error message (e.g: "passNotMatch" => "Passwords don't match")
   *
   * @return { Message } 
   */
  getErrorMessage(errorId) {
    // TODO: Make sure there're `#_errorMessages` before proceeding ;)
    
    // Return the error message from the private `#_validateError` JSON object
    return this.#_errorMessages[errorId];
  }


  /**
   * Method used to validate the specified `value` 
   * of a given input `field` in the registration page.
   *
   * TODO:? Rename to `validateSignupField()`
   *
   * Example usage:
   *  
   *    validateRegistration('Abraham', FIELD_FIRST_NAME, (success, message) => console.log(message));
   *
   * @param { String } value - The text value to validate
   * @param { String } field - The name of the input field (e.g: 'firstname', 'lastname', 'email', etc) 
   *                           Checkout above declared `FIELD_*` constants
   * @param { Function } callback - (optional) A callback function to handle the validation responses
   */
  validateRegistration(value, field, callback = null) {
    // Use the input `field` in a switch/case block,
    // to validate each input field separately 
    switch(field) {
      case FIELD_FIRST_NAME:
        // validate the first name
        this.#_validateFirstname(value, callback);
        break;
      case FIELD_LAST_NAME:
        // validate the last name
        this.#_validateLastname(value, callback);
        break;
      case FIELD_EMAIL:
        // validate the email
        this.#_validateEmail(value, callback);
        break;
      case FIELD_PASSWORD:
        // validate the password
        this.#_validatePassword(value, callback);
        break;
      case FIELD_CONFIRM_PASSWORD:
        // validate the confirm password
        this.#_validateConfirmPassword(value, callback);
        break;
      default:
        // do something else by default
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[validateRegistration]: value => ${value} & field => ${field} & callback => \x1b[0m`, callback);
     
  }

  
  /**
   * Method used to validate the specified `value` 
   * of a given input `field` in the connection or login page.
   *
   * TODO:? Rename to `validateLoginField()`
   *
   * Example usage:
   *  
   *    validateConnection('abraham.ukachi@laplateforme.io', FIELD_EMAIL, (success, message) => console.log(message));
   *
   * @param { String } value - The text value to validate
   * @param { String } field - The name of the input field (e.g: 'email', 'password') 
   * @param { Function } callback - (optional) A callback function to handle the validation responses
   */
  validateConnection(value, field, callback = null) {
    // Use the input `field` in a switch/case block,
    // to validate each input field separately 
    switch(field) {
      case FIELD_EMAIL:
        // validate the login field 
        this.#_validateLoginEmail(value, callback);

        break;
      case FIELD_PASSWORD:
        // validate the login password
        this.#_validateLoginPassword(value, callback);
        break;
      default:
        // do something else by default
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[34m[validateConnection]: value => ${value} & field => ${field} & callback => \x1b[0m`, callback);
     
  }
  
  
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

  /**
   * Returns the current page of this runtrack3 app.
   *
   * @return { String } currentPage
   */
  getCurrentPage() {
    return this.#page;
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
   * Returns a list of all the currently available `<input>` elements 
   *
   * @return { Element }
   */
  get inputEls() {
    return document.querySelectorAll('input');
  }

  /**
   * Returns the `<form id="registerForm">` element.
   *
   * @return { Element } 
   */
  get registerFormEl() {
    return document.getElementById('registerForm');
  }

 
  /**
   * Returns the `<form id="loginForm">` element.
   *
   * @return { Element } 
   */
  get loginFormEl() {
    return document.getElementById('loginForm');
  }

  /**
   * Returns the `<input id="firstnameInput">` element.
   *
   * @return { Element } 
   */
  get firstnameInputEl() {
    return document.getElementById('firstnameInput');
  }
  

  /**
   * Returns the `<input id="lastnameInput">` element.
   *
   * @return { Element } 
   */
  get lastnameInputEl() {
    return document.getElementById('lastnameInput');
  }
 

  /**
   * Returns the `<input id="emailInput">` element.
   *
   * @return { Element } 
   */
  get emailInputEl() {
    return document.getElementById('emailInput');
  }
  

  /**
   * Returns the `<input id="passwordInput">` element.
   *
   * @return { Element } 
   */
  get passwordInputEl() {
    return document.getElementById('passwordInput');
  }

                                                     
  /**
   * Returns the `<input id="confirmPasswordInput">` element.
   *
   * @return { Element } 
   */
  get confirmPasswordInputEl() {
    return document.getElementById('confirmPasswordInput');
  }


  /**
   * Returns the `<input id="registerButton">` element.
   *
   * @return { Element } 
   */
  get registerButtonEl() {
    return document.getElementById('registerButtonEl');
  }


  /**
   * Returns the `<input id="loginButton">` element.
   *
   * @return { Element } 
   */
  get loginButtonEl() {
    return document.getElementById('loginButtonEl');
  }



  /* ================== */


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






  // PRIVATE METHODS
 

  /**
   * Validates the given `firstname`
   *
   * @param { String } firstname
   * @param { Function } callback
   */
  #_validateFirstname(firstname, callback) {}


  /**
   * Validates the given `lastname`
   *
   * @param { String } lastname
   * @param { Function } callback
   */
  #_validateLastname(lastname, callback) {}


  /**
   * Validates the given `email`
   *
   * @param { String } email
   * @param { Function } callback
   */
  #_validateEmail(email, callback) {}


  /**
   * Validates the given `password`
   *
   * @param { String } password
   * @param { Function } callback
   */
  #_validatePassword(password, callback) {}


  /**
   * Validates the given `confirmPassword`
   *
   * @param { String } confirmPassword
   * @param { Function } callback
   */
  #_validateConfirmPassword(confirmPassword, callback) {}


  /**
   * Validates the given `loginEmail`
   *
   * @param { String } loginEmail
   * @param { Function } callback
   */
  #_validateLoginEmail(loginEmail, callback) {}


  /**
   * Validates the given `loginPassword`
   *
   * @param { String } loginPassword
   * @param { Function } callback
   */
  #_validateLoginPassword(loginPassword, callback) {}
  

  /**
   * Method used to listen to events fired 
   * by the main elements of this page or window.
   * 
   * @private
   */
  #_addListeners() {
    
    // Get the current page as `currentPage`
    let currentPage = this.getCurrentPage();
    
    // For each input element in `inputEls`...
    this.inputEls.forEach((inputEl) => {
      // ...listen to the 'input' events
      inputEl.addEventListener('input', (event) => this.#_onInputHandler(event));
    });

    /*

    // If the current page is 'register'...
    if (currentPage === PAGE_REGISTER) {
      // ...add the following event listeners:
      
      
      // listening to 'input' events on firstname, lastname, 
      // email, password & confirmPassword input elements...
      this.firstnameInput.addEventListener('input', (event) => this.#_onFirstnameInputHandler(event));
      this.lastnameInput.addEventListener('input', (event) => this.#_onLastnameInputHandler(event));
      this.Input.addEventListener('input', (event) => this.#_onEmailInputHandler(event));
      this.emailInput.addEventListener('input', (event) => this.#_onEmailInputHandler(event));
      this.emailInput.addEventListener('input', (event) => this.#_onEmailInputHandler(event));



    }else if (currentPage === PAGE_LOGIN) { // <- current page is 'login'
      // ...add the following event listeners:
      
      // listening to 'input' events on email & password input elements...
      this.emailInput.addEventListener('input', (event) => this.#_onEmailInputHandler(event));
      this.passwordInput.addEventListener('input', (event) => this.#_onPasswordInputHandler(event));

      // listening to 'click' events on login button element...
      this.loginButtonEl.addEventListener('click', (event) => this.#_onLoginButtonClickHandler(event));
    }
    */

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[32m[#_addListeners]: currentPage => ${currentPage} & inputEls => \x1b[0m`, this.inputEls);
    
    // Adding some change event listeners...
    

    // Adding some click event listeners...:
    
    // ... to `drawerEl`
    this.drawerEl.addEventListener('click', (event) => this.#_onDrawerClickHandler(event));
    // ... to `handleEl`
    this.handleEl.addEventListener('click', (event) => this.#_onHandleClickHandler(event));


    // Listening to other events...

  }
 
  /**
   * Loads the error message data of the validation process as a JSON object.
   * NOTE: This method updates the private `#_errorMessageData` property
   * 
   * @private
   */
  #_loadErrorMessages() {
    // Update the `#_errorMessages` property
    // TODO: Fetch the JSON object asynchronously (i.e. from an outside 'en.json' file using the `fetch()` method)
    this.#_errorMessages = {

      firstnameRequired: "First name is required",
      lastnameRequired: "First name is required",
      emailRequired: "Email is required",
      passRequired: "Password is required",

      firstnameTooSmall: "First name must be at least 3 characters",
      lastnameTooSmall: "Last name must be at least 3 characters",
      emailTooSmall: "Email must be at least 3 characters",
      passTooSmall: "Password must be at least 6 characters",

      passUpperLower: "Password must contain an upper and lower character",
      passNoNumber: "Password must have at least one number",
      passNotMatch: "Passwords don't match",    

      emailInvalid: "Please enter a valid email",      
      emailAlreadyExists: "This email already exists",   
      
      noSpecCharAllowed: "No special characters are allowed"
    };
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
   * Handler that is called whenever the value or text of an `<input>` element changes.
   *
   * @param { InputEvent } event
   */
  #_onInputHandler(event) {
    // Get the input element from `event` as `inputEl`
    let inputEl = event.currentTarget;

    // Get the input/field name from `inputEl` as `field`
    let field = inputEl.name;
    // Get the input value from `inputEl` as `value`
    let value = inputEl.value;

    // Get the current page as `currentPage`
    let currentPage = this.getCurrentPage();
   
    // If the current page is 'register'...
    if (this.currentPage === PAGE_REGISTER) {
      // ...validate the registration with the `field` and `value`
      this.validateRegistration(field, value);


    } else { // <- current page is 'login' (at least should be, 'cause we do not have an input in 'home' page)
      // ...validate the connection with the `field` and `value`
      this.validateConnection(field, value);
    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    console.log(`\x1b[35m[#_onInputHandler](1): field => ${field} & value => ${value} &  inputEl => \x1b[0m`, inputEl);
    console.log(`\x1b[35m[#_onInputHandler](2): event => \x1b[0m`, event);
    
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









