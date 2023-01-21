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
* @name User 
* @file user.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.2
*
* @test test/user.php
* 
*
* Usage:
*
*   1-|> // Register a user
*    -|>
*    -|> require_once __DIR__ . '/user.php';
*    -|> use Runtrack3 as rt3;
*    -|>
*    -|> $user = new rt3\User();
*    -|>
*    -|> $email = 'abraham.ukachi@laplateforme.io';
*    -|> $password = '*******'; # <- hidden ;) but must be a `string`
*    -|> $firstname = 'Abraham';
*    -|> $lastname = 'Ukachi';
*    -|> 
*    -|> $user->register($email, $password, $firstname, $lastname);
*     
*     
*   2-|> // Connect/Login a user
*    -|> 
*    -|> $user->connect('abraham.ukachi@laplateforme.io', '*******');
*
*     
*   3-|> // Handling user response
*    -|> 
*    -|> $user->disconnect(); # <- disconnect the user
*    -|>
*    -|> $success = $user->getResponseSuccess();
*    -|> $status = $user->getResponseStatus();
*    -|> $message = $user->getResponseMessage();
*    -|> 
*    -|> if ($status == User::$STATUS_SUCCESS_OK) { # <- or simply use `$success` 
*    -|>  echo "User has been disconnected - " . $message;
*    -|> }
*
*    
*
* ============================
*     >>> DESCRIPTION <<<
* ~~~~~~~~ (French) ~~~~~~~~~
*
* - Commencez par créer une base de données “utilisateurs” contenant 
*   une table “utilisateurs” et ayant comme champs “id”, “nom”, “prenom”, “email” et “password”.
* 
* ============================
*
* ~~~~~~~~ (English) ~~~~~~~~~
*
* - Start by creating a “users” database containing a “users” table and 
*   having “id”, “name”, “first name”, “email” and “password” as fields. 
*
* ============================
*/


/*
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * MOTTO: I'll always do more 😜!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

// Declare a namespace called `Runtrack3`
namespace Runtrack3;

// required files
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/ResponseHandler.php';

// Using PDO (Core PHP Class)
use PDO;


// start a session
session_start();




/**
 * Declare a class named `User` 
 */
class User extends Database {
  // Using some traits (a.k.a step parents) in this class
  use ResponseHandler;

  // Define some constants...

  // public constants
  // VALIDATEs
  public const VALIDATE_EMAIL = 771;
  public const VALIDATE_PASSWORD = 772;
  public const VALIDATE_FIRST_NAME = 773;
  public const VALIDATE_LAST_NAME = 774;

  // Defining some private properties...
  // NOTE: These are properties that can only by accessed by this `User` class.
  private $id;
  private $password;
  
  
  // Defining some public properties...
  // NOTE: These are properties that can be accessed by everybody. duh! it's public!! #LOL
  public $email;
  public $firstname;
  public $lastname;

  /**
   * Create a constructor to initialize the properties of an object upon creation.
   * NOTE: PHP will automatically call this constructor whenever an object of `User` is created.
   *
   * @param string $email : The email of the user 
   * @param string $password : The password of the user
   * @param string $firstname : The first name of the user
   * @param string $lastname : The last name of the user
   */
  public function __construct($email = null, $password = null, $firstname = null, $lastname = null) {
    // call the constructor of PDO Database
    parent::__construct(Database::TYPE_PDO);

    // IDEA: Register or connect the user automatically based on the given/passed arguments.
    // However, all the arguments passed are ignored, if there's already a connected user

    // So, if the user is already connected...
    if ($this->isConnected()) {
      // ...get all his/her info as `userData`
      $userData = $this->getAllInfos();

      // Populate the user's data in this class with `userData`
      $this->populateUserData($userData);

    } else { # <- user is not connected
       
      // >> CHALLENGE: Do not use `isset()` in this constructor #LOL
      // << Challenge Accepted !!!

      printf("\n\n[TEST]: NO CONNECTED USER YET!!!\n\n"); 
      
      // get all arguments of this constructor as `args`
      $args = func_get_args();
       
      // Using our beloved ternary statement, check if all arguments are `null`.
      // Well, technically: if the length of an 'only-null' list is equal to the length of `args`...
      // TODO:? Use `array_unique()` function instead 
      $allNullArgs = (count(array_keys($args, null)) == count($args)) ? true : false;
      
      
      // Checking if only `email` and `password` parameters were passed in the constructor...
      // IDEA: The first two parameters are `email` and `password`. Therefore the size or length of `args` must be 2 and *NOT NULL*.
      // NOTE: We could also use PHP's built-in `ReflectionFunction` class, to get the exact parameter's name.
      $onlyEmailAndPassword = (count($args) == 2) ? true : false;
  
      
      // Check if all arguments were passed to this constructor,
      // using our beloved ternary statement again #codeReadability
      $allArgsPassed = (count($args) == 4) ? true : false; # <- 4 is the total number of params
  
  
      // If all arguments are not null...
      if (!$allNullArgs) {

        // ..if there're only email and password arguments...
        if ($onlyEmailAndPassword) {
          // ...connect the user
          $this->connect($email, $password);
           
        } elseif ($allArgsPassed) { # <- all arguments were passed
          // register the user
          $this->register($email, $password, $firstname, $lastname);
           
        } else {
          // do something else obv.
        }
  
        // DEBUG [4dbsmaster]: tell me about it :)
        // printf("\x1b[33mAll arguments are not null \x1b[0m\n");
        // printf("\x1b[34m(STATUS_SUCCESS_OK): %d \x1b[0m\n", self::$STATUS_SUCCESS_OK);
        
      }
  
      
  
      // DEBUG [4dbmaster]: tell me about `args` ;)
      // print_r($args);
      // printf("onlyEmailAndPassword => %s\n", json_encode($onlyEmailAndPassword));
      // printf("all parameters were passed => %s\n", json_encode($allArgsPassed));
  
    }


  }

  
  // PUBLIC SETTERS

  // PUBLIC GETTERS
  
  // PUBLIC METHODS


