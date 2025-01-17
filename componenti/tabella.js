export const tableComponent = () => {
    let data = [];
    let templateRow = `
        <tr class="tbl1">
            <td>#D1</td>
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
            data.push(datomappa);  // Aggiungi un nuovo dato
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
                        .replace("#D1", elemento.name.titolo)
                        .replace("#D2", elemento.name.anno)
                        .replace("#D3", elemento.name.personaggi)
                        .replace("#D4", elemento.name.fazioni);
                    html += row;
            });

            // Completa la tabella
            html += `</tbody></table>`;

            // Inserisce l'HTML nella pagina
            parentElement.innerHTML = html;
        },
    };
};