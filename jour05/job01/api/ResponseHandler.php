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
* @name Response Handler - Trait
* @file ResponseHandler.php
* @author: Abraham Ukachi <abraham.ukachi@laplateforme.io>
* @version: 0.0.2
* 
* Usage:
*   1-|> require_once __DIR__ . '/ResponseHandler.php';
*    -|>
*    -|> class Message {
*    -|>   use ResponseHandler;
*    -|> }
*
*/


/*
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * MOTTO: I'll always do more 😜!!!
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 */

// Declare a namespace named `Runtrack3`
namespace Runtrack3;



/*
 * Declare a trait named 'ResponseHandler'.
 */
trait ResponseHandler {

  // private properties
  
  // Defining some "FAKE" CONSTANTS ;)...
  // NOTE: Prior to PHP v8.2, it is not possible to declare constants in PHP traits) 
  // status codes (See: https://www.w3.org/Protocols/HTTP/HTRESP.html)
  // - Success (2xx)
  private static $STATUS_SUCCESS_OK = 200;
  private static $STATUS_SUCCESS_CREATED = 201;
  private static $STATUS_SUCCESS_ACCEPTED = 202;
  private static $STATUS_SUCCESS_PARTIAL_INFO = 203; 
  private static $STATUS_SUCCESS_NO_RESPONSE = 200;
  // - Error (4xx, 5xx)
  private static $STATUS_ERROR_BAD_REQUEST = 400;
  private static $STATUS_ERROR_UNAUTHORIZED = 401;
  private static $STATUS_ERROR_PAYMENT_REQUIRED = 402;
  private static $STATUS_ERROR_FORBIDDEN = 403;
  private static $STATUS_ERROR_NOT_FOUND = 404;
  private static $STATUS_ERROR_UNPROCESSABLE_ENTITY = 422;
  private static $STATUS_ERROR_INTERNAL_ERROR = 500;
  private static $STATUS_ERROR_NOT_IMPLEMENTED = 501;
  private static $STATUS_ERROR_SERVICE_TEMP_OVERLOADED = 502;
  private static $STATUS_ERROR_GATEWAY_TIMEOUT = 503;
  // - Redirection (3xx)
  private static $STATUS_REDIRECT_MOVED = 301;
  private static $STATUS_REDIRECT_FOUND = 302;
  private static $STATUS_REDIRECT_METHOD = 303;
  private static $STATUS_REDIRECT_NOT_MODIFIED = 304;

  
  // protected properties 

  /*
   * # Response
   * > NOTE: This is associative array containing the 
   * current `success`, `status` and `message` of a response.
   * 
   * @type array
   */
  protected $response = array(
    "success" => 0,
    "status" => 0,
    "message" => ""
  );



  // PUBLIC SETTERS

  // PUBLIC GETTERS
  //

  /**
   * Returns the response success.
   *
   * @return int $success
   */
  public function getResponseSuccess() {
    return $this->response['success'];
  }


  /**
   * Returns the response status.
   *
   * @return int $status
   */
  public function getResponseStatus() {
    return $this->response['status'];
  }



  /**
   * Returns the response message.
   *
   * @return string $message
   */
  public function getResponseMessage() {
    return $this->response['message'];
  }
  
  // PUBLIC METHODS
  
  



  // PRIVATE SETTERS

  /**
   * Sets the 'success' in `$response` array to the given `value`
   *
   * @param int $value
   *
   * @private
   */
  private function setResponseSuccess($value) {
    $this->response['success'] = $value;
  }


  /**
   * Sets the 'status' in `$response` array to the given `value`
   *
   * @param int $value
   *
   * @private
   */
  private function setResponseStatus($value) {
    $this->response['status'] = $value;
  }



  /**
   * Sets the 'message' in `$response` array to the given `value`
   *
   * @param int $value
   *
   * @private
   */
  private function setResponseMessage($value) {
    $this->response['message'] = $value;
  }



  // PRIVATE GETTERS




  // PRIVATE METHODS

  /**
   * Updates the `response` array with the given `success`, `status`, `message` and/or `data`.
   * NOTE: This method should be used after an action was performed.
   *
   * Example usage:
   *   // action
   *   $this->connect($email, $password);
   *   // response update
   *   $this->updateResponse(0, self::$STATUS_SUCCESS_OK, "Connected");
   *
   * @param int $success - 0 for *FAILED* and 1 for *SUCCESS*
   * @param int $status - See the above status codes
   * @param string $message - The response message
   * @param array $data - An additional/extra data to the response
   *
   * @private
   */
  private function updateResponse($success, $status, $message, $data = []) {
    // update the `response` array
    $this->response = array_merge(array(
      'success' => $success,
      'status' => $status,
      'message' => $message), 
    $data);

  }

}

?>
