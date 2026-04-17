import { SelectionLogic } from './src/core/SelectionLogic.js';

const app = {
    vault: {
        read: async () => `- Hijo predilecto de la provincia de Málaga
- Artículo dedicado a la biografía y figura de Rodríguez Delgado
- Breve reportaje del New York Times sobre el experimento público que hizo con un toro`
    }
};

const logic = new SelectionLogic(app);

async function testList() {
    // The selection browser gives lacks the `- `
    let sel = `Hijo predilecto de la provincia de Málaga
Artículo dedicado a la biografía y figura de Rodríguez Delgado
Breve reportaje del New York Times sobre el experimento público que hizo con un toro`;
    
    console.log("TEST WITH BULLETS IN SOURCE, NONE IN SELECTION:");
    const res = await logic.locateSelection({name:'a'}, {}, sel, null, 0);
    console.log(res);

    // What if it DOES have hyphens?
    let sel2 = `- Hijo predilecto de la provincia de Málaga
- Artículo dedicado a la biografía y figura de Rodríguez Delgado
- Breve reportaje del New York Times sobre el experimento público que hizo con un toro`;
    
    console.log("TEST WITH HYPHENS:");
    const res2 = await logic.locateSelection({name:'a'}, {}, sel2, null, 0);
    console.log(res2);
}

testList().catch(console.error);
