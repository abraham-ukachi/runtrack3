<?php
/**
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
* @project runtrack3
* @name Jour 5 - Projet
* @job 01
* @day 05
* @file index.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*
*   1-|> open http://localhost/runtrack3/jour05/job01/index.php
*
*
* ======== Job 01 ==========
*      >>> DESCRIPTION <<<		
* ~~~~~~~~ (French) ~~~~~~~~~
* 
* - Commencez par créer une base de données “utilisateurs” contenant une table 
*   “utilisateurs” et ayant comme champs “id”, “nom”, “prenom”, “email” et “password”.
*
* - Ensuite, créez une page d’accueil qui contient un paragraphe “Bonjour $prenom” si l’utilisateur 
*   est connecté, sinon deux liens vers une page “inscription.php” et une page “connexion.php”. 
*   Ces deux pages permettent aux utilisateurs de créer un compte et de se connecter.
*
* - L’ensemble des vérifications habituelles de formulaire doivent se faire sans 
*   rafraîchissement de la page (en JS donc).
*
*   Exemples de vérifications :
*     ● Prénom/Nom bien renseignés,
*     ● Mots de passe/Confirmation identiques et suffisamment complexes,
*     ● Adresse email non déjà prise et au bon format…
*
* - Un message lié à chaque erreur doit être affiché en dessous de chaque champ du formulaire le cas échéant.
*   Lorsqu’une inscription est validée, l’utilisateur est renvoyé sur la page de connexion.
*   Lorsqu’il se connecte, il est renvoyé vers la page d’accueil. 
*
* ~~~~~~~~ (English) ~~~~~~~~
* 
* - Start by creating a “users” database containing a “users” table and having 
*   “id”, “name”, “first name”, “email” and “password” as fields.
*
* - Next, create a home page that contains a “Hello $firstname” paragraph if the user is logged in, 
*   otherwise two links to a “registration.php” page and a “login.php” page. These two pages allow 
*   users to create an account and log in.
*
* - All the usual form checks must be done without refreshing the page (in JS).
*   Examples of checks:
*     ● Well-informed first name/last name,
*     ● Identical and sufficiently complex passwords/confirmation,
*     ● Email address not already taken and in the correct format…
*
* - A message related to each error must be displayed below each field of the form if applicable.
*   When a registration is validated, the user is returned to the login page.
*   When he logs in, he is redirected to the home page. 
*
* ============================
* WARNING: This task/job was done in a hurry; my code is therefore not as 'pretty'. #LOL
* ============================
*/


