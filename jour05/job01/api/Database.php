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
* @name Database
* @test test/database.php
* @file Database.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.2
* 
* Usage:
*   1-|> require_once __DIR__ . '/Database.php';
*    -|> Use Runtrack3 as rt3;
*    -|> $database = new rt3\Database('pdo'); // <- or 'mysqli'
*
*
*   2-|> // Handling database creation error
*    -|>
*    -|> if ($database->create_errno) {
*    -|>    echo $database->create_error;
*    -|>  }
*
*
*   3-|> // Handling database connection error
*    -|>
*    -|> if ($database->connect_errno) {
*    -|>    echo $database->connect_error;
*    -|>  }
*
*
*   4-|> $database = new rt3\Database(rt3\Database::TYPE_PDO, false);
*    -|> $database->dbCreation();
*
*/


/*
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * MOTTO: I'll always do more 😜!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

// Declare a namespace named `Runtrack3`
namespace Runtrack3;


// Using some core PHP Classes...

use pdo;
use mysqli;
use mysqli_driver;



// Uncomment the code below, to enable return type in PHP functions
// declare(strict_types=1);


/*
 * Declare a class named 'Database'.
 * NOTE: By default - upon instantiation, this class automatically creates 
 * the required database & subsequent table (if they don't already exist in `phpmyadmin`)
 *
 * Example usage:
 *  
 *    $database = new Runtrack3\Database(Runtrack3\Database::TYPE_PDO);
 *    $conn = $database->pdo;
 */
class Database {

  // public constants
  public const TYPE_MYSQLI = 'mysqli';
  public const TYPE_PDO = 'pdo';
  public const ERROR_NOT_FOUND = 0;
  public const ERROR_FOUND = 1;
  // fields - constants
  public const FIELD_ID = 'id';
  public const FIELD_EMAIL = 'email';
  public const FIELD_PASSWORD = 'password';
  public const FIELD_FIRST_NAME = 'prenom';
  public const FIELD_LAST_NAME = 'nom';


  // private properties
  private $db_host = '127.0.0.1';
  private $db_username = 'abraham-ukachi';
  private $db_password = 'root';
  private $db_type;

  // protected properties
  protected $db_name = 'utilisateurs';
  protected $db_tablename = 'utilisateurs';

  protected $mysqli;
  protected $pdo;

  // public properties
  // - connection errors
  public $connect_errno;
  public $connect_error;
  // - creation errors
  public $create_errno;
  public $create_error;



  // PUBLIC SETTERS

  // PUBLIC GETTERS

  // PUBLIC METHODS
  

  /**
   * Constructor that is automatically called whenever an object of this database gets created.
   *
   * @param string $db_type - The type of database connection (i.e. 'mysqli' or `pdo`)
   * @param bool $autoCreate - If TRUE, the database will be created automatically
   */
  public function __construct($db_type = self::TYPE_MYSQLI, $autoCreate = true) {

    // Intializing some properties...

    $this->db_type = $db_type;

    // creation errors
    $this->create_errno = 0;
    $this->create_error = "";

    // connection errors
    $this->connect_errono = 0;
    $this->connect_error = "";

    if ($autoCreate) :
      // Create the project-specific database (if it *DOES NOT* exist)
      $this->dbCreation();
    endif;

   print_r($this->getTableQuery());
  } 



