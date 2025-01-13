const tabella = document.getElementById("tabella"); 
const navbar = document.getElementById("navbar");
const formElement = document.getElementById("form");

import { tableComponent } from './componenti/tabella.js';
import { createForm } from './componenti/form.js';
import { generateFetchComponent } from './componenti/fetch_componenti.js';
import { createMap } from './componenti/mappa.js';
import { createLogin } from './componenti/login.js';

fetch("conf.json")
    .then((r) => r.json())
    .then((conf) => {
        const compFetch = generateFetchComponent();

        // Crea componente tabella
        const table1 = tableComponent();
        table1.setParentElement(tabella,compFetch);

        const navBarComp = NavBarComponent(conf);
        const login=createLogin();
        const Map = createMap();

        //fa render mappa
        Map.render();

        // Crea componente form e passa mappa e tabella anche
        const form = createForm(formElement, Map, table1);


        // Carica i dati di configurazione
        compFetch.caricaDati(conf);

        // Configura e renderizza la form
        form.render(table1, compFetch, Map);

        // Recupera i dati 
        compFetch.getData().then((data) => {
            form.setLabels(data);
            table1.setData(data); 
            table1.render(); 
            Map.setData(data); 
            Map.render();
        });
        

        // Configura e renderizza la barra di navigazione
        navBarComp.setParentElement(navbar);
        navBarComp.render(form, table1);
    });