  /**
   * Registers a new user.
   *
   * @param string $email : The email of the user 
   * @param string $password : The password of the user
   * @param string $firstname : The first name of the user
   * @param string $lastname : The last name of the user
   *
   * @return array|bool - A list containing all the user's information, OR Returns TRUE if the registration is successful.
   */
  public function register($email, $password, $firstname, $lastname) {
    // Initialize the `registerResult` variable
    $registerResult = false;

    echo "[register]: before" . "<br>";

    // Do not register this user, if there's a user already connected
    if ($this->isConnected()) {
      // Update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_UNAUTHORIZED, "User Already Connected: Disconnect the connected user, to register a new user");
      // Return the FALSE `registerResult` 
      return $registerResult;
    }

    echo "[register]: after" . "<br>";

    // Checking all fields/arguments and updating the response (i.e. success, status & message) accordingly...

    // If any of the fields / arguments is not passed or is empty...
    if (!isset($email) || !isset($password) || !isset($firstname) || !isset($lastname) 
      || empty(trim($email)) || empty(trim($password)) || empty(trim($firstname)) || empty(trim($lastname))) {
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Empty Fields: Please fill in all required fields");

    } else {

      // Validating all required fields...
      
      if (!$this->validate($email, self::VALIDATE_EMAIL)) { # <- failed to validate `email`
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Email: Please enter a valid email address");

      }elseif (!$this->validate($password, self::VALIDATE_PASSWORD)) { # <- failed to validate `password`
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Password: Must be at least 6 characters long");

      }elseif (!$this->validate($firstname, self::VALIDATE_FIRST_NAME)) { # <- failed to validate `firstname`
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Firstname: Must be ONE word");

      }elseif (!$this->validate($lastname, self::VALIDATE_LAST_NAME)) { # <- failed to validate `lastname`
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Lastname: Must be ONE word");

      }else {
        
        // Do not proceed, if this email has already been registered
        if ($this->isEmailRegistered($email)) {
          // Update the response accordingly ;)
          $this->updateResponse(0, self::$STATUS_ERROR_FORBIDDEN, "Registration Failed: Email already exists");
          // Return the FALSE `registerResult`
          return $registerResult;
        }


        try { # <- Let's try to register this user rn, shall we?
        
          // Get the hashed password as `hashPassword`
          $hashPassword = password_hash($password, PASSWORD_DEFAULT);

          // Create an SQL query string to register the user as `register_user_query`
          $register_user_query = "
          INSERT INTO `{$this->db_tablename}` (
            " . self::FIELD_EMAIL . ",
            " . self::FIELD_PASSWORD . ",
            " . self::FIELD_FIRST_NAME . ",
            " . self::FIELD_LAST_NAME . "
            ) 
          VALUES (?, ?, ?, ?)
          ";
          
          // DEBUG [4dbsmaster]: tell me about it ;)
          printf("\x1b[2m[register](1):\x1b[0m register_user_query => %s\n", $register_user_query);
          
          // Prepare our PDO Statement as `pdo_stmt`,
          $pdo_stmt = $this->pdo->prepare($register_user_query);
          
          // Bind parameters to our specified variables
          // NOTE: PARAM_STR is parameter's default explicit data `type`, 
          // but I opted to include them below anyways...bite me!!!
          $pdo_stmt->bindParam(1, $email, PDO::PARAM_STR);
          $pdo_stmt->bindParam(2, $hashPassword, PDO::PARAM_STR); # <- using the hashed password instead here ;)
          $pdo_stmt->bindParam(3, $firstname, PDO::PARAM_STR);
          $pdo_stmt->bindParam(4, $lastname, PDO::PARAM_STR);
          
          // Execute `pdo_stmt` against our database, to register this user
          $pdo_stmt->execute();

          // DEBUG [4dbsmaster]: tell me about it ;)
          printf("\x1b[2m[register](2):\x1b[0m pdo_stmt => %s", print_r($pdo_stmt, true)); 

          // Update the response accordingly ;)
          $this->updateResponse(1, self::$STATUS_SUCCESS_CREATED, "Registration Successful: User added to database successfully!");


          // IDEA: Return all the user's info, by creating an array/list and returning it with 
          // the user's `id` that's retrieved from the database.
          
          // Get the user's `id` using the given `email`
          $id = $this->getUserIdByEmail($email);

          
          // Change/Convert this `id` into a token using our `encodeId()` function as `encodedId`
          $encodedId = $this->encodeId($id);
          
          // Create a short-syntax associative array named `userData`,
          // which contains all the newly registered user's personal data.
          // NOTE: We're using the hashed password instead, for security reasons ;)
          $userData = [
            self::FIELD_ID => $encodedId,
            self::FIELD_EMAIL=> $email,
            self::FIELD_PASSWORD => $hashPassword,
            self::FIELD_FIRST_NAME => $firstname,
            self::FIELD_LAST_NAME => $lastname
          ];


          // DEBUG [4dbsmaster]: tell me about this `userData` ;)
          printf("\x1b[2m[register](3):\x1b[0m userData => %s\n", print_r($userData));

          // Return the user data (i.e. `userData`)
          return $userData;
        
        } catch (PDOException $e) {
          // Update the response accordingly ;)
          $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Registration Failed: " . $e->getMessage());
          // Return FALSE
          return false;
        }

      }

      // DEBUG [4dbsmaster]: tell me about it :)
      printf("[register](1): email -> $email && password -> $password \n");
      printf("[register](2): firstname -> $firstname && lastname -> $lastname \n");

    }  


    // Return `registeredResult` 
    return $registeredResult;
  }


