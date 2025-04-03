/**
 * Type Check Utilities
 * 
 * A collection of utility functions for checking JavaScript types.
 * These helpers provide more semantic and reliable type checking than
 * the built-in typeof operator.
 */

/**
 * Checks if a value is a function
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a function, false otherwise
 */
export const isFunction = (value) => {
  return typeof value === 'function';
};

/**
 * Checks if a value is an object (excluding null)
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is an object and not null, false otherwise
 */
export const isObject = (value) => {
  return value !== null && typeof value === 'object';
};

/**
 * Checks if a value is an array
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is an array, false otherwise
 */
export const isArray = (value) => {
  return Array.isArray(value);
};

/**
 * Checks if a value is a string
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a string, false otherwise
 */
export const isString = (value) => {
  return typeof value === 'string';
};

/**
 * Checks if a value is a number (excluding NaN)
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a number and not NaN, false otherwise
 */
export const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Checks if a value is a boolean
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a boolean, false otherwise
 */
export const isBoolean = (value) => {
  return typeof value === 'boolean';
};

/**
 * Checks if a value is undefined
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is undefined, false otherwise
 */
export const isUndefined = (value) => {
  return typeof value === 'undefined';
};

/**
 * Checks if a value is null
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is null, false otherwise
 */
export const isNull = (value) => {
  return value === null;
};

/**
 * Checks if a value is null or undefined
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is null or undefined, false otherwise
 */
export const isNullOrUndefined = (value) => {
  return isNull(value) || isUndefined(value);
};

/**
 * Checks if a value is a valid React element
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a React element, false otherwise
 */
export const isReactElement = (value) => {
  return isObject(value) && 
         '$$typeof' in value && 
         value.$$typeof.toString() === 'Symbol(react.element)';
};

/**
 * Checks if a value is a date object
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a date object, false otherwise
 */
export const isDate = (value) => {
  return value instanceof Date && !isNaN(value.getTime());
};

/**
 * Checks if a value is a plain object
 * 
 * @param {*} value - The value to check
 * @returns {boolean} True if the value is a plain object, false otherwise
 */
export const isPlainObject = (value) => {
  if (!isObject(value)) return false;
  
  // Get the prototype of the object
  const proto = Object.getPrototypeOf(value);
  
  // If there's no prototype, it's a plain object (created with Object.create(null))
  // Or if the prototype is the base Object prototype, it's a plain object (created with {} or new Object())
  return proto === null || proto === Object.prototype;
};
