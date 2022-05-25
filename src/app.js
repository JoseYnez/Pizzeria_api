import express from "express";
import morgan from "morgan";
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


const app=express();
app.use(morgan('dev'))
app.use(express.json());
app.get('/',(req,res)=>{
    res.json("Bienvenido");
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

export default app;