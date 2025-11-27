import { FORMULAS } from './lib/formulas';

console.log('Starting QA Check...');

const slugs = new Set();
const ids = new Set();
let errors = 0;

FORMULAS.forEach((formula, index) => {
    // Check Slug Uniqueness
    if (slugs.has(formula.slug)) {
        console.error(`[ERROR] Duplicate slug found: ${formula.slug}`);
        errors++;
    }
    slugs.add(formula.slug);

    // Check ID Uniqueness (if relevant, though slug is the main ID here)
    // The prompt mentions "unique id", but in our interface it's "slug". 
    // The inputs have "id", let's check those too within each formula.
    const inputIds = new Set();
    formula.inputs.forEach(input => {
        if (inputIds.has(input.id)) {
            console.error(`[ERROR] Duplicate input ID '${input.id}' in formula '${formula.slug}'`);
            errors++;
        }
        inputIds.add(input.id);
    });

    // Check generate function returns string
    try {
        const mockParams: Record<string, string> = {};
        formula.inputs.forEach(input => {
            mockParams[input.id] = 'test';
        });
        const result = formula.generate(mockParams);
        if (typeof result !== 'string') {
            console.error(`[ERROR] Generate function for '${formula.slug}' did not return a string.`);
            errors++;
        }
        if (!result.startsWith('=')) {
            console.warn(`[WARN] Generate function for '${formula.slug}' result does not start with '=': ${result}`);
        }
    } catch (e) {
        console.error(`[ERROR] Generate function for '${formula.slug}' threw an error:`, e);
        errors++;
    }
});

if (errors === 0) {
    console.log('✅ QA Check Passed: All formulas are valid.');
    process.exit(0);
} else {
    console.error(`❌ QA Check Failed with ${errors} errors.`);
    process.exit(1);
}
