import { SelectionLogic } from './src/core/SelectionLogic.js';

const app = {
    vault: {
        read: async () => `- Hijo predilecto de la provincia de Málaga
- Artículo dedicado a la biografía y figura de Rodríguez Delgado
- Breve reportaje del New York Times sobre el experimento público que hizo con un toro`
    }
};

const logic = new SelectionLogic(app);

// Update findCandidatesStripped to strip Markdown list markers
const oldFind = logic.findCandidatesStripped.bind(logic);
logic.findCandidatesStripped = function(text, snippet) {
    // PRE-STRIP snippet
    let cleanSnippet = snippet.replace(/^[ \t]*[>*\-+][ \t]+(\[[ \txX]\][ \t]+)?/gm, '');
    cleanSnippet = cleanSnippet.replace(/^[ \t]*\d+\.[ \t]+/gm, '');
    
    // We rewrite the tokenRegex to ALSO capture list prefixes
    const map = [];
    let strippedRaw = "";

    const tokenRegex = new RegExp([
        // NEW GROUP 1: List markers and blockquotes at the start of a line
        // ^\s*(?:[>*\-+]|\d+\.)(?: \[[ xX]\])?\s+
        // Wait! We can't easily use ^ in a global regex that matches anywhere?
        // We can use /(?:^|\n)[ \t]*([>*\-+]|\d+\.)[ \t]+(?:\[[ \txX]\][ \t]+)?/.source
        // Wait, if we capture `(?:^|\n)`, we need to make sure we don't accidentally consume the \n so another line can't match?
        // NO! We can just use `^[ \t]*([>*\-+]|\d+\.)[ \t]+(?:\[[ \txX]\][ \t]+)?` with the 'm' multiline flag!
        /^[ \t]*(?:[>*\-+]|\d+\.)[ \t]+(?:\[[ \txX]\][ \t]+)?/.source,
        
        // ... the rest ... let's just write a custom simple loop to test the logic
    ].join('|'), 'gm');

    return "TEST"; // Instead of rewriting all of SelectionLogic here, let's just edit it in place.
}
