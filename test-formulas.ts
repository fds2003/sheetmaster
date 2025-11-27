import { FORMULAS } from './lib/formulas';

console.log('--- Testing Formula Generation ---');

FORMULAS.forEach(formula => {
    console.log(`\nTesting ${formula.excelFunction}:`);
    const params: Record<string, string> = {};
    formula.inputs.forEach(input => {
        params[input.id] = `[${input.id}]`; // Mock input
    });
    const result = formula.generate(params);
    console.log(`Generated: ${result}`);
});

console.log('\n--- Test Complete ---');
