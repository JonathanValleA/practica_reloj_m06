// Crear Objeto Clock con las siguientes propiedades.
function Clock(hora,minutos,segundos, sentit , estat) {
    this.hora = hora;
    this.minutos = minutos;
    this.segundos = segundos;
    this.sentit = sentit
    this.estat = estat;
    // Funcion para mostrar la estructura del reloj
    this.formata = function() {
        let cad_segon = this.segundos.toString();
        let cad_minut = this.minutos.toString();
        let cad_hora = this.hora.toString();   
        return cad_hora + ':' + cad_minut + ':' + cad_segon;
    }
    // Retornas el formato del reloj
    this.format = function(){
        return this.formata();
    }
    // Funcion para arrancar el reloj y empezar a contar
    this.arrenca = function() { 
       if (estat==false) estat=true;
       this.ref = setTimeout(() => {
        if(this.sentit){
            this.segundos++;
            if (this.segundos == 60) {
            this.segundos = 0;
            this.minutos += 1;
            if (this.minutos == 60) {
                this.minutos = 0;
                this.hora += 1;
            }
            }
        }
       }, 1000);
    };
    // Retornar el reloj
    this.iniciar = function(){
        return this.arrenca();
    }
    // Funcion para parar el reloj con el clearInterval
    this.atura = function() {
       if (this.estat==true) this.estat=false;
       clearInterval(this.ref);
    };
    // Retornar la funcion de parar el reloj
    this.parar = function(){
        return this.atura();
    }
    // Funcion para resetear el reloj a 0
    this.reset = function() {
        this.atura();
        this.segundos = 0;
        this.minutos = 0;
        this.hora = 0;
    }
    // Retornar la funcion reset
    this.resetear = function(){
        return this.reset();
    }
 }
// Creamos el objeto Clock y le pasamos la hora, minutos segundos, el sentido y el estado
let hor = new Clock(hora=new Date().getHours(),minutos=new Date().getMinutes(), segundos=new Date().getSeconds(), true, true);
let hor2 = new Clock(0,0,0, true, true);
let hor3 = new Clock(0,5,0, false, true);
let cronometro = 0;
// Funcion para imprimir el resultado por pantalla.
function imprimirResultado(){
    let clock = document.querySelector(".reloj");
    let parar = document.querySelector(".parar");
    let start = document.querySelector(".start");
    clock.innerHTML = hor.format();
    if(cronometro > 10){
        hor2.iniciar();
        start.innerHTML = hor2.format();
    }
    parar.innerHTML = hor3.format();
    // Cada vez que los minutos del segundo reloj sea numeros pares, se parara el reloj 3.
    if(hor2.minutos % 2 == 0){
        hor3.atura();
    // En caso contrario, se ejecutara el reloj 3
    }else{
        hor3.arrenca();
    }
    // Se incrementa el cronometro
    cronometro++;
    // Se inicia el reloj 1 de primeras
    hor.iniciar();
    // Llamamos a la funcion de inicio() para ir incrementando el tiempo en tiempo real y no tener que recargar la pagina.
    inicio();
}
// Ejecutar el reloj
function inicio(){
    // Establecemos nuestro reloj y lo ejecutamos como una funcion de tipo callback cada 1 segundo.
    t = setTimeout(imprimirResultado,1000);
}
inicio();

console.log(hor);