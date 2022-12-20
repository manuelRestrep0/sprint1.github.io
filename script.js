let usuarios = [
    {
        "nombre": "Juan",
        "documento": "1001",
        "password": "12345",
        "tipoUsuario": 1
    },
    {
        "nombre": "Manuel",
        "documento": "1002",
        "password": "123456",
        "tipoUsuario": 2
    },
    {
        "nombre": "Carlos",
        "documento": "1003",
        "password": "1245",
        "tipoUsuario": 2
    },
    {
        "nombre": "Mario",
        "documento": "1004",
        "password": "1234",
        "tipoUsuario": 2
    }
];
let billetes = {
    "5": 0,
    "10": 0,
    "20": 0,
    "50":0,
    "100": 0
};
let billetesRetiro = {
    "5": 0,
    "10": 0,
    "20": 0,
    "50":0,
    "100": 0
};


let ejecucion = true;
let usuario, documento, auxiliar;
let totalDinero = 0;

function retiroDineroActualizacion(dineroSol, billete ){
    let auxiliarRetiro = 0;
    let auxiliarResta = 0; 
    auxiliarRetiro = dineroSol%(billete*1000);
    auxiliarResta = dineroSol-auxiliarRetiro;
    billetesRetiro[billete] = (auxiliarResta)/(billete*1000);
    totalDinero -= auxiliarResta;
    billetes[billete] -= billetesRetiro[billete];
    return auxiliarResta;
}
while(ejecucion==true){
    documento = prompt("Ingrese su numero de documento");
    usuario = usuarios.find(usuario => usuario.documento === documento);
    if(usuario != undefined){
        let password = prompt("Ingrese su contrasena");
        if(password === usuario.password){
            if(usuario.tipoUsuario===1){
                //menu de administrador.
                let claves = Object.keys(billetes);
                for(let i = 0; i<claves.length;i++){
                    //solicitar la cantidad de billetes que se va a cargar y almacenarlo en el object.
                    billetes[claves[i]] += parseInt(prompt(`Ingrese la cantidad de billetes de ${claves[i]} mil pesos va a depositar:`));
                    let billetesAux = billetes[claves[i]] * (1000 * claves[i]);
                    console.log(billetesAux);
                    totalDinero += billetesAux;
                }
                //mostrar por consola la suma de cada denominacion y el total general
                console.log(totalDinero);
                alert("Se le devolverá al menu inicial");
            } else{
                if(totalDinero==0){
                    alert("Cajero en mantenimiento, vuelva pronto.");
                }else{
                    let dineroSolicitado = parseInt(prompt('Ingrese el dinero que desea retirar.'));
                    if(dineroSolicitado<=totalDinero && dineroSolicitado>0){
                        //entregar dinero
                        if(dineroSolicitado%5000!=0){
                            dineroSolicitado-=dineroSolicitado%5000;
                        } 
                        //contabilizar los billetes a devolver y restarlos a la cantidad actual y al total del dinero.
                        let auxiliarRetiro = 0;
                        let auxiliarResta = 0;
                        while(dineroSolicitado!=0){
                            if(dineroSolicitado>=100000){
                                dineroSolicitado -= retiroDineroActualizacion(dineroSolicitado, 100);
                                console.log(dineroSolicitado);           
                            } else if(dineroSolicitado>=50000){
                                dineroSolicitado -= retiroDineroActualizacion(dineroSolicitado, 50);
                            } else if(dineroSolicitado>=20000){
                                dineroSolicitado -= retiroDineroActualizacion(dineroSolicitado, 20);   
                            } else if(dineroSolicitado>=10000){
                                dineroSolicitado -= retiroDineroActualizacion(dineroSolicitado, 10);
                            }else if(dineroSolicitado>=5000){
                                dineroSolicitado -= retiroDineroActualizacion(dineroSolicitado, 5);
                            }
                        }

                    } else if(dineroSolicitado>totalDinero){
                        alert('El cajero no posee suficiente dinero para entregarle.');
                    } else{
                        alert('Cantidad invalida.');
                    }
                }
                let claves = Object.keys(billetesRetiro);
                for(let i = 0; i<claves.length;i++){
                    if(parseInt(billetesRetiro[claves[i]])!=0){
                        //mostrar los billetes que se deben entregar.
                        alert(`${billetesRetiro[claves[i]]} billete(s) de ${claves[i]}`);
                    }
                }
                document.write(JSON.stringify(billetesRetiro));
                console.log(totalDinero);
            }
        } else{
            alert("Contrasena incorrecta");
        };
    }
    auxiliar = confirm('Desea continuar con la ejecucion?');
    if(auxiliar!=true){
        ejecucion = false;
    }
    /*document.write(JSON.stringify(billetes));
    document.write(JSON.stringify(usuario));*/
};