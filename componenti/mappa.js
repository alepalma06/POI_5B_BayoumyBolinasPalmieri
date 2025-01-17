export const createMap = () => {
    let places = []; // Lista di tutti i luoghi aggiunti

    // Inizializza la mappa centrata
    const map = L.map('map').setView([45, 8], 5);

    // Aggiungi i tile alla mappa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return {
        setData: (datomappa) => {
            places = datomappa; // Aggiorna la lista dei luoghi
        },
        render: () => {
            places.forEach(place => {
                const marker = L.marker(place.coords).addTo(map);
                marker.bindPopup(`
                    <b><a href="#detail_${place.name.id}">${place.name.luogo}</a></b><br>
                    Titolo: ${place.name.titolo}<br>
                    Anno: ${place.name.anno}<br>
                    Durata: ${place.name.durata}<br>
                    Personaggi: ${place.name.personaggi}<br>
                    Fazioni: ${place.name.fazioni}<br>
                    Vittime: ${place.name.vittime}<br>
                    Feriti: ${place.name.feriti}
                `);
            });
        },
        add: (datomappa) => {
            places.push(datomappa);
            const marker = L.marker(datomappa.coords).addTo(map);
            marker.bindPopup(`
                <b><a href="#detail_${datomappa.name.id}">${datomappa.name.indirizzo}</a></b><br>
                Targa 1: ${datomappa.name.targa1}<br>
                Targa 2: ${datomappa.name.targa2}<br>
                Targa 3: ${datomappa.name.targa3}<br>
                Data: ${datomappa.name.data}<br>
                Ora: ${datomappa.name.ora}<br>
                Numero Feriti: ${datomappa.name.numeroferiti}<br>
                Numero Vittime: ${datomappa.name.numerovittime}
            `);
        }
    };
};