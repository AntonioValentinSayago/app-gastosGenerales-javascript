import { abrirFormularioGasto } from "./eventoBtnFormularioGasto";
import cargarGastos from './cargarGastos'
import cargarTotalGastados from './cargarTotalGastado';

const contenedorGastos = document.getElementById('gastos')
contenedorGastos.addEventListener('click', (e) => {

   const gasto = e.target.closest('.gasto');

   //Comprobamos si estamos haciendo click en el gasto 
   if(gasto){
        if(gasto.scrollLeft > 0){

            gasto.querySelector('.gasto__info').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });
            
        }else {

            gasto.querySelector('.gasto__acciones').scrollIntoView({
                behavior: 'smooth',
                inline: 'start',
                block: 'nearest'
            });

        }
   }

   //Funcionalidad para el Boton de Editar 
   if(e.target.closest('[data-accion="editar-gasto"]')){

        const id = gasto.dataset.id;
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));

        let cantidad = '', descripcion = '' ;
        
        //Se comprueba de hay datos guardados en el local storage
        if(gastosGuardados && gastosGuardados.length > 0){

            gastosGuardados.forEach((gasto) => {

                if ( gasto.id === id ) {
                    cantidad = gasto.precio
                    descripcion = gasto.descripcion
                }

            });

            // Le ponemos la descripcion a cada input del formulario
            document.querySelector('#formulario-gasto #descripcion').value = descripcion;
            document.querySelector('#formulario-gasto #precio').value = cantidad;
            document.querySelector('#formulario-gasto').dataset.id = id;

            abrirFormularioGasto('editarGasto');
        }
    }

    //Borrar Gasto 
    if (e.target.closest('[data-accion="eliminar-gasto"]')) {
        //Obtenemos el id del gasto del elemento que queremos eliminar
        const id = e.target.closest('.gasto').dataset.id;
        
        //Obtener los dastos guardados
        const gastosGuardados = JSON.parse(window.localStorage.getItem('gastos'));
        
        if (gastosGuardados) {
            const nuevosGastos = gastosGuardados.filter( (gasto) => {
                if (gasto.id !== id) {
                    return gasto;
                }
            })
            window.localStorage.setItem('gastos', JSON.stringify(nuevosGastos));
        }

        cargarGastos()
        cargarTotalGastados()
    }

})