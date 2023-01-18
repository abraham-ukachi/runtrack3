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
* @name Jour 2 - JS++
* @job 03
* @day 02
* @file index.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*
*   1-|> open http://localhost/runtrack3/jour02/job03/index.php
*
*
* ======== Job 03 ==========
*      >>> DESCRIPTION <<<		
* ~~~~~~~~ (French) ~~~~~~~~~
*
* - Créez une balise <button> ayant comme id “button”.
* - Créez une balise <p> ayant comme id “compteur” et contenant “0”.
* - Ce contenu doit évoluer proportionnellement au nombre d'événements click reçu par le bouton.
*
* !!: Vous ne devez pas utiliser “onclick()” dans votre html.
*             La fonction permettant d’effectuer la modification doit s'appeler “addone()”. 
*
* ~~~~~~~~ (English) ~~~~~~~~
* 
* - Create a <button> tag with the id “button”.
* - Create a <p> tag with id “counter” and containing “0”.
* - This content must evolve in proportion to the number of click events received by the button.
*
* !!: You must not use “onclick()” in your html.
*     The function making the modification must be called “addone()”.
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




// DEBUG [4dbsmaster]: tell me about it :)
// printf("I love JavaScript\n");


?><!DOCTYPE html>

<!-- HTML -->
<html lang="en">
  <!-- HEAD -->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="IE=edge, chrome=1">
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
    <meta name="description" content="Job3 of Day2 - Runtrack3">

    <title>Job03 - Jour02 | Runtrack3</title>


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
        padding-bottom: 100px;
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
      button {
        margin: 16px 24px;
        padding: 8px 48px;
        font-size: 20px;
        border-radius: 8px;
        border: 0;
        cursor: pointer;     
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

      /* Hover styles of all inputs except the submit input button */
      input:not([type="submit"]):hover, select:hover {
        outline: 2px solid white;
      }

      input:not([type="submit"]):focus, select:focus {
        outline: 2px solid yellow;
      }

      /* Submit Input */
      input[type="submit"] {
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

      /* Counter */
      p.counter {
        font-family: courier;
        font-size: 100px;
      }
      
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

        /* Button */
        button {}

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

      }

      /*** END of Wide Layout - Media Query ***/

    </style>


    
    <!-- Finally, some JS 😀 -->
    <script src="script.js"></script> 

  
  </head>
  <!-- End of HEAD -->

  <!-- BODY -->
  <body class="vertical layout centered" fullbleed>

    <!-- Result - MAIN -->
    <main id="result" class="vertical layout center">

      <!--===++ [Job 03 - Day 2] (1) ++===-->

      <!-- Output -->
      <div id="output">
        <!-- Counter -->
        <p id="compteur" class="counter">0</p>

      </div>
      <!-- End of Output -->

      <!--===++ End of [Job 03 - Day 2] (1) ++===-->


    </main>
    <!-- End of Result - MAIN -->
    
    
    <!-- Drawer - ASIDE -->
    <aside id="drawer" opened>
      
      <!-- Aside Container -->
      <div class="container vertical layout center">
        <!-- Handle -->
        <div id="handle"></div>
        
        <!-- H2 Title -->
        <h2 title="Job 03 of Day2">Job 03 - Day2</h2>
        
        
        
        <!--===++ [Job 03 - Day 2] (2) ++===-->

        <!-- Button -->
        <button id="button" class="horizontal layout center">Add One</button>

        <!--===++ End of [Job 03 - Day 2] (2) ++===-->
      
          
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

