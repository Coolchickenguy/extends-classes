/*!
 * Extends Classes.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 30/03/2017 NZDT
 */

/**
 * Module dependencies.
 */

const MethodMissing = require('method-missing');

/**
 *
 * @description Extend multable classes
 * @example const EventEmitter = require("events");
 * const classes = require('./');
 * class someClass{
 * someMethod(callback){
 * setTimeout(callback,1000);
 * }
 * constructor(){}
 * }
 *
 * class secEmitter extends classes(EventEmitter, someClass) {
 *   constructor() {
 *     super();
 *     this.someMethod(() => this.emit("done"));
 *   }
 * }
 * var timer = new secEmitter();
 * timer.on("done",() => console.log("done!"));
 * @param args The classes to extend
 * @returns The input classes merged together
 */
function classes(...args) {
  const constructors = [];

  /**
   * Skeleton Class.
   * @class Class
   * @augments {MethodMissing}
   */

  class Class extends MethodMissing {

    /**
     * Creates an instance of Class.
     * @param {...*} opts Options for ALL of the constructors of the classes to extend
     * @returns { Class }
     */

    constructor(...opts) {
      super();

      for (const arg of args) {
        const props = Object.getOwnPropertyNames(arg.prototype);

        for (const prop of props) {
          if (prop === 'constructor') {
            if (!constructors.includes(arg.prototype.constructor)) {
                constructors.push(arg.prototype.constructor);
            }
          } else {
            Class.prototype[prop] = arg.prototype[prop];
          }
        }
      }

      for (const constructor of constructors) {
        // Copy non-enumerable properties too
        const props = Object.getOwnPropertyDescriptors(new constructor(...opts));
        Object.defineProperties(Class.prototype, props);
      }
    }

  }

  return Class;
}

/**
 * Module exports.
 */

module.exports = classes(class {});
const it = classes(class {});
it.prototype;
