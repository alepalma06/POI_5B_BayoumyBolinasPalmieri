const tabella = document.getElementById("tabella"); 
const tabella2 = document.getElementById("tabella2"); 
const paginadetail = document.getElementById("detail");
const formElement = document.getElementById("form");

import { tableComponent,tableComponent2 } from './componenti/tabella.js';
import { createForm } from './componenti/form.js';
import { generateFetchComponent } from './componenti/fetch_componenti.js';
import { createMap } from './componenti/mappa.js';
import { createLogin } from './componenti/login.js';
import { createNavigator } from "./componenti/navigator.js";
import { createDetail } from "./componenti/detail.js";


fetch("conf.json")
    .then((r) => r.json())
    .then((conf) => {
        const compFetch = generateFetchComponent();

        // Crea componente tabella
        const table1 = tableComponent();
        table1.setParentElement(tabella,compFetch);

        const Map = createMap();

        const table2 = tableComponent2(Map, compFetch, table1);
        table2.setParentElement(tabella2);

        const login=createLogin();
        
        const navigator = createNavigator(document.querySelector("#container"));

        //fa render mappa
        Map.render();

        // Crea componente form e passa mappa e tabella anche
        const form = createForm(formElement, Map, table1);


        // Carica i dati di configurazione
        compFetch.caricaDati(conf);

        // Configura e renderizza la form
        form.render(table1, compFetch, Map);

        const detailComp = createDetail(paginadetail);


        // Recupera i dati 
        compFetch.getData().then((data) => {
            form.setLabels(data);
            table1.setData(data); 
            table1.render(); 
            table2.setData(data); 
            table2.render();
            Map.setData(data); 
            Map.render();
            detailComp.setData(data);
            window.addEventListener('hashchange', () => {
                const hash = window.location.hash;

                if (hash.startsWith("#detail_")) {
                    // Ottieni l'ID dalla URL
                    const id = hash.replace("#detail_", "");
                    detailComp.render(id);
                } else if (hash === "#home") {
                    // Torna alla home
                    document.querySelectorAll('.page').forEach((page) => {
                        page.classList.add('hidden');
                    });
                    document.getElementById('home').classList.remove('hidden');
                } else if (hash === "#admin") {
                    // Mostra la pagina admin
                    document.querySelectorAll('.page').forEach((page) => {
                        page.classList.add('hidden');
                    });
                    document.getElementById('admin').classList.remove('hidden');
                }
            });
            if (window.location.hash.startsWith("#detail_")) {
                const id = window.location.hash.replace("#detail_", "");
                document.querySelectorAll('.page').forEach((page) => {
                    page.classList.add('hidden');
                });
                document.getElementById('detail').classList.remove('hidden');
                detailComp.render(id);
            } else if (window.location.hash === "#home") {
                // Visualizza la home se l'URL è #home
                document.querySelectorAll('.page').forEach((page) => {
                    page.classList.add('hidden');
                });
                document.getElementById('home').classList.remove('hidden');
            } else if (window.location.hash === "#admin") {
                // Visualizza la pagina admin se l'URL è #admin
                document.querySelectorAll('.page').forEach((page) => {
                    page.classList.add('hidden');
                });
                document.getElementById('admin').classList.remove('hidden');
            }
            
        });
        

    });