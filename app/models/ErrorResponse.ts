/**
 * A class that represents an error response.
 * @param {string} message - The error message.
 */
export class ErrorResponse {
  message: string;

  /**
   * The constructor function is a special function that is called when a new instance of the class is
   * created
   * @param {string} message - string - This is the message that will be displayed when the error is
   * thrown.
   */
  constructor(message: string) {
    this.message = message;
  }
}
