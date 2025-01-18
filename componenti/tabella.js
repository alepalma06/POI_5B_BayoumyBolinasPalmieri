export const tableComponent = () => {
    let data = [];
    let templateRow = `
    <tr class="tbl1">
        <td><a href="#detail_${"#D10"}">#D1</a></td>
        <td>#D2</td>
        <td>#D3</td>
        <td>#D4</td>            
    </tr>
`;
    let parentElement;

    return {
        setData: (datomappa) => {
            data = datomappa; 
        },
        addData: (datomappa) => {
            data.push(datomappa); // Aggiungi un nuovo dato
        },
        setParentElement: (pr) => {
            parentElement = pr;  
        },
        render: () => {

            // Crea intestazione della tabella
            let html = `
                <table class="tbl1">
                    <thead>
                        <tr class="border">
                            <th>Titolo</th>
                            <th>Anno</th>
                            <th>Personaggi</th>
                            <th>Fazioni</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            // Aggiungi i dati nella tabella
            data.forEach((elemento) => {
                let row = templateRow
                    .replace("#D10", elemento.name.id)    
                    .replace("#D1", elemento.name.titolo)  
                    .replace("#D2", elemento.name.anno)    // Sostituisci anno
                    .replace("#D3", elemento.name.personaggi) // Sostituisci personaggi
                    .replace("#D4", elemento.name.fazioni); // Sostituisci fazioni
                html += row;
            });

            // Completa la tabella
            html += `</tbody></table>`;

            // Inserisce l'HTML nella pagina
            parentElement.innerHTML = html;
        },
    };
};
export const tableComponent2 = (Map,compFetch,table1) => {
    let data = [];
    let parentElement;
    let formContainer;

    return {
        setData: (datomappa) => {
            data = datomappa;
        },
        addData: (datomappa) => {
            data.push(datomappa);
        },
        setParentElement: (pr) => {
            parentElement = pr;
        },
        setFormContainer: (container) => {
            formContainer = container; // Div o elemento dove mostrare la form
        },
        getData: () => data,
        render: () => {
            let html = `
                <table class="tbl1">
                    <thead>
                        <tr class="border">
                            <th>Titolo</th>
                            <th>Anno</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach((elemento, i) => { // Usa i come indice
                let templateRow = `
                <tr class="tbl1">
                    <td><a href="#detail_${elemento.name.id}">${elemento.name.titolo}</a></td>
                    <td>
                        <button class="edit-btn" id="bottonemodifica${i}">Modifica</button>
                        <button class="delete-btn" id="bottoneelimina${i}">Elimina</button>
                    </td>
                </tr>
                `;
                html += templateRow;
            });

            html += `</tbody></table>`;
            parentElement.innerHTML = html;

            // Aggiungi i listener per i pulsanti dopo il rendering
            data.forEach((_, i) => {
                document.getElementById(`bottoneelimina${i}`).onclick = () => cancella(i);
                document.getElementById(`bottonemodifica${i}`).onclick = () => modifica(i);
            });
        },
        
    };

    function cancella(i) {
        data.splice(i, 1); // Rimuove l'elemento alla posizione i
        // Si presume che compFetch, table1, e Map siano definiti all'esterno di questa funzione
        compFetch.setData(data).then(() => {
            compFetch.getData().then((result) => {
                table1.setData(result); // Aggiorna la tabella
                table1.render();         // Rende di nuovo la tabella
                Map.setData(result);     // Aggiorna la mappa
                Map.render();            // Rende la mappa aggiornata
            });
        });
    }
};

