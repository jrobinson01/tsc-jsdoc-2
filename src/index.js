import add from './module-a.js';

// no errors, snce .d.ts is used
const x = add(4, 2);

// should not be errors, module-a was modified, but .d.ts not re-generated
const y = add('a', 'b');