  /**
   * Validates the given `value`, using the specified `mode`
   *
   * @param string $value - The *modifiable* value to validate
   * @param int $mode - The id of the validation mode/filter to apply (eg. VALIDATE_LOGIN, VALIDATE_PASSWORD, etc)
   *
   * @return bool $result - Returns TRUE if the validation was successful
   */
  public function validate(&$value, $mode) {
    // Initialize the `result` variable
    $result = false;

    // trim the value
    $value = trim($value);
    // convert special characters of the value
    // $value = htmlspecialchars($value);


    switch ($mode) {

    case self::VALIDATE_EMAIL:
      // validate the email
      $result = filter_var($value, FILTER_VALIDATE_EMAIL);
      printf("\n\n[TEST](validate): [VALIDATE_EMAIL] result => $result\n\n");
      break;

      /* 
       * Old code from v0.0.1 
       *
       * $value = htmlspecialchars(stripslashes($value)); # <- strip the slashes and encode special characters
       * login must not contain special characters, only '-' and '.' is allowed
       * $result = (!preg_match('/[\'^£$%&*()}{@#~?><>,|=_+¬]/', $value)) ? true : false;
       */ 
    case self::VALIDATE_PASSWORD:
      $value = htmlspecialchars($value); # <- encode special characters
      // password must be at least 6 characters long
      $result = (strlen($value) >= 6) ? true : false;
      printf("[validate]: password value => %s\n", $value);
      break;
    case self::VALIDATE_FIRST_NAME:
      $value = htmlspecialchars($value); # <- encode special characters
      // first name must be ONE word 
      $result = (count(explode(' ', $value)) == 1) ? true : false;
      break;
    case self::VALIDATE_LAST_NAME:
      $value = htmlspecialchars($value); # <- encode special characters
      // last name must be ONE word 
      $result = (count(explode(' ', $value)) == 1) ? true : false;
      break;
    }

    //print_r($value);

    // DEBUG [4dbsmaster]: tell me about it ;)
    printf("\n\x1b[32m[validate]: value => $value & mode => $mode \x1b[0m\n");

    // return the `result`
    return $result;
  }
   
   
  /**
   * Connects an existing user.
   *
   * @param string $email : The email of the user
   * @param string $password : The password of the user
   *
   * @return bool - Returns TRUE if the user was connected successfully
   */
  public function connect($email, $password) {
    // Intialize the `connectResult` variable
    $connectResult = false;

    // DEBUG [4dbsmaster]: tell me about it ;)
    printf("\n\x1b[32m[connect](1): email => $email & password => $password \x1b[0m\n");
    printf("\n\x1b[32m[connect](2): this->email => $this->email\x1b[0m\n");

    // If either the `email` or `password` is empty...
    if (!isset($email) || !isset($password) 
      || empty(trim($email)) || empty(trim($password))) {
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Invalid email or password");
      // Return FALSE `connectResult`
      return $connectResult;
      
    } elseif ($this->isConnected()) { # <- If a user is already connected...
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_UNAUTHORIZED, "User is already connected");
      // Return FALSE `connectResult`
      return $connectResult;
    }

    // Validating both email and password...
          
    if (!$this->validate($email, self::VALIDATE_EMAIL) 
      || !$this->validate($password, self::VALIDATE_PASSWORD)) { # <- If email and password fail validation process...
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Login failed: Incorrect email or password");
      // return FALSE `connectResult`
      return $connectResult;
    }
    
    
    // STEP 1: Verifying the email...

    // DEBUG [4dbsmaster]: tell me about it ;)
    printf("\n\n[DEBUG]: Verifying the email ($email) in database...\n\n"); 
    
    // Do not proceed, if this email has not been registered or doesn't exist in the database
    if (!$this->isEmailRegistered($email, false)) {
      // Update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_FORBIDDEN, "Login failed: Email does not exist");
      // Return the FALSE `connectResult`
      return $connectResult;
    }
    
     
    // STEP 2: Verifying the password...
    
    // Retrieve the user's hashed password as `hashPassword` from the database, using his/her `email`
    $hashPassword = $this->getPasswordByEmail($email);

    // Verify both `password` and `hashPassword` as `passwordVerified`
    $passwordVerified = password_verify($password, $hashPassword);
    
    // If passwords could not be verified...
    if (!$passwordVerified) {
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Login failed: Incorrect password");
      // return FALSE
      return false;
    }
    
    
    // Trying to connect the user with the given `email` and `password`...

    // Create an SQL query string to connect the user as `connect_user_query`
    $connect_user_query = "
    SELECT * FROM `$this->db_tablename`
    WHERE " . self::FIELD_EMAIL . " = ?
    AND " . self::FIELD_PASSWORD . " = ?
    ";
     
    // DEBUG [4dbsmaster]: tell me about it
    printf("[connect]: connect_user_query => %s", $connect_user_query);
    
    
    // Prepare our pdo statement as `pdo_stmt`, using the `connect_user_query`
    $pdo_stmt = $this->pdo->prepare($connect_user_query);
    // Bind parameters to our specified variables
    $pdo_stmt->bindParam(1, $email, PDO::PARAM_STR);
    $pdo_stmt->bindParam(2, $hashPassword, PDO::PARAM_STR);

    // Execute `pdo_stmt` against our database, to connect this user
    $pdo_stmt->execute();

    // User is found, if the number of rows returned by `pdo_stmt` is not 0 or is a positive number    
    $foundUser = $pdo_stmt->rowCount() ? true : false;

