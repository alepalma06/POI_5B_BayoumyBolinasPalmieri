export const createForm = (parentElement, Map,tableComponent) => {
    let dato_lista = []; //lista generale
    let callback = null;


    let token_mappe = "";

    fetch("conf.json").then(r => r.json()).then(conf => {
        token_mappe = conf.token;
    });
    return {
        setLabels: (labels) => {
            dato_lista = labels;
        },
        onsubmit: (callbackInput) => {
            callback = callbackInput;
        },
        render: (table1, compFetch, mappe) => {
            parentElement.innerHTML =//creazione campi di input
                `<div>Indirizzo<br/><input id="indirizzo" type="text" class="form-label form-control"/></div>` +
                `<div>Targa 1(obbligatorio)<br/><input id="targa1" type="text" class="form-label form-control"/></div>` +
                `<div>Targa 2<br/><input id="targa2" type="text" class="form-label form-control"/></div>` +
                `<div>Targa 3<br/><input id="targa3" type="text" class="form-label form-control"/></div>` +
                `<div>Data<br/><input id="data_incidente" type="date" class="form-label form-control"/></div>` +
                `<div>Ora<br/><input id="ora" type="time" class="form-label form-control"/></div>` +
                `<div>Numero Feriti<br/><input id="numeroferiti" type="number" class="form-label form-control"/></div>` +
                `<div>Numero Vittime<br/><input id="numerovittime" type="number" class="form-label form-control"/></div>` +
                `<div id="outputform1"></div>` 

            document.querySelector("#Aggiungi").onclick = () => {//premo pulsante aggiungi
                //leggo cosa inserisce utente
                const indirizzo = document.querySelector("#indirizzo").value;
                const targa1 = document.querySelector("#targa1").value;
                let targa2 = document.querySelector("#targa2").value;
                let targa3 = document.querySelector("#targa3").value;
                const data_incidente = document.querySelector("#data_incidente").value;
                const ora = document.querySelector("#ora").value;
                const numeroferiti = document.querySelector("#numeroferiti").value;
                const numerovittime = document.querySelector("#numerovittime").value;
                const outputform = document.getElementById("outputform");
                //controllo data
                const oggi = new Date();
                const giorno = oggi.getDate();
                const mese = oggi.getMonth() + 1; 
                const anno = oggi.getFullYear();
                const dataOdierna = `${anno}-${mese}-${giorno}`;
                //controllo se sono pieni i campi obbligatori
                if (indirizzo === "" || targa1 === "" || data_incidente === "" || ora === "" || numeroferiti === "" || numerovittime === "") {
                    outputform.innerHTML = "KO - Campi obbligatori mancanti";
                } else if (data_incidente > dataOdierna) {
                    outputform.innerHTML = "KO - La data non può essere futura";
                } else {
                    if (targa2===""){
                        targa2="Non segnalata";
                    }
                    if (targa3===""){
                        targa3="Non segnalata";
                    }
                    //creo dizionario
                    const datodizionario = {
                        "indirizzo": indirizzo,
                        "targa1": targa1,
                        "targa2": targa2,
                        "targa3": targa3,
                        "data": data_incidente,
                        "ora": ora,
                        "numeroferiti": numeroferiti,
                        "numerovittime": numerovittime
                    };
                    //faccio fetch
                    const template = "https://us1.locationiq.com/v1/search?key=%TOKEN&q=%LUOGO&format=json&";
                    let url = template.replace("%LUOGO", indirizzo).replace("%TOKEN", token_mappe);
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            //creo datomappa
                            const datomappa={
                                name: datodizionario,
                                coords:[data[0].lat, data[0].lon]
                            }
                            dato_lista.push(datomappa);
                            //faccio set
                            compFetch.setData(dato_lista).then(data => {
                                compFetch.getData().then(result=>{
                                    dato_lista=result
                                    table1.setData(result)
                                    table1.render()
                                    Map.setData(result)
                                    Map.render()
                                })
                            })
                        });    
                    

                    //azzero campi
                    outputform.innerHTML = "OK";
                    document.querySelector("#indirizzo").value = "";
                    document.querySelector("#targa1").value = "";
                    document.querySelector("#targa2").value = "";
                    document.querySelector("#targa3").value = "";
                    document.querySelector("#data_incidente").value = "";
                    document.querySelector("#ora").value = "";
                    document.querySelector("#numeroferiti").value = "";
                    document.querySelector("#numerovittime").value = "";

                }
                

                // Resetta i campi
                document.querySelector("#indirizzo").value = "";
                document.querySelector("#targa1").value = "";
                document.querySelector("#targa2").value = "";
                document.querySelector("#targa3").value = "";
                document.querySelector("#data_incidente").value = "";
                document.querySelector("#ora").value = "";
                document.querySelector("#numeroferiti").value = "";
                document.querySelector("#numerovittime").value = "";
            }
        }
    };
};  