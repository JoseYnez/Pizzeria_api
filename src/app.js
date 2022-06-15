import express from "express";
import morgan from "morgan";
import moment from "moment";
moment.locale('es');
import authClienteRoutes from "./routes/authCliente.route";
import authEmpleadoRoutes from "./routes/authEmpleado.route";
import productosRoutes from "./routes/productos.route";
import ingredientesRoutes from "./routes/ingredientes.route";
import cuponesRoutes from "./routes/cupones.route";
import sucursalesRoutes from "./routes/sucursales.route";
import empleadosRoutes from "./routes/empleados.route";
import clientesRoutes from "./routes/clientes.route";
import inventariosRoutes from "./routes/inventarios.route";
import ordenesRoutes from "./routes/ordenes.route";
import pizzasRoutes from "./routes/pizzas.route";
import bitacorasRoutes from "./routes/bitacoraProductos.route";
import swaggerUiExpress from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import swwagerSpects from "./swagger.settings";

const app=express();

//settings swaager


app.use(morgan('dev'))
app.use(express.json());
app.get('/',(req,res)=>{
const formato='dddd Do MMMM YYYY HH MM SS'
const hoy=moment("2022-06-14T19:36:17.278Z");
const hoy2=moment("2022-06-13");
console.log(hoy);
    res.json(hoy2.format(formato));
})

////Routes
app.use('/api/authCliente',authClienteRoutes);
app.use('/api/authEmpleado',authEmpleadoRoutes);
app.use('/api/productos',productosRoutes);
app.use('/api/ingredientes',ingredientesRoutes);
app.use('/api/cupones',cuponesRoutes);
app.use('/api/sucursales',sucursalesRoutes);
app.use('/api/empleados',empleadosRoutes);
app.use('/api/clientes',clientesRoutes);
app.use('/api/inventarios',inventariosRoutes);
app.use('/api/ordenes',ordenesRoutes);
app.use('/api/pizzas',pizzasRoutes);
app.use('/api/bitacoraProductos',bitacorasRoutes);

///Route swagger
app.use('/api-doc',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerJsdoc(swwagerSpects)));


export default app;