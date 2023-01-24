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
* @job 01
* @day 07
* @file index.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.1
* 
* Usage:
*
*   1-|> open http://localhost/runtrack3/jour07/job01/index.php
*
*
* ======== Job 01 ==========
*      >>> DESCRIPTION <<<		
* ~~~~~~~~ (French) ~~~~~~~~~
* 
* - Créez un fichier index.php contenant les balises html de base (doctype, html, head, body). 
*   Dans votre body, créez un header avec une navigation et un footer contenant une liste de 
*   quatre liens (Accueil, Inscription, Connexion et Rechercher). Ils doivent tous pointer 
*   vers votre page index.php.
*
* ~~~~~~~~ (English) ~~~~~~~~
* 
* - Create an index.php file containing the basic html tags (doctype, html, head, body). 
*   In your body, create a header with a navigation and a footer containing a list of four 
*   links (Home, Register, Login and Search). They all have to point to your index.php page.
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
    <meta name="description" content="Job1 of Day7 - Runtrack3">

    <title>Job01 - Jour07 | Runtrack3</title>
  
  </head>
  <!-- End of HEAD -->

  <!-- BODY -->
  <body>

    <!--===++ [Job 01 - Day 7] (1) ++===-->

    <!-- HEADER -->
    <header>
      <!-- App Title -->
      <h2>Runtrack3 App</h2>

      <!-- NAV -->
      <nav>
        <!-- Home  -->
        <li><a href="index.php">Home</a></li>
        <!-- Register -->
        <li><a href="index.php">Register</a></li>
        <!-- Login -->
        <li><a href="index.php">Login</a></li>
        <!-- Search -->
        <li><a href="index.php">Search</a></li>

      </nav>
      <!-- End of NAV -->

    </header> 
    <!-- End of Header -->


    <!-- SECTION -->
    <section>

      <!-- Register Form -->
      <form id="registerForm">

        <h3>Sign Up</h3>
        <p>Fill the form below, to create a free <strong>Runtrack3</strong> acccount:</p>

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


    <footer></footer>

    <!--===++ End of [Job 01 - Day 5] (1) ++===-->
  </body>
  <!-- End of BODY -->

</html>
<!-- End of HTML -->

