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
* @name Jour 7 - Tailwind
* @job 03
* @day 07
* @file index.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*
*   1-|> open http://localhost/runtrack3/jour07/job03/index.php
*
*
* ======== Job 03 ==========
*      >>> DESCRIPTION <<<		
* ~~~~~~~~ (French) ~~~~~~~~~
* 
* - Reprenez votre fichier index.php. Toujours sans utiliser de fichier css, 
*   ajouter des classes tailwind à votre footer afin de le rendre coloré et aligné.
*
* ~~~~~~~~ (English) ~~~~~~~~
* 
* - Take your index.php file. Still without using a css file, add tailwind classes to 
*   your footer to make it colored and aligned. 
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
    <meta name="author" content="Abraham Ukachi">
    <meta name="description" content="Job3 of Day7 - Runtrack3">

    <title>Job03 - Jour07 | Runtrack3</title>
   
    <link href="./assets/output.css" rel="stylesheet"> 
  </head>
  <!-- End of HEAD -->

  <!-- BODY -->
  <body class="bg-slate-200">

    <!--===++ [Job 03 - Day 7] (1) ++===-->

    <!-- HEADER -->
    <header class="flex flex-col justify-between bg-white w-full h-32 p-4 pb-0">
      <div>
        <!-- App Title -->
        <h2 class="text-2xl font-bold">Runtrack3 App</h2>
        <h4 class="text-xs text-blue flex">
        <svg class="w-6 h-6 stroke-slate-700 stroke-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
          </svg>
          <span class="flex items-center pl-1 pr-1 text-slate-700">Job 03 - Day7</span>
        </h4>

      </div>

      <!-- NAV -->
      <nav class="flex list-none h-8 p-0 m-0">
        <!-- Home  -->
        <li><a class="px-3 py-2" href="index.php">Home</a></li>
        <!-- Register -->
        <li><a class="px-3 py-2" href="index.php">Register</a></li>
        <!-- Login -->
        <li><a class="px-3 py-2" href="index.php">Login</a></li>
        <!-- Search -->
        <li><a class="px-3 py-2" href="index.php">Search</a></li>

      </nav>
      <!-- End of NAV -->

    </header> 
    <!-- End of Header -->


    <!-- SECTION -->
    <section class="p-5 overflow-auto">

      <!-- Register Form -->
      <form id="registerForm">

        <h3 class="text-2xl">Sign Up</h3>
        <p class="p-2 pl-0 pr-0 text-slate-700">Fill the form below, to create a free <strong>Runtrack3</strong> acccount:</p>

        <!-- Titles - FIELDSET -->
        <fieldset id="titles">
          <legend>Title:</legend>

          <!-- Mr. -->
          <div>
            <!-- NOTE: end tag is not necessary; just a personal preference ;) -->
            <input id="mrTitleInput" name="title" value="Mr" type="radio" /> 
            <label for="mrTitleInput">Mr.</label>
          </div>

          <!-- Mrs. -->
          <div>
            <input id="mrsTitleInput" name="title" value="Mrs" type="radio" /> 
            <label for="mrsTitleInput">Mrs.</label>
          </div>

          <!-- Miss -->
          <div>
            <input id="missTitleInput" name="title" value="Miss" type="radio" /> 
            <label for="missTtileInput">Miss</label>
          </div>

          <!-- Ms. -->
          <div>
            <input id="msTitleInput" name="title" value="Ms" type="radio" /> 
            <label for="msTitleInput">Ms.</label>
          </div>

        </fieldset>
        <!-- End of Titles - FIELDSET -->
        
        <!-- First Name Input -->
        <input id="firstnameInput" type="text" name="firstname" placeholder="First name" minLength="3" required/>

        <!-- Last Name Input -->
        <input id="lastnameInput" type="text" name="lastname" placeholder="Last name" minLength="3" required/>
        <!-- Email Input -->
        <input id="emailInput" type="email" name="email" placeholder="email" required/>

        <!-- Password Input -->
        <input id="passwordInput" type="password" name="password" placeholder="password" minLength="6" required/>

        <!-- Re-Password Input -->
        <input id="confirmPasswordInput" type="password" name="confirmPassword" placeholder="Confirm password" required/>

        <!-- Passions - FIELDSET -->
        <fieldset>
          <legend>Passion:</legend>

          <!-- IT -->
          <div>
            <input id="itPassionInput" name="passion" value="it" type="checkbox" /> 
            <label for="itPassionInput">IT</label>
          </div>

          <!-- Travel -->
          <div>
            <input id="travelPassionInput" name="passion" value="travel" type="checkbox" /> 
            <label for="travelPassionInput">Travel</label>
          </div>

          <!-- Sport -->
          <div>
            <input id="sportPassionInput" name="passion" value="sport" type="checkbox" /> 
            <label for="sportPassionInput">Sport</label>
          </div>

          <!-- Reading -->
          <div>
            <input id="readingPassionInput" name="passion" value="reading" type="checkbox" /> 
            <label for="readingPassionInput">Sport</label>
          </div>

        </fieldset>
        <!-- End of Passions - FIELDSET -->

        <button>Create Account</button>
      </form>
      <!-- End of Register Form -->

    </section>
    <!-- End of SECTION -->

    
    <footer class="w-full h-14 bg-black fixed bottom-0 left-0 right-0 flex items-center justify-center">
      <p class="text-sm text-slate-500">Made with <span>&#10084;</span> by <a href="https://github.com/abraham-ukachi" class="hover:text-slate-200 hover:underline" target="_blank">Abraham Ukachi</a></p>
    </footer>
    
    <!--===++ End of [Job 03 - Day 5] (1) ++===-->
  </body>
  <!-- End of BODY -->

</html>
<!-- End of HTML -->