    // If a user was found... 
    if ($foundUser) {
      // ...This means that he/she has been connected successfully
      // So, set the `connectResult` to TRUE
      $connectResult = true;

      // Retrieve all his/her personal data
      // as an associative array named `userData`
      $userData = $pdo_stmt->fetch(PDO::FETCH_ASSOC);

      // Get the user's id as `userId`
      $userId = (int) $userData['id'];

      // Encode `userId` as `encodedId`
      $encodedId = $this->encodeId($userId);

      // update user's `id` in `userData` with the `encodedId`
      $userData['id'] = $encodedId;
      
      // Populate the user data
      $this->populateUserData($userData);

      // Add `userData` to SESSION as `user` session variable
      // TODO: Just add a token to the session instead (eg. 'user_token' or ['user']['token'])
      $_SESSION['user'] = $userData;
      
      // Update the response accordingly
      $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "Login successful: User is connected", $userData);

    }else { # <- user could not be connected
       
      // Update the response accordingly
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Login failed: Incorrect email and password");
    }
    
    // DEBUG [4dbsmaster]: tell me about it :)
    printf("[connect](1): email -> %s && password -> %s\n", $email, $password);
    printf("[connect](2): hashPassword -> %s && connectResult ? %s\n", $hashPassword, json_encode($connectResult));
    printf("[connect](3): userData -> %s\n", json_encode($userData));

    // Return `connectResult`
    return $connectResult;
  }


  /**
   * Disconnects the user.
   *
   * @return bool $disconnectResult - Returns TRUE if the user was disconnected successfully
   */
  public function disconnect() {
    // Initialize the `disconnectResult`
    $disconnectResult = false; # <- Let's assume the user has not been disconnected yet ;)

    // IDEA: Remove the `user` data from PHP's session superglobal (i.e. `$_SESSION`)
    // TODO:? Use a token instead
    

    // If the user is connected or there's a session variable named 'user'...
    if ($this->isConnected() || isset($_SESSION['user'])) {
      // ...remove the `user` data from SESSION
      unset($_SESSION['user']);
      // Update the response accordingly ;)
      $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "Logout successful: User is disconnected");
      // Set the `disconnectResult` to TRUE
      $disconnectResult = true;
      
    }else { # <- user is not connected
      // Update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Logout failed: User is not connected");
    }
     
    // DEBUG [4dbsmaster]: tell me about it :)
    printf("\x1b[2m[disconnect]:\x1b[0m disconnectResult ? %s\n", json_encode($disconnectResult));

    // Return `disconnectResult`
    return $disconnectResult;
  }

  /**
   * Deletes the user.
   * NOTE: This method also disconnects the user.
   * 
   * @return bool $deleteResult - Returns TRUE if the user was deleted successfully
   */
  public function delete() {
    // Initialize the `deleteResult` variable
    $deleteResult = false;

    
    // If the user is connected...
    if ($this->isConnected()) {
      // ...try to delete the user

      try {
        // Create an SQL query string to delete the user as `delete_user_query`
        // NOTE: This query uses the user's id for deletion
        $delete_user_query = "
        DELETE FROM `{$this->db_tablename}`
        WHERE id = ? 
        ";
        
        
        // Get the user's *real* (not token / encoded) id as `userId`
        $userId = $this->getUserId();

        // DEBUG [4dbsmaster]: tell me about it ;)
        printf("\x1b[2m[delete]:\x1b[0m delete_user_query => %s \n userId => %d", $delete_user_query, $userId);

        // Prepare our PDO Statement as `pdo_stmt`, using the `delete_user_query`
        $pdo_stmt = $this->pdo->prepare($delete_user_query);

        // Bind parameters to our specified variables
        $pdo_stmt->bindParam(1, $userId, PDO::PARAM_INT);

        // Execute the `pdo_stmt` againt our database, to delete the user
        $pdo_stmt->execute();
        
        // User is deleted if the number of rows returned by `pdo_stmt` is not 0 or FALSE
        // NOTE: full ternary statement was used here for #codeReadability
        $userDeleted = $pdo_stmt->rowCount() ? true : false;

        // If the user was deleted successfully...
        if ($userDeleted) {
          // ...set `deleteResult` to TRUE
          $deleteResult = true;

          // disconnect the user (as per the project requirement)
          $this->disconnect();

          // update the response accordingly ;)
          $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "User deleted successfully");

        } else { # <- deletion of user failed
          // ...update the response accordingly ;)
          $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "User deletion failed");
        }

      } catch (PDOException $e) {
         $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Error deleting user: " . $e->getMessage());
      }

    }
    
    
    // DEBUG [4dbsmaster]: tell me about it :)
    printf("\x1b[2m[delete]:\x1b[0m deleteResult ? %s", json_encode($deleteResult));

    // Return `deleteResult`
    return $deleteResult;
  }


  /**
   * Updates the user's personal info.
   * NOTE: This method updates the properties of this class and corresponding infos in database
   *
   * @param string $email : (optional) The email of the user 
   * @param string $password : (optional) The password of the user
   * @param string $firstname : (optional) The first name of the user
   * @param string $lastname : (optional) The last name of the user
   *
   * @return array $updateResult - An indexed array of all the fields that were updated successfully. Returns **empty** (i.e. `[]`), if no field/column was updated.
   */
  public function update($email = null, $password = null, $firstname = null, $lastname = null) {
    // Initialize the `updateResult` variable,
    // by setting it to an empty array / list.
    $updateResult = [];

    // If the user is connected ...
    if ($this->isConnected()) {

      // IDEA: To really make each field optional, update them separately and 
      //       append their name to the `updatedFields` list   
      // TODO: Handle each field error correctly ;)


      // Updating Email and append it to `updateResult`
      $this->updateEmail($email) && ($updateResult[] = self::FIELD_EMAIL);

      // Updating Password and append it to `updateResult`
      $this->updatePassword($password) && ($updateResult[] = self::FIELD_PASSWORD);

      // Updating Firstname and append it to `updateResult`
      $this->updateFirstname($firstname) && ($updateResult[] = self::FIELD_FIRST_NAME);

      // Updating Lastname and append it to `updateResult`
      $this->updateLastname($lastname) && ($updateResult[] = self::FIELD_LAST_NAME);



      // If the `updateResult` list is not empty...
      if (!empty($updateResult)) {
        // ...get the number of fields that were updated as `numFields`
        $numFields = count($updateResult);

        // Update the response accordingly ;)
        $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "Update successful: $numFields fields have been updated successfully");

      }else { # <- `updateResult` list is empty (a.k.a. no update) 

        // Update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Update failed: no field was updated");
      }


    } else { # <- user is not connected
    
      // Update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_NOT_FOUND, "Update error: User is not connected");
        
    }

    // DEBUG [4dbsmaster]: tell me about the `updateResult` list
    printf("[update]: updateResult =:");
    print_r($updateResult);

    // Return `updateResult`
    return $updateResult;
  }


  /**
   * Method used to update the user's password. 
   * NOTE: This method validates the given `password` before proforming an update.
   *
   * @param string $password - The password of the user
   *
   * @return bool $updatePasswordResult - Returns TRUE if the password was updated successfully
   */
  public function updatePassword($password) {
    // TODO: Do nothing if the given `password` is the same as the `password` property of this `User` class

    // Initalize the `updatePasswordResult` variable
    $updatePasswordResult = false;

    // If there's no `password`, or if `password` is empty...
    if (!isset($password) || empty(trim($password))) {
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Update failed: password is empty");
      // Return the FALSE `updatePasswordResult`
      return $updatePasswordResult;
    }

        
    // If the user is connected ...
    if ($this->isConnected()) {
      // ...validate then update the password


      // get the hashed password as `hashPassword` 
      $hashPassword = password_hash($password, PASSWORD_DEFAULT);

      // If the password failed the validation process...
      if (!$this->validate($password, self::VALIDATE_PASSWORD)) {
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Password: Must be at least 6 characters long");

      } elseif ($this->updateInfo(self::FIELD_PASSWORD, $hashPassword)) { # <- password passed the validation process & password update was successful
        // ...set `updatePasswordResult` to TRUE
        $updatePasswordResult = true;
        
        // Update the `password` property with the `hashPassword`
        $this->password = $hashPassword;

        // Update the response accordingly ;)
        $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "Update successful: Password updated successfully");

      } else { # <- password passed the validation but couldn't be updated. (hhmm.. internal error 🤔? )
        // Update the response accordingly ;)
        // with #1232 as an update error for debugging.
        $this->updateResponse(0, self::$STATUS_ERROR_INTERNAL_ERROR, "Update error #1232: Could not update password");
      }

    }

    // Return `updatePasswordResult`
    return $updatePasswordResult;
  }



  /**
   * Method used to update the user's email. 
   * NOTE: This method validates the given `email` before proforming an update.
   *
   * @param string $email - The email of the user
   *
   * @return bool $updateEmailResult - Returns TRUE if the email was updated successfully
   */
  public function updateEmail($email) {
    // TODO: Do nothing if the given `email` is the same as the `email` property of this `User` class

    // Initalize the `updateEmailResult` variable
    $updateEmailResult = false;

    // If there's no `email`, or if `email` is empty...
    if (!isset($email) || empty(trim($email))) {
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Update failed: email is empty");
      // Return the FALSE `updateEmailResult`
      return $updateEmailResult;
    }

    
    // If the user is connected ...
    if ($this->isConnected()) {
      // ...STEP1: check if this `email` already exists

      // If this email has already been registered or exist in the database...
      if ($this->isEmailRegistered($email, true)) { # <- FALSE: do not check `$this->email`
        // Update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_FORBIDDEN, "Update failed: email already exists");
        // Return the FALSE `updateEmailResult`
        return $updateEmailResult;
      }

      // STEP2 : validate then update the email

      // If the email failed the validation process...
      if (!$this->validate($email, self::VALIDATE_EMAIL)) {
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Email: Please enter a valid email address");

      } elseif ($this->updateInfo(self::FIELD_EMAIL, $email)) { # <- email passed the validation process & email update was successful
        // ...set `updateEmailResult` to TRUE
        $updateEmailResult = true;
        
        // Update the `email` property
        $this->email = $email;

        // Update the response accordingly ;)
        $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "Update successful: Email updated successfully");
         
      } else { # <- email passed the validation but couldn't be updated. (hhmm.. internal error 🤔? )
        // Update the response accordingly ;)
        // with #1233 as an update error for debugging.
        $this->updateResponse(0, self::$STATUS_ERROR_INTERNAL_ERROR, "Update error #1233: Could not update email");
      }

    }

    // Return `updateEmailResult`
    return $updateEmailResult;
  }



  /**
   * Method used to update the user's first name. 
   * NOTE: This method validates the given `firstname` before proforming an update.
   *
   * @param string $firstname - The first name of the user
   *
   * @return bool $updateFirstnameResult - Returns TRUE if the firstname was updated successfully
   */
  public function updateFirstname($firstname) {
    // TODO: Do nothing if the given `firstname` is the same as the `firstname` property of this `User` class

    // Initalize the `updateFirstnameResult` variable
    $updateFirstnameResult = false;

    // If there's no `firstname`, or if `firstname` is empty...
    if (!isset($firstname) || empty(trim($firstname))) {
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Update failed: firstname is empty");
      // Return the FALSE `updateFirstnameResult`
      return $updateFirstnameResult;
    }

        
    // If the user is connected ...
    if ($this->isConnected()) {
      // ...validate then update the firstname  

      // If the firstname failed the validation process...
      if (!$this->validate($firstname, self::VALIDATE_FIRST_NAME)) {
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Firstname: Must be ONE word");

      } elseif ($this->updateInfo(self::FIELD_FIRST_NAME, $firstname)) { # <- firstname passed the validation process & firstname update was successful
        // ...set `updateFirstnameResult` to TRUE
        $updateFirstnameResult = true;
        
        // Update the `firstname` property
        $this->firstname = $firstname;

        // Update the response accordingly ;)
        $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "Update successful: Firstname updated successfully");

      } else { # <- firstname passed the validation but couldn't be updated. (hhmm.. internal error 🤔? )
        // Update the response accordingly ;)
        // with #1234 as an update error for debugging.
        $this->updateResponse(0, self::$STATUS_ERROR_INTERNAL_ERROR, "Update error #1234: Could not update the first name");
      }

    }

    // DEBUG [4dbsmaster]: tell me about it ;)
    printf("\x1b[0m[updateFirstname]: getResponseMessage() => {$this->getResponseMessage()} \x1b[0m");

    // Return `updateFirstnameResult`
    return $updateFirstnameResult;
  }



  /**
   * Method used to update the user's last name. 
   * NOTE: This method validates the given `lastname` before proforming an update.
   *
   * @param string $lastname - The last name of the user
   *
   * @return bool $updateLastnameResult - Returns TRUE if the lastname was updated successfully
   */
  public function updateLastname($lastname) {
    // TODO: Do nothing if the given `lastname` is the same as the `lastname` property of this `User` class

    // Initalize the `updateLastnameResult` variable
    $updateLastnameResult = false;

    // If there's no `lastname`, or if `lastname` is empty...
    if (!isset($lastname) || empty(trim($lastname))) {
      // ...update the response accordingly ;)
      $this->updateResponse(0, self::$STATUS_ERROR_BAD_REQUEST, "Update failed: lastname is empty");
      // Return the FALSE `updateLastnameResult`
      return $updateLastnameResult;
    }

        
    // If the user is connected ...
    if ($this->isConnected()) {
      // ...validate then update the lastname  

      // If the lastname failed the validation process...
      if (!$this->validate($lastname, self::VALIDATE_LAST_NAME)) {
        // ...update the response accordingly ;)
        $this->updateResponse(0, self::$STATUS_ERROR_UNPROCESSABLE_ENTITY, "Invalid Lastname: Must be ONE word");

      } elseif ($this->updateInfo(self::FIELD_LAST_NAME, $lastname)) { # <- lastname passed the validation process & lastname update was successful
        // ...set `updateLastnameResult` to TRUE
        $updateLastnameResult = true;
        
        // Update the `lastname` property
        $this->lastname = $lastname;

        // Update the response accordingly ;)
        $this->updateResponse(1, self::$STATUS_SUCCESS_OK, "Update successful: Lastname updated successfully");

      } else { # <- lastname passed the validation but couldn't be updated. (hhmm.. internal error 🤔? )
        // Update the response accordingly ;)
        // with #1235 as an update error for debugging.
        $this->updateResponse(0, self::$STATUS_ERROR_INTERNAL_ERROR, "Update error #1235: Could not update the last name");
      }

    }

    // Return `updateLastnameResult`
    return $updateLastnameResult;
  }





  /**
   * Checks if the user is connected.
   * 
   * @return bool $connected - Returns TRUE if the user is connected
   */
  public function isConnected() {
    // Initialize the `connected` variable
    $connected = false;

    // IDEA: The user is only connected if the following is true:
    //       1. A `user` session variable exists
    //       2. The user is valid (i.e. his/her decoded `id` exists in the database)

    // Create a `userInSession` variable
    // and assign TRUE, if the session has been started and it has a 'user' variable,
    $userInSession = (isset($_SESSION) && isset($_SESSION['user'])) ? true : false;

    // If there's a user is in session...
    if ($userInSession) {
      // ...get the user's encoded `id` or token from session as `encodedId`
      $encodedId = $_SESSION['user']['id'];

      // Decode `encodedId` as `userId`
      $userId = $this->decodeId($encodedId);

      // Check if the user with this `userId` is valid or not,
      // and update the `connected` variable accordingly ;)
      $connected = $this->isValidUser($userId);

      // If there's a user in session that's not connected,
      // remove his/her `user` data from the session
      if ($connected == false) { unset($_SESSION['user']); }

      // DEBUG [4dbsmaster]: tell me about it :)
      printf("[isConected](2): encodedId => %s & userId (decoded) => %s\n", $encodedId, $userId);

    }


      // DEBUG [4dbsmaster]: tell me about it :)
      printf("[isConected](1): userInSession => %s & connected ? \n", json_encode($userInSession), json_encode($connected));

    // Return `connected`
    return $connected;
  }


  /* === PUBLIC GETTERS === */


  /**
   * Returns all the user's **CURRENT** personal information.
   * 
   * @param array $excludes - List of items that should be excluded from the user's info (e.g 'password')
   *
   * @return array - An associative array containing all the user's info (e.g: [ "email" => "abraham.ukachi@laplateforme.io", "password" => "******",...])
   */
  public function getAllInfos($excludes = []) {
    // Initialize the `allInfos` variable
    $allInfos = []; 
    
    // If the user is connected...
    if ($this->isConnected()) :
      // ...get the user's encoded `id` from session as `encodedId`
      $encodedId = $_SESSION['user']['id'];

      // Decode this `encodedId` as `userId`
      $userId = $this->decodeId($encodedId);

      // Create an SQL query string to retrieve all the user's current info as `user_info_query`
      $user_info_query = "
      SELECT * FROM `{$this->db_tablename}`
      WHERE " . self::FIELD_ID . " = ?
      ";

      // Prepare our PDO Statement as `pdo_stmt`, using the `user_info_query`
      $pdo_stmt = $this->pdo->prepare($user_info_query);

      // Bind parameters to our specified variables
      $pdo_stmt->bindParam(1, $userId, PDO::PARAM_INT);

      // Execute the `pdo_stmt` against our database, to retrive all the user's current info
      $pdo_stmt->execute();
      
      // Retrieve all of this user's info with `pdo_stmt` as `allInfos`
      $allInfos = $pdo_stmt->fetch(PDO::FETCH_ASSOC);

      // Change `id` in `allInfos` to the predefined `encodedId`
      $allInfos['id'] = $encodedId;
      
      // Removing unwanted items from the list,
      // For each item in the `excludes` list...
      foreach ($excludes as $item) {
        // ...remove that item 
        unset($allInfos[$item]);
        // DEBUG [4dbsmaster]: tell me about it ;)
        printf("$item has been excluded from the `allInfos` list\n");
      }

    endif;

    
    // DEBUG [4dbsmaster]: tell me about it :)
    print_r($allInfos);

    
    // Return `allInfos`
    return $allInfos;
    
  }



  /**
   * Returns the user's `email`.
   * NOTE: This is the email of a connected user.
   *
   * @return string
   */
  public function getEmail() {
    // get the email of the connected user, else return an empty string
    return $this->isConnected() ? $this->email : '';
  }


  /**
   * Returns the user's `firstname`.
   * NOTE: This is the first name of a connected user.
   *
   * @return string
   */
  public function getFirstname() {
    // get the first name of the connected user, else return an empty string
    return $this->isConnected() ? $this->firstname : '';
  }



  /**
   * Returns the user's `lastname`.
   *
   * @return string
   */
  public function getLastname() {
    // get the last name of the connected user, else return an empty string
    return $this->isConnected() ? $this->lastname : '';
  }
  


  // PRIVATE SETTERS

  // PRIVATE GETTERS


  /**
   * Retrieves the user's `id` from the database with the given `email`
   *
   * @param string $email - The email of the user
   *
   * @return int $userId - The id of the user
   * @private
   */
  private function getUserIdByEmail($email) {
    // TODO:? Make suer the `email` is valid before proceeding
    
    // Initialize the `userId` variable
    $userId = -1;
    
    // Create an SQL query string to retrieve the user's id as 'get_userid_query';
    $get_userid_query = "
    SELECT " . self::FIELD_ID . " FROM `{$this->db_tablename}`
    WHERE " . self::FIELD_EMAIL . " = ?
    ";

    // Prepare our PDO Statement as `pdo_stmt`, using the `get_userid_query`
    $pdo_stmt = $this->pdo->prepare($get_userid_query);

    // Bind parameters to our specified variables
    $pdo_stmt->bindParam(1, $email, PDO::PARAM_STR);

    // Execute the `pdo_stmt` against our database, to retrieve the user'id
    $pdo_stmt->execute();

    // The user's `id` is found, if the number of rows returned by `pdo_stmt` is not 0 or is a positive number (i.e. 1)
    $userIdFound = ($pdo_stmt->rowCount()) ? true : false;

    // If the user's id is found...
    if ($userIdFound) {
      // retrieve the user's id data from `pdo_stmt` as `userIdData`
      $userIdData = $pdo_stmt->fetch(PDO::FETCH_ASSOC);
      // get/update the user's `id` from `userIdData`,
      // while making sure it's an `int` (integer/number)
      $userId = (int) $userIdData['id'];
    }

    // Return the `userId`
    return $userId;
  }


  /**
   * Retrieves the password of the given `email` from the database.
   *
   * @return string $password - The hashed password of the user
   */
  private function getPasswordByEmail($email) {
    // TODO:? Make suer the `email` is valid before proceeding

    // Initialize the `password` variable
    $password = '';

    // Create an SQL query string to retrieve the user's password as 'user_password_query';
    $user_password_query = "
    SELECT ". self::FIELD_PASSWORD . " FROM `{$this->db_tablename}`
    WHERE " . self::FIELD_EMAIL . " = ?
    ";

    // Prepare our PDO Statement as `pdo_stmt` using the `user_password_query`
    $pdo_stmt = $this->pdo->prepare($user_password_query);

    // Bind parameters to our specified variables
    $pdo_stmt->bindParam(1, $email, PDO::PARAM_STR);

    // Execute the `pdo_stmt` against our database, to retrieve the user's password
    $pdo_stmt->execute();

        
    // The user's `password` is found, if the number of rows returned by `pdo_stmt` is not 0 or is a positive number (i.e. 1)
    $passwordFound = ($pdo_stmt->rowCount()) ? true : false;

    // If the user's password is found...
    if ($passwordFound) {
      // retrieve the user's password data from `pdo_stmt` as `paasswordData`
      $passwordData = $pdo_stmt->fetch(PDO::FETCH_ASSOC);
      // get the `password` from `passwordData`, and update `password` variable
      $password = $passwordData['password'];
    }
     
    // DEBUG [4dbsmaster]: tell me about it ;)
    printf("[getPasswordByEmail]: email => %s & password => %s\n", $email, $password);
     
    // Return `password`
    return $password;
  }

  
  /**
   * Returns the "real" / decoded user's id
   * NOTE: This method decodes the currently available `id` property of this class.
   *
   * @return int $userId - The user's id
   */
  private function getUserId() {
    // Get the decoded id of this class as `userId` w/ default key
    $userId = $this->decodeId($this->id);

    // TODO:? Do something awesome with the `userId` here ;)
    
    // return `userId`
    return $userId;
  }



  // PRIVATE METHODS


  /**
   * Encodes the given `id` with the specified `key`.
   * NOTE: This encryption is performed using PHP's bult-in `bin2hex()` function.
   *
   * @param int $id - The id of the user 
   * @param string $key - The key to use for encryption
   * 
   * @return string $hex - Returns a hexadecimal representation of `id`, using the `key`
   * @private
   */
  private function encodeId($id, $key = 'students-laplateforme.io') {
    // Define the separator as `sep`
    $sep = "_";
    // join both `id` and `key` a binary data named `bin`, using `sep` 
    $bin = implode($sep, array($key, $id)); # <- returns eg. 'students-laplateforme.io_20' (if 20 is the value of `id`)
    // get the hexadecimal representation of `bin` as `hex`
    $hex = bin2hex($bin); 

    // Return `hex`
    return $hex;
  }


  /**
   * Decodes the given `encodedId`, using the specified `key`.
   * NOTE: This decryption is performed using using PHP's built-in `hex2bin()` function.
   *
   * @param string $encodedId - The encoded id / hexadecimal representation
   * @param string $key - The key to use for decryption
   *
   * @return int $id - Returns the decoded id (-1 is returned if decryption fails)
   * @private
   */
  private function decodeId($encodedId, $key = 'students-laplateforme.io') {
    // Initialize the `id` variable
    $id = -1;
    
    // Define the separator as `sep`
    $sep = "_";


    // get the decoded / hexadecimally encoded id as `bin`
    $bin = hex2bin($encodedId);

    
    // split the `bin` into a key/id array
    $arr = explode($sep, $bin);

    // REMEMBER: Encryption Syntax is 'KEY_ID' (eg.: 'students-laplateforme.io_100')
    // If the first item / key in the array matches the given `key`...
    if ($arr[0] === $key) {
      // ...update the `id` accordingly
      $id = (int) $arr[1];
    }
    
    // DEBUG [4dbsmaster]: tell me about this `encodedId` ;)
    // printf("[decodeId]: encodedId => %s & id => %d\n", $encodedId, $id);

    // Return the `id`
    return $id;
  }



  /**
   * Verifies that the given `id` matches a `hex`.
   *
   * @param string $id - The user's id
   * @param string $hex - A hexadecimal representation of an id
   *
   * @return bool - Return TRUE if the `id` and `hex` match
   */
  private function verifyId($id, $hex) {
    // return TRUE if the decoded `hex` is equal the given `id`,
    // using our beloved ternary statement.
    return ($this->decodeId($hex) === $id) ? true : false;
  }


  
  // ==========
  
  /**
   * Checks if the specified user `id` is valid (i.e. it was found in the database)
   * 
   * @param int $id - The id of a user
   *
   * @return bool $validUser - Returns TRUE if there's a user with this `id` in the database.
   * @private
   */
  private function isValidUser($id) {
    // Do nothing if there's no id
    if (!isset($id) || empty(trim($id))) { return false; }
    
    // Create an SQL query string to select the user 
    // with the specified `id` as `check_user_query`
    $check_user_query = "
    SELECT " . self::FIELD_ID . " from `$this->db_tablename`
    WHERE " . self::FIELD_ID . " = ?
    ";
     
    // Prepare our PDO Statement as `pdo_stmt`, using the `check_user_query`
    $pdo_stmt = $this->pdo->prepare($check_user_query);

    // Bind parameters to our specified variables
    $pdo_stmt->bindParam(1, $id, PDO::PARAM_INT);
    
    // Execute our `pdo_stmt` against our database, to select/check the user
    $pdo_stmt->execute();  
    
    
    // IDEA: The user is valid if the number of rows returned by the `pdo_stmt` 
    // is not 0, a positive number or greater than 0.

    // Using our beloved ternary statement, 
    // create a variable named `validUser` that implements our idea.
    $validUser = ($pdo_stmt->rowCount()) ? true : false;

    // Return `validUser`
    return $validUser;
  }


  /**
   * Checks if the given `email` has been registered in the database
   * TODO:? Rename this method to `checkEmail` 
   * 
   * @param string $email - The email of the user
   * @param bool $excludeCurrentEmail - If TRUE, the current email (i.e. `$this->email`) will not be checked
   *
   * @return bool $registered - Returns TRUE if the given `email` is registered.
   * @private
   */
  private function isEmailRegistered($email, $excludeCurrentEmail = false) {
    // Return FALSE if there's no `email`
    if (!isset($email) || empty(trim($email))) { return false; }

    // Create an SQL query string to select any user
    // with the specified `email` as `check_email_query`
    $check_email_query = "
    SELECT " . self::FIELD_EMAIL . " FROM `$this->db_tablename`
    WHERE " . self::FIELD_EMAIL . " = ? 
    ";
    
    // If the current email should be excluded...,
    //  append the following statement to `check_email_query`.
    if ($excludeCurrentEmail) { $check_email_query .= " AND NOT " . self::FIELD_EMAIL . " = ?"; }

     
    // Prepare our PDO Statement as `pdo_stmt` using the `check_email_query`
    $pdo_stmt = $this->pdo->prepare($check_email_query);

    // Bind parameters to our specified variables
    $pdo_stmt->bindParam(1, $email, PDO::PARAM_STR);
    // Bind the second parameter, if the current email should be not be checked
    if ($excludeCurrentEmail) { $pdo_stmt->bindParam(2, $this->email, PDO::PARAM_STR); }
   

    // Execute the `pdo_stmt` against our database, to check if given `email` is registered
    $pdo_stmt->execute();



    // IDEA: The email is registered if the number of rows returned by the `check_email_query` 
    // *IS NOT* 0, a positive number or greater than 0.

    // Using our beloved ternary statement, 
    // create a variable named `registered` that implements our idea.
    $registered = ($pdo_stmt->rowCount()) ? true : false;

    // Return `registered`
    return $registered;
  }

  /**
   * Method used to populate the user's current info with the given `userData`
   *
   * @param array $userData - An associative array containing the full user's data (i.e. 'id', 'email', 'password', etc)
   * @param array $excludes - List of items that should be excluded, and therefore not populated.
   */
  private function populateUserData($userData, $excludes = []) {
    // TODO: Make user `userData` is not null/undefined, before proceding

    // for each key/value data in `userData`...
    foreach ($userData as $key => $value) {
      // If the `key` is not in the `excludes` list...
      if (!in_array($key, $excludes)) {
        // ...populate this data with the corresponding `key` and `value`
        $this->{$key} = $value;
        
        // DEBUG [4dbsmaster]: tell me about it ;)
        printf("\n[populateUserData]: key => %s & value => %s\n", $key, $value);
      }

    }

  }



  /**
   * Method used to update the specified `info` in the database, with the given `value`
   * NOTE: The user must be logged in for a info to be updated.
   *
   * @param string $info - The name of the info to update (eg. 'email', 'password', ...)
   * @param string $value - The value to use for the update
   *
   * @return bool $updateInfoResult - Returns TRUE if the info has been updated successfully
   * @private
   */
  private function updateInfo($info, $value) {
    // Initialize the `updateInfoResult` variable by setting it to FALSE
    $updateInfoResult = false;
    
    // If the user is connected...
    if ($this->isConnected()) {
      // ...create an SQL query string to update the specified info 
      // with the given value as `update_col_query`

      // Get the user's real `id` as `userId`
      $userId = $this->getUserId();

      $update_col_query = "
      UPDATE `{$this->db_tablename}`
      SET $info = ?
      WHERE " . self::FIELD_ID . " = ?
      ";
      
      try { # <- Trying to update our database...

        // Prepare our PDO Statement as `pdo_stmt` using the `udpate_col_query`
        $pdo_stmt = $this->pdo->prepare($update_col_query);

        // Bind parameters to our specified variables
        $pdo_stmt->bindParam(1, $value, PDO::PARAM_STR);
        $pdo_stmt->bindParam(2, $userId, PDO::PARAM_INT);

        // Execute the `pdo_stmt` against our database
        $pdo_stmt->execute();
        
        // Set `updateInfoResult` to TRUE, if the number of rows affected is 1 or more (not 0)
        $updateInfoResult = ($pdo_stmt->rowCount()) ? true : false;

        // DEBUG [4dbsmaster]: tell me about it ;)
        printf("[updateInfo](1): Update successful ? %s \n", json_encode($updateInfoResult));
        printf("[updateInfo](2): info => %s & value => %s\n", $info, $value);
        
      } catch (PDOException $e) { # <- An error occurred during our database update 
        
        // DEBUG [4dbsmaster]: tell me about it ;)
        printf("[updateInfo]: Error updating `$info` with '$value': %s\n", $e->getMessage());

        // TODO:? throw an exception here -or- exit / kill the script #LOL

      }

      
    }


    // Return `updateInfoResult`
    return $updateInfoResult;

  }


}
