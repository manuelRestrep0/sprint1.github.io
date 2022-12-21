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
//objeto de los billetes que hay en el cajero
let billetes = {
    "5": 0,
    "10": 0,
    "20": 0,
    "50":0,
    "100": 0
};
//objeto de los billetes que se daran al usuario que retira el dinero.
let billetesRetiro = {
    "5": 0,
    "10": 0,
    "20": 0,
    "50":0,
    "100": 0
};


let ejecucion = true; // variable para permitir que el programa se mantenga ejecutando
let usuario, documento, auxiliar;
let totalDinero = 0; // total del dinero que hay en billetes dentro del cajero

// funcion para calcular los billetes que se tiene que entregar.
// recibe dos variables numericas, una del dinero solicitado y otra con la 
// denominacion del billete, dicha denominacion se multiplica por 1000 para
// dejarla en terminos de miles de pesos.

// se definen dos variables auxiliares, auxiliarRetiro recibe el modulo (es decir, el resto) 
// de la division entre el dinero solicitado y la denominacion del billete en miles de pesos.
// luego AuxiliarResta se define como la resta entre el dinero solicitado y auxuliarRetiro, 
// en auxiliarResta queda el dinero que es capaz de devolverse con ese billete.
// luego se define en el objeto de billetesRetiro la cantidad de billetes con la operacion de
// dividir auxiliarResta entre la denominacion del billete en miles de pesos.
// se resta auxiliarResta de la cantidad totalDinero, se restan los billetes que se van a retirar
// de los billetes que hay en el cajero y
// Por ultimo se retorna auxiliarRetiro que sería el dinero que falta por devolver en billetes.
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
            } else{
                if(totalDinero==0){
                    alert("Cajero en mantenimiento, vuelva pronto.");
                }else{
                    let dineroSolicitado = parseInt(prompt('Ingrese el dinero que desea retirar.'));
                    if(dineroSolicitado<=totalDinero && dineroSolicitado>0){
                        // redondeamos primero a la cifra menor mas cercana. 
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
                //document.write(JSON.stringify(billetesRetiro));
                console.log(totalDinero);
            }
        } else{
            alert("Contrasena incorrecta");
        };
    } else {
        alert('Este usuario no existe');
    }
    auxiliar = confirm('Desea continuar con la ejecucion?');
    if(auxiliar!=true){
        ejecucion = false;
    }
};