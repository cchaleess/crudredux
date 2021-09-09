import React , {useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions'
import { mostrarAlerta, ocultarAlertaActions } from '../actions/alertaActions'

const NuevoProducto = ({history}) => {

    //state del componente
    const [nombre, guardarNombre] = useState ('');
    const [precio, guardarPrecio] = useState (0);

    //utilizar useDispatch y te crea una funcion
    const dispatch = useDispatch();

    //acceder al state del store
    const cargando = useSelector(state => state.productos.loading);
    const error= useSelector(state => state.productos.error);
    const alerta = useSelector(state => state.alerta.alerta);


    //console.log(cargando);

   //mandar a llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) )

    //cuando el ususario haga submit
    const submitNuevoProducto = e =>{

        e.preventDefault();

        //validar formulario
        if(nombre.trim() === '' || precio <=0 ){

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes : 'alert alert-danger text-center text-upperacase p3'
            }

            dispatch(mostrarAlerta(alerta));

            return;
        }
        //si no hay errores
        dispatch ( ocultarAlertaActions() );
        // crear el nuevo producto
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar
        history.push('/');
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar nuevo producto
                        </h2>

                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                        <form
                        onSubmit = {submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label htmlFor="">Nombre producto</label>
                                <input type="text" 
                                        className="form-control" 
                                        name="nombre"
                                        value={nombre}
                                        onChange={e => guardarNombre(e.target.value)}
                                        />
                            </div>

                            <div className="form-group">
                                <label htmlFor="">Precio producto</label>
                                <input type="number" 
                                className="form-control" 
                                name="precio"
                                value={precio}
                                onChange={e => guardarPrecio(Number(e.target.value))}

                                />
                            </div>

                            <button type="submit" 
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100">
                                Agregar
                            </button>
                        </form>
                        {cargando ? <p>Cargando... </p>: null}
                        {error ? <p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NuevoProducto;