  /**
   * Creates the project-specific database and table using the predefined type of database connection (i.e. `db_type`)
   * NOTE: This process is aborted, if the database and table already exists.
   *  
   * @return bool $result - Returns TRUE if the database was created successfully
   * @private
   */
  public function dbCreation() {
    // Initalize the `result` variable
    $result = false;

    // TODO:? Use a switch/case block here instead 🤔

    // If the database connection type is 'mysqli'...
    if ($this->db_type == $this::TYPE_MYSQLI) :

      // Connect to the database without a database name
      $this->dbConnectViaMysqli(false);

      // Just return $result|FALSE, if there's a connection error 
      if ($this->connect_errno) { return $result; } 
      
      // DEBUG [4dbsmaster]: tell me about it :)
      // echo "[MYSQLI]: connect ERRNO => $this->connect_errno & ERROR => $this->connect_error";


      // IDEA: At this point, the database connection is successful
      // Now, We wanna create our database (if it doesn't exist)

      // Create a database via MYSQLI,
      // and update the `result` variable accordingly
      $result = $this->dbCreateViaMysqli();

    elseif ($this->db_type == $this::TYPE_PDO) : // <- database connection type is 'pdo'
      // Connect to the database without a database name
      $this->dbConnectViaPdo(false);

      // Just return $result|FALSE, if there's a connection error 
      if ($this->connect_errno) { return $result; } 
      
      // DEBUG [4dbsmaster]: tell me about it :)
      // echo "[PDO]: connect ERRNO => $this->connect_errno & ERROR => $this->connect_error";


      // IDEA: At this point, the database connection is successful
      // Now, We wanna create our database (if it doesn't exist)

      // Create a database via PDO,
      // and update the `result` variable accordingly
      $result = $this->dbCreateViaPdo();

    endif;

    // return the `result` variable
    return $result;
  }




  /**
   * Method used to establish a database connection,
   * WARNING: The datbase name (i.e. `db_name`) will be used for connection
   *
   * @return object $conn - A `mysqli` or `pdo` database connection 
   */
  public function dbConnection() {
    // Initialize the `conn` variable
    $conn = null;

    // If the database connection type is MYSQLI... 
    if ($this->db_type == $this::TYPE_MYSQLI):
      // ...connect via mysqli
      $conn = $this->dbConnectViaMysqli(true);

    elseif ($this->db_type == $this::TYPE_PDO): // <- database connection is PDO
      // ...connect via pdo
      $conn = $this->dbConnectViaPdo(true);
    endif;

    // Return `conn`
    return $conn;
  }


  /**
   * Closes the current database connection
   */
  public function dbClose() {
    // If the database connection type is MYSQLI... 
    if ($this->db_type == $this::TYPE_MYSQLI):
      // ...close the `mysqli` connection by using the `close()` function
      $this->mysqli->close();

    elseif ($this->db_type == $this::TYPE_PDO): // <- database connection is PDO
      // ...close the `pdo` connection by setting the `pdo` object to null
      $this->pdo = null;
    endif;
  }




  // PRIVATE SETTERS

  // PRIVATE GETTERS

  /**
   * Returns the SQL query string to *safely* create our database
   * NOTE: This query contains a `utf8` character set and a `utf8_unicode_520_ci`. 
   * To learn more about this character encoding, check out this post on [Stark Overflow](https://stackoverflow.com/questions/766809/whats-the-difference-between-utf8-general-ci-and-utf8-unicode-ci)
   *
   * @return string
   */
  private function getDatabaseQuery() {
    return "CREATE DATABASE IF NOT EXISTS " . $this->db_name . " CHARACTER SET utf8 COLLATE utf8_unicode_520_ci";
  }

