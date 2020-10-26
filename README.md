### TSC + JSDOC issue

This project uses jsdoc and tsc to provide typechecking. It aims to generate .d.ts files for 3rd party consumption. The problem is that once .d.ts files have been generated, tsc ignores changes to the underlying .js source files. This causes all sorts of problems for .js projects. If changes are made to the (types declared in) .js files, the .d.ts files are not updated which results in typechecking errors that shouldn't exist.

In this example, the file `src/module-a.js` originally contained this code:

```javascript
/**
 * @description add two numbers
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
export default function add(a, b) {
   return a + b;
}
```

`tsc` was then run to generate the `module-a.d.ts` file.

Later, the code in module-a.js was changed to use strings instead of numbers like so:
```javascript
/**
 * @description add two strings
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
export default function add(a, b) {
  return a + b;
}
```

The problem then arises that when using this module in index.js, there are now invalid type errors. If `tsc` is invoked again, tsc does not regenerate the .d.ts file for `module-a.js`, but instead, just reports the now invalid errors in `index.js`. It seems that when running tsc, the declaration files should be compared the source files, and thrown out and regenrated if found not to be accurate anymore.