/*
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
* MOTTO: I'll always do more 😜!!!
* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/


# YESS 😭!!!! J-A-V-A-S-C-R-I-P-T !!!!!!! 😍


// Let's require/include/embed our `user.php` from 'api/' once
require_once __DIR__ . '/api/User.php';

// Create a shortcut of the `Runtrack3` namespace as `rt3`
Use Runtrack3 as rt3;

// Instantiate our `User` class as `user`
$user = new rt3\User();


// check connection
if ($user->isConnected()) {
  // DEBUG [4dbsmaster]: tell me about it ;)
  echo "User <b>is</b> connected!" . "<br>";

} else {
  // DEBUG [4dbsmaster]: tell me about it ;)
  echo "User <b>is not</b> connected!" . "<br>";
}



// DEBUG [4dbsmaster]: tell me about it :)
// printf("I love JavaScript\n");


?><!DOCTYPE html>

<!-- HTML -->
<html lang="en">
  <!-- HEAD -->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">
    <meta name="author" content="Abraham Ukachi">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
    <meta name="description" content="Register - Job1 of Day5 - Runtrack3">

    <title>Register | Job01 - Jour05 | Runtrack3</title>


    <!-- Material Icons - https://github.com/google/material-design-icons/tree/master/font -->
    <!-- https://material.io/resources/icons/?style=baseline -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    

    <style>
            
      /* ==== MATERIAL ICONS ==== */

      /* Material Icons  */
      .material-icons {
        font-family: 'Material Icons';
        font-weight: normal;
        font-style: normal;
        font-size: 24px; /* Preferred icon size */
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;

        /* Support for all Webkit browsers. */
        -webkit-font-smoothing: antialiased;
        /* Support for Safari and Chrome. */
        text-rendering: optimizeLegibility;

        /* Support for Firefox. */
        -moz-osx-font-smoothing: grayscale;
  
        /* Support for IE. */
        font-feature-settings: 'liga';
      }

      /* === END of MATERIAL ICONS === */



      /* Body */
      body {
        width: 100%;
        height: 100vh;
        background: #1a1a1a;
        color: #e7e7e7;
        font-size: 18px;
        font-family: courier;

        /* Webkit Browsers */
        -webkit-font-smoothing: antialiased;
        /* Safari & Chrome */
        text-rendering: optimizeLegibility;
        /* Firefox */
        -moz-osx-font-smoothing: grayscale;
      }

      /* Direct code of the body */
      body > code {
        opacity: 0.5;
      }

      /* H2 - Title */
      h2 {
        color: yellow;
        /* font-family: cursive; */
      }


      /* Any link in H2 - Title */
      h2 a {
        text-decoration: none;
        color: inherit;
      }

      /* Underline link in H2 - Title when user hover's over it */
      h2 a:hover {
        text-decoration: underline;
      }

      /* Main & Aside */
      main, aside {
        display: block;
        position: relative;
        width: 100%;
        height: auto;
      }

      /* All Containers */
      .container {
        position: relative;
        width: inherit;
        height: inherit;
      }

      /* Main */
      main {
        width: 100%;
        height: 100%;
        min-height: 300px;
        padding: 48px;
        justify-content: start;
        box-sizing: border-box;
      }

      /* H1 in main*/
      main > h1 {
        font-size: 72px;
      }


      /* Main Container */
      main > .container {
        /* top: -50px; */
      }

      /* Output */
      #output {
        list-style: none;
        margin: 0;
        padding: 16px;
        text-align: center;
        
      }

      p#output {
        font-size: 20px;
        font-weight: bold;
      }

      /* Strong in output */
      #output  strong {
        color: orange;
      }


      /* Aside */
      aside {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 5;
        opacity: 0.95;

        transform: translateY(65%);

        -webkit-transition: transform 200ms ease-in-out;
        -moz-transition: transform 200ms ease-in-out;
        transition: transform 200ms ease-in-out;

      }

      /* Opened Aside */
      aside[opened] {
        transform: translateY(0%);
      }

      /* When Aside is closed */
      aside:not([opened]) {
        cursor: pointer;
      }
      
      /* Whenever Aside is closed and the user hovers over it,
       * change the handle's background to white */
      aside:not([opened]):hover #handle {
        background: white;
      }
      
      /* Aside Container */
      aside > .container {
        background: #2c2c2c;
        overflow: hidden;
        border-radius: 24px 24px 00 0;
        max-width: 600px;
        margin: 0 auto;
        padding-bottom: 24px; /* b4: 100px */
      }

      /* Handle */
      #handle {
        width: 30%;
        height: 5px;
        background: #7b7b7b;
        margin: 16px;
        border-radius: 5px;
        cursor: pointer;
      }

      #handle:hover {
        background: yellow;
      }
      

      /* If aside/drawer is closed, 
       * remove pointer events of the drawer's handle */
      aside:not([opened]) #handle {
        pointer-events: none;
      }

      /* Button */
      button, a[role="button"] {
        margin: 16px 24px;
        padding: 8px 48px;
        font-size: 20px;
        border-radius: 8px;
        border: 0;
        cursor: pointer;     
      }

      a[role="button"] {
          text-decoration: none;
          background: lightgray;
          color: black;
          margin: 12px;
          padding: 12px;
          font-size: 20px;
          font-weight: bold;
      }
        
      a[role="button"]:hover {
        background: white;
      }
 
      a[role="button"]:focus-visible {
        outline: 5px solid yellow;
      }

      a[role="button"][confirm] {
        background: yellow;
        color: black;
      }

      textarea {
        background: none;
        border: 3px solid grey;
        width: 90%;
        min-height: 150px;
        padding: 8px 16px;
        box-sizing: border-box;
        margin: 24px 0;
        color: white;
        font-size: 16px;
        letter-spacing: 2px;
      }

      textarea:focus-visible {
        outline: none;
        border-color: white;
      }

      textarea.error {
        border-color: red !important;
      }

      /* Hello Button */
      #helloButton {}

      button > .material-icons {
        margin: 4px 8px; 
      }

      /* Form */
      form {
        width: 90%;
        height: auto;
      }

      /* Label */
      label {
        font-family: monospace;
        color: #9c9c9c;
      }

      /* Input */
      input, select {
        border-radius: 5px;
        background: #343434;
        border: 0;
        padding: 8px 16px;
        margin: 8px 0 16px;
        font-size: 24px;
        color: white;
      }

      fieldset {
        border-color: dimgray;
      }

      fieldset input {
        width: 100%;
        height: 60px;
        margin: 12px 0;
        padding: 8px 16px;
      }

      fieldset legend {
        padding: 8px 16px;
        font-size: 16px;
        text-transform: uppercase;
      }

      fieldset + button {
        width: 100%;
        margin: 24px 0 12px;
      }

      fieldset[name="fullname"] {
        padding: 0;
        margin: 0;
        border: 0;
      }

      /* Hover styles of all inputs except the submit input button */
      input:not([type="submit"]):hover, select:hover {
        outline: 2px solid white;
      }

      input:not([type="submit"]):focus, select:focus {
        outline: 2px solid yellow;
      }

      /* Submit Input */
      input[type="submit"], button[type="submit"] {
        background: #f0ed0f;
        color: black;
        border-radius: 5px;
        text-transform: uppercase;
        font-size: medium;
        font-weight: bold;
        padding: 16px;
        letter-spacing: 1.5px;
        cursor: pointer;
        margin-top: 24px;
      }

      /* Reset Submit Button - Input */
      input[type="submit"][name="reset"] {
        margin: 0 0 24px 0;
        background: white;
      }

      select {
        flex: 1;
        /* height: 40px; */
        /* padding: 0 12px; */
        margin-left: 12px;
        overflow: hidden;
        cursor: pointer;
      }

      /* Articles */
      article {
        text-align: center;
      }

      /* Paragraphs in articles */
      article p {
        font-size: 20px;
      }

      /* Toast */
      .toast {
        background: darkgreen;
        color: white;
        padding: 12px 16px;
        border-radius: 0 0 16px 16px;
        width: 90%;
        font-size: 14px;
        font-family: monospace;
        max-width: 600px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        font-weight: bold;
        margin: 0 auto;
        text-align: center;
        z-index: 10;
      }

      /* Span in Toast */
      .toast span {
        color: #b9ff9d;
      }

      /* Code in Toast */
      .toast code {
        position: absolute;
        left: 20px;
        font-weight: bold;
        opacity: 0.3;
      }


      /* Error Toast */
      .toast.error {
        background: #752116;
      }

      /* Span in Good Toast */
      .toast.error span {
        color: #edb2b8;
      }
      
      
      /* Set the maximum width of all forms and div.toast */
      /* form, .toast { max-width: 600px; } */
      
      
      /* We alway need our fullbleed :) */
      [fullbleed] {
        margin: 0;
        padding: 0;
      }

      /*** Flex Layout Styles ***/

      /* Layout */
      .layout {
        display: flex;
      }
      
      /* Vertical Layout*/
      .vertical.layout {
        flex-direction: column;
      }

      /* Horizontal Layout */
      .horizontal.layout {
        flex-direction: row;
      }

      /* Centered Layout */
      .centered.layout {
        justify-content: center;
        align-items: center;
      }

      /* Just center the items in the layout */
      .center.layout {
        align-items: center;
      }

      /* ==== Day1 - Jour05 ==== */
      
      /* Logo */
      span.logo {
        width: 60px;
        height: 60px;
        margin: 0 auto;
        font-size: 54px;
      }

      
      /* ==== End of Day1 - Jour05 ==== */

      
      /*** Wide Layout - Media Query ***/
      @media (min-width: 460px) {
        
        /* H1 in main*/
        main > h1 {
          font-size: 144px;
          margin: 24px;
        }

        /* H2 - Title */
        h2 {
          font-size: 50px;
        }

        /* Aside */
        aside {
          transform: translateY(60%);
        }

        /* Paragraphs in Articles */
        article p {
          font-size: 30px;
        }

        /* Toast */
        .toast {
          width: 70%;
          font-size: 16px;
          /* padding: 12px 24px; */
        }
        
        /* Material Icons */
        .material-icons {
          font-size: 32px;
          margin: 6px 12px;
        }

        fieldset[name="fullname"].vertical {
          flex-direction: row;
        }

        /* First input / fname in fullname fieldset*/
        fieldset[name="fullname"] > input:first-child {
          margin-right: 12px;
        }

        /* Last input / lname in fullname fieldset*/
        fieldset[name="fullname"] > input:last-child {
          margin-left: 12px;
        }

      }

      /*** END of Wide Layout - Media Query ***/

    </style>


    
    <!-- Finally, some JS 😀 -->
    <script src="script.js"></script> 


    <script>
      /**
       * Let's wait for our window / current page to load ;)
       * NOTE: This should make sure our document is ready; kinda like `$(document).ready()` on JQuery #LOL
       */
      window.onload = (event) => {
        // Create an object of the `RuntrackApp` class as `runtrackApp` 
        // Make it a global variable
        window.runtrackApp = new RuntrackApp(PAGE_REGISTER);

        /* runtrackApp.toast("Hello, Javascript!", 5000); */
        
        // Do something else/more, when the window is done loading 
        
      };
    </script>
  </head>
  <!-- End of HEAD -->

  <!-- BODY -->
  <body class="vertical layout centered" fullbleed>

    <!-- Result - MAIN -->
    <main id="result" class="vertical layout center">

      <!--===++ [Job 01 - Day 5] (1) ++===-->
      
      <!-- Output -->
      <p id="output"></p>
      <!-- End of Output -->

      <!--===++ End of [Job 01 - Day 5] (1) ++===-->


    </main>
    <!-- End of Result - MAIN -->
    
    
    <!-- Drawer - ASIDE -->
    <aside id="drawer" opened>
      
      <!-- Aside Container -->
      <div class="container vertical layout center">
        <!-- Handle -->
        <div id="handle"></div>
        
        <!-- H2 Title -->
        <h2 title="Job 01 of Day5"><a href="index.php">Job 01 - Day5</a></h2>
        
        
        <!--===++ [Job 01 - Day 5] (2) ++===-->

        <!-- Register Form -->
        <form id="registerForm" method="post">
          <fieldset form="registerForm" name="registerInfo">
            <legend>Create an account :</legend>

            <!-- Fullname -->
            <fieldset name="fullname" class="vertical layout center">
              <!-- First Name Input -->
              <input id="firstnameInput" type="text" name="firstname" placeholder="First name" minLength="3" required/>

              <!-- Last Name Input -->
              <input id="lastnameInput" type="text" name="lastname" placeholder="Last name" minLength="3" required/>
            </fieldset>


            <!-- Email Input -->
            <input id="emailInput" type="email" name="email" placeholder="email" required/>

            <!-- Password Input -->
            <input id="passwordInput" type="password" name="password" placeholder="password" minLength="6" required/>

            <!-- Re-Password Input -->
            <input id="confirmPasswordInput" type="password" name="confirmPassword" placeholder="Confirm password" required/>

          </fieldset>
          
          <!-- Register Button -->
          <button id="registerButton" type="submit">Register</button>

        </form>
         
        <!--===++ End of [Job 01 - Day 5] (2) ++===-->
      
          
      </div>
      <!-- End of Aside Container -->

    </aside>
    <!-- End of Drawer - ASIDE -->


    <!-- Toast -->
    <div id="toast" class="toast" hidden></div>
    <!-- End of Toast -->

  </body>
  <!-- End of BODY -->

</html>
<!-- End of HTML -->