  /**
   * Returns the SQL query string to *safely* create the project-required table with columns in our database
   * @return string
   */
  private function getTableQuery() {
    return "CREATE TABLE IF NOT EXISTS " . $this->db_tablename . " (
      " . self::FIELD_ID . " INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      " . self::FIELD_EMAIL . " VARCHAR(50) NOT NULL,
      " . self::FIELD_PASSWORD . " VARCHAR(255) NOT NULL,
      " . self::FIELD_FIRST_NAME . " VARCHAR(30) NOT NULL,
      " . self::FIELD_LAST_NAME . " VARCHAR(30) NOT NULL
    )"; // <- TODO:? Specify an Engine like `innoDB` 

  }

  // PRIVATE METHODS
  

  /**
   * Method used to connect to the database via MYSQLI
   *
   * @param bool $useName - If TRUE, the database name (i.e. `db_name`) will be used for connection
   *
   * @return object $mysqli - The MYSQLI connection to the database
   * @private
   */
  private function dbConnectViaMysqli($useName = false) {
    // Reset the connection errors
    $this->resetConnectErrors();

    // Set the MYSQL error mode to exception
    // (or: switch ON exception mode instead of class error reporting)
    $driver = new mysqli_driver();
    $driver->report_mode = MYSQLI_REPORT_STRICT | MYSQLI_REPORT_ERROR;

    // Let's try to establish a database connection, shall we?
    try { 

      // Using the object-oriented style of MYSQLI, if `useName` is TRUE...
      if ($useName) {
        // ...connect to our database, using the `db_name` variable
        $mysqli = new mysqli($this->db_host, $this->db_username, $this->db_password, $this->db_name);

      }else { // <- `useName` is FALSE
        // ...connect to our database without specifying the database name  
        $mysqli = new mysqli($this->db_host, $this->db_username, $this->db_password);
      }
    
    } catch (mysqli_sql_exception $mse) { 
       // update the connection errors
      $this->updateConnectErrors($this::ERROR_FOUND, "[dbConnectViaMysqli]: Failed to connect to database - " . $mse->getMessage());
    } 

    // DEBUG [4dbsmaster]: tell me about it :)
    // echo "Connected to database via MYSQLI !!!"; 
      
    // Update `mysqli` of this class
    $this->mysqli = $mysqli;
    
    // Return `mysqli`
    return $mysqli; 
  }



  /**
   * Create the database via MYSQLI.
   * NOTE: This method will also create the required table with columns, if they do not exist.
   *
   * @param object $mysqli - MySQL database connection
   *
   * @return bool - Returns TRUE if the databse was successfully created via MYSQLI
   * @private
   */
  private function dbCreateViaMysqli() {
    // Return FALSE if there's no `mysqli` object
    // if (isset($mysqli)) { return false; }
    
    // Initialize the `result` variable 
    $result = false;

    // Reset the creation errors
    $this->resetCreateErrors();

    // Creating the database and subsequent table...

    try {

      // get the datbase query string as `create_db_query`
      $create_db_query = $this->getDatabaseQuery();
      // get the table query string as `create_db_table_query`
      $create_db_table_query = $this->getTableQuery();
       
      // Perform the `create_db_query` against our `mysqli` database,
      // to safely create a database with our predefined `db_name`,
      // and asing it's result to a `databaseCreated`
      $databaseCreated = $this->mysqli->query($create_db_query);

      // select this as our default database
      $this->mysqli->select_db($this->db_name);
      
      // Perform the `create_db_table_query` against our `mysqli` database,
      // to safely create a table in our database with our predefined `db_tablename`,
      // and asign it's result to a `tableCreated` 
      $tableCreated = $this->mysqli->query($create_db_table_query);

      // If both database and table were created successfully...
      if ($databaseCreated && $tableCreated) {
        // set `result` to TRUE
        $result = true;
      }else {
        // update creation errors
        $this->updateCreateErrors($this::ERROR_FOUND, "[dbCreateViaMysqli]: Creation of database and table failed");
      }

    } catch (mysqli_sql_exception $mse) {
      // update creation errors
      $this->updateCreateErrors($this::ERROR_FOUND, "[dbCreateViaMysqli]: Failed to create database or table - " . $mse->getMessage());
    }

    // return the `result`
    return $result;

  }




  /**
   * Method used to connect to the database via PDO
   *
   * @param bool $useName - If TRUE, the database name (i.e. `db_name`) will be used for connection
   *
   * @return object $pdo - The PDO connection to the database
   * @private
   */
  private function dbConnectViaPdo($useName = false) {
    // Reset the connection errors
    $this->resetConnectErrors();
    
    
    // Let's try to establish a database connection, shall we?
    try { 

      // Using the object-oriented style of PDO, if `useName` is TRUE...
      if ($useName) {
        // ...connect to our database, using the `db_name` variable
        $pdo = new pdo("mysql:host=$this->db_host;dbname=$db_name", $this->db_username, $this->db_password);

      } else { // <- `useName` is FALSE
        // ...connect to our database without specifying the database name  
        $pdo = new pdo("mysql:host=$this->db_host", $this->db_username, $this->db_password);
      }

      // Set the PDO error mode to exception
      $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

      // DEBUG [4dbsmaster]: tell me about it ;)
      // echo "Database connected successfully via PDO";
    
    } catch (PDOException $e) { 
       // update the connection errors
      $this->updateConnectErrors($this::ERROR_FOUND, "[dbConnectViaPdo]: Failed to connect to database - " . $e->getMessage());
    } 
    
    // DEBUG [4dbsmaster]: tell me about it :)
    // echo "Connected to database via PDO !!!"; 
     
    // Update `pdo` of this class
    $this->pdo = $pdo;
    
    // Return `pdo`
    return $pdo; 
  }



  /**
   * Create the database via PDO.
   * NOTE: This method will also create the required table with columns, if they do not exist.
   *
   * @param object $pdo - MySQL database connection
   *
   * @return bool - Returns TRUE if the databse was successfully created via PDO
   * @private
   */
  private function dbCreateViaPdo() {
    // Return FALSE if there's no `pdo` object
    // if (isset($pdo)) { return false; }
    
    // Initialize the `result` variable 
    $result = false;

    // Reset the creation errors
    $this->resetCreateErrors();

    // Creating the database and subsequent table...

    try {

      // get the datbase query string as `create_db_query`
      $create_db_query = $this->getDatabaseQuery();
      // get the table query string as `create_db_table_query`
      $create_db_table_query = $this->getTableQuery();
       
      // Perform the `create_db_query` against our `pdo` database,
      // to safely create a database with our predefined `db_name`,
      // and asing it's result to a `databaseCreated`
      $databaseCreated = $this->pdo->query($create_db_query);

      // select this as our default database
      $this->pdo->query("use " . $this->db_name);
      
      // Perform the `create_db_table_query` against our `pdo` database,
      // to safely create a table in our database with our predefined `db_tablename`,
      // and asign it's result to a `tableCreated` 
      $tableCreated = $this->pdo->query($create_db_table_query);

      // If both database and table were created successfully...
      if ($databaseCreated && $tableCreated) {
        // set `result` to TRUE
        $result = true;

      }else {
        // update creation errors
        $this->updateCreateErrors($this::ERROR_FOUND, "[dbCreateViaPdo]: Creation of database and table failed");
      }

    } catch (PDOException $pdo_e) {
      // update creation errors
      $this->updateCreateErrors($this::ERROR_FOUND, "[dbCreateViaPdo]: Failed to create database or table - " . $pdo_e->getMessage());
    } catch (Exception $e) {
      // update creation errors
      $this->updateCreateErrors($this::ERROR_FOUND, "[dbCreateViaPdo]: Failed to create database or table - " . $pdo_e->getMessage());
    }

    // return the `result`
    return $result;

  }



  /**
   * Resets the connection error variables (i.e. `connect_errno` and `connect_error`)
   */
  private function resetConnectErrors() {
    $this->connect_errno = 0;
    $this->connect_error = "";
  }

  /**
   * Resets the creation error variables (i.e. `create_errno` and `create_error`)
   */
  private function resetCreateErrors() {
    $this->create_errno = 0;
    $this->create_error = "";
  }


  /**
   * Updates the connection errors
   *
   * @param int errno - Error code
   * @param string error - Error message
   */
  private function updateConnectErrors($errno, $error) {
    $this->connect_errno = $errno;
    $this->connect_error = $error;
  }


  /**
   * Updates the creation errors
   *
   * @param int errno - Error code
   * @param string error - Error message
   */
  private function updateCreateErrors($errno, $error) {
    $this->create_errno = $errno;
    $this->create_error = $error;
  }

}
