import { compact, isArray, isEmpty, isObject, transform } from 'lodash';

/**
 * If the argument is an array, return a new array with all the falsy values removed, otherwise return
 * the argument.
 * @param {any} o - the array to clean
 * @returns {any} - the cleaned array.
 */
function cleanArray(o: any) {
  return isArray(o) ? compact(o) : o;
}

/**
 * It recursively removes all `undefined` and `null` values from an object
 * @param {Record<string, any>} o - the object to clean
 * @returns {Record<string, any>} a new object with all the undefined or null values removed.
 */
export function cleanUndefOrNull(o: Record<string, any>) {
  return transform(o, (r, v, k) => {
    let isObjectBool: boolean = isObject(v);
    let val = isObjectBool ? cleanArray(cleanUndefOrNull(v)) : v;
    let keep = isObjectBool ? !isEmpty(val) : Boolean(val);

    if (keep) {
      // @ts-ignore
      r[k] = val;
    }
  });
}

/**
 * If the value is null or undefined, return true. Otherwise, return true if the string is empty or
 * contains only whitespace
 * @param {string | null} value - string | null
 * @returns A boolean value.
 */
function isNullOrWhiteSpace(value: string | null): boolean {
  try {
    if (value === null || value === 'undefined') {
      return true;
    }
    return value.toString().replace(/\s/g, '').length < 1;
  } catch (e) {
    return false;
  }
}

/**
 * "Given a number and a format template, return a string that is the number formatted to the
 * template."
 *
 * The function takes two parameters:
 *
 * input: number
 * formatTemplate: string
 * The function returns a string
 * @param {number} input - The number to format
 * @param {string} formatTemplate - The format template to use.
 * @returns A string
 */
function formatNumber(input: number, formatTemplate: string): string {
  const count = formatTemplate.length;
  const stringValue = input.toString();
  if (count <= stringValue.length) {
    return stringValue;
  }
  let remainingCount = count - stringValue.length;
  remainingCount += 1; //Array must have an extra entry
  return new Array(remainingCount).join('0') + stringValue;
}

/**
 * It takes a string with placeholders in it, and replaces the placeholders with values from an object
 * @param {string} format - The string to format.
 * @param args - The arguments to be passed to the format string.
 * @param [parseByObject=false] - If the args parameter is an object, then this should be true.
 * @returns A string
 */
export function formatString(format: string, args: Record<string, any>): string {
  return format.replace(/{(\w+(:\w*)?)}/g, function (match, x) {
    //0
    const s = match.split(':');
    if (s.length > 1) {
      x = s[0].replace('{', '');
      match = s[1].replace('}', ''); //U
    }

    let arg = args[x];
    if (arg === null || arg === undefined || match.match(/{\d+}/)) {
      return arg;
    }
    if ((typeof arg === 'number' || !isNaN(arg)) && !isNaN(+match) && !isNullOrWhiteSpace(arg)) {
      return formatNumber(arg, match);
    }
    return typeof arg !== 'undefined' && arg !== null ? arg : '';
  });
}
