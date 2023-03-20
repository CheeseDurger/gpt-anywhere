/**
 * @fileoverview adds type definition for methods that haven't been typed in vanilla typescript
 */
declare global {

  interface Array<T> {
    /**
     * Get index of the last element matching a condition
     * @param callbackFn A function applied to each element, and returning `true` if the element matches the condition
     * @param thisArg A value to use as this when executing callbackFn
     * @returns The index of the last element matching the condition (-1 if no element matches the condition)
     * 
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex Array.prototype.findLastIndex()}
     */
    findLastIndex(
      callbackFn: (element: T, index: number, array: T[]) => boolean,
      thisArg?: any
    ): number;
  };

  interface String {
    /**
     * Replace all instances of pattern in a string
     * @param pattern to search for
     * @param replacement fo pattern 
     * @returns a new string with all instances of pattern replaced
     * 
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll String.prototype.replaceAll()}
     */
    replaceAll(pattern: string, replacement : string): string;
  };

};

export {};
