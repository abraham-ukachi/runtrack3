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
* @job: 02
* @day: 01
* @file: script.js
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
*
* Example usage:
*   1-|> ???
*/


'use strict'; // <- Let's execute our code in sctrict mode. 
// ^^^^^^^ This helps me write a cleaner code by preventing my from using undeclared variables ;)

/**
 * Displays a dialog with "Hello Javascript!" message
 * NOTE: This function uses the `alert()` method.
 */
 var sayHello = () => alert("Hello Javascript!");


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

