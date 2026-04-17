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
    pattern = pattern.replace(/\s+/g, '\\s*(?:(?:[>\\*\\-\\+]|\\d+\\.)(?: \\[[ xX]\\])?\\s*)*');
    pattern = pattern.replace(/["“”]/g, '["“”]');
    pattern = pattern.replace(/['‘’]/g, "['‘’]");
    pattern = pattern.replace(/[\-–—]/g, "[\\-–—]");
    pattern = pattern.replace(/(\\\.\\\.\\\.|…)/g, "(\\\\.{3}|…)");
    return pattern;
};

// We intercept findAllCandidates to print the regex!
const oldFindAll = logic.findAllCandidates.bind(logic);
logic.findAllCandidates = function(text, snippet) {
    const escaped = snippet.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = this.createFlexiblePattern(escaped);
    console.log("REGEX CREATED:");
    console.log(pattern);
    
    // Test regex directly!
    const r = new RegExp(pattern, 'g');
    let m = r.exec(text);
    console.log("Direct match:", m ? m.index : "NO MATCH", "Length:", m ? m[0].length : 0);
    
    return oldFindAll(text, snippet);
};

async function testList() {
    let sel = `Hijo predilecto de la provincia de Málaga
Artículo dedicado a la biografía y figura de Rodríguez Delgado
Breve reportaje del New York Times sobre el experimento público que hizo con un toro`;
    
    console.log("TEST WITH BULLETS IN SOURCE, NONE IN SELECTION:");
    const res = await logic.locateSelection({name:'a'}, {}, sel, null, 0);
    console.log(res);
}

testList().catch(console.error);
