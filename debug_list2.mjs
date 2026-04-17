import { SelectionLogic } from './src/core/SelectionLogic.js';

const app = {
    vault: {
        read: async () => `- Hijo predilecto de la provincia de Málaga
- Artículo dedicado a la biografía y figura de Rodríguez Delgado
- Breve reportaje del New York Times sobre el experimento público que hizo con un toro`
    }
};

const logic = new SelectionLogic(app);

// Update createFlexiblePattern to allow optional structural markers in whitespace gaps
logic.createFlexiblePattern = function(escapedSnippet) {
    let pattern = escapedSnippet.replace(/\\\[\d+(?:-\d+)?\\\]/g, '\\s*');
    
    // Instead of just \s+, we allow optional Markdown structural markers (bullets, numbered lists, blockquotes, checkboxes)
    // inside any whitespace gap between words!
    // Since pattern is a string, we need to carefully escape backslashes.
    // We want the regex to be: \s*(?:(?:[>*\-+]|\d+\.)(?: \[[ xX]\])?\s*)*
    pattern = pattern.replace(/\s+/g, '\\s*(?:(?:[>\\*\\-\\+]|\\d+\\.)(?: \\[[ xX]\\])?\\s*)*');
    
    // Smart quotes
    pattern = pattern.replace(/["“”]/g, '["“”]');
    pattern = pattern.replace(/['‘’]/g, "['‘’]");
    // Dashes
    pattern = pattern.replace(/[\-–—]/g, "[\\-–—]");
    // Ellipses
    pattern = pattern.replace(/(\\\.\\\.\\\.|…)/g, "(\\\\.{3}|…)");
    return pattern;
};

async function testList() {
    let sel = `Hijo predilecto de la provincia de Málaga
Artículo dedicado a la biografía y figura de Rodríguez Delgado
Breve reportaje del New York Times sobre el experimento público que hizo con un toro`;
    
    console.log("TEST WITH BULLETS IN SOURCE, NONE IN SELECTION:");
    const res = await logic.locateSelection({name:'a'}, {}, sel, null, 0);
    console.log(res);

    let sel2 = `Hijo predilecto de la provincia de Málaga Artículo dedicado a la biografía y figura de Rodríguez Delgado Breve reportaje del New York Times sobre el experimento público que hizo con un toro`;
    
    console.log("TEST WITH ONLY SPACES IN SELECTION:");
    const res2 = await logic.locateSelection({name:'a'}, {}, sel2, null, 0);
    console.log(res2);
}

testList().catch(console.error);
