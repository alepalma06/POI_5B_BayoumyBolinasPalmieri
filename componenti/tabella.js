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
            data.push(datomappa); 
        },
        setParentElement: (pr) => {
            parentElement = pr;  
        },
        render: () => {

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

            data.forEach((elemento) => {
                let row = templateRow
                    .replace("#D10", elemento.name.id)    
                    .replace("#D1", elemento.name.titolo)  
                    .replace("#D2", elemento.name.anno)    
                    .replace("#D3", elemento.name.personaggi) 
                    .replace("#D4", elemento.name.fazioni); 
                html += row;
            });

            html += `</tbody></table>`;

            // Inserisce html nella pagina
            parentElement.innerHTML = html;
        },
    };
};
export const tableComponent2 = (Map,compFetch,table1,table2) => {
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
        getData: () => data,
        render: () => {
            let html = `
                <table class="tbl1">
                    <thead>
                        <tr class="border">
                            <th>Titolo</th>
                            <th>Interazioni</th>
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
        compFetch.setData(data).then(() => {
            compFetch.getData().then((result) => {
                table1.setData(result); 
                table1.render();         // Fa render tabella
                Map.setData(result);     // Aggiorna la mappa
                Map.render();            // Rende la mappa aggiornata
                table2.setData(result);  // Aggiorna table2 con i dati più recenti
                table2.render();
            });
        });
    }
    function modifica(i) {
        const elemento = data[i];  // Trova l'elemento corrispondente all'indice i
        cancella(i);
        // Riempi i campi di input del modulo con i valori dell'elemento selezionato
        document.querySelector("#luogo").value = elemento.name.luogo;
        document.querySelector("#titolo").value = elemento.name.titolo;
        document.querySelector("#anno").value = elemento.name.anno;
        document.querySelector("#durata").value = elemento.name.durata;
        document.querySelector("#descrizione").value = elemento.name.descrizione;
        document.querySelector("#personaggi").value = elemento.name.personaggi;
        document.querySelector("#fazioni").value = elemento.name.fazioni;
        document.querySelector("#vittime").value = elemento.name.vittime;
        document.querySelector("#feriti").value = elemento.name.feriti;
        document.querySelector("#conseguenze").value = elemento.name.conseguenze;
        document.querySelector("#url_foto1").value = elemento.name.url_foto1;
        document.querySelector("#url_foto2").value = elemento.name.url_foto2;
        document.querySelector("#url_foto3").value = elemento.name.url_foto3;
        document.querySelector("#url_foto4").value = elemento.name.url_foto4;
        document.querySelector("#url_foto5").value = elemento.name.url_foto5;
    }
};

