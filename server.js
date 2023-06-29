require("dotenv").config();
const express = require("express");
const app = express();
const { leerFrutas, guardarFrutas } = require("./src/frutasManager");
const PORT = process.env.PORT || 3000;

let BD = [];

app.use(express.json());
//tambien s puede utilizar app.use(dotenv.json())

app.use((req, res, next) => {
  BD = leerFrutas();
  next();
});

app.get("/", (req, res) => {
   res.send(BD);
});

// GET:id: este es el método convencional que nos permite ubicar un producto. 
// En este caso, aplica el método de array .find() para ubicar el producto y retornarlo. 
// Recuerda retornar un mensaje de error si no encuentra el producto.


// app.get("/id/:id",(req,res)=>{
//   let arrayResultadoGet=[];
//   let idFrutaABuscar=parseInt(req.params.id); 
//   function itemIgual(item){return item.id===idFrutaABuscar;} //funcion accesoria para callback
//   if(typeof(idFrutaABuscar)==='number'){
//     for (fruta of BD){
//       if(BD.find(itemIgual)!=undefined){   //le pasa el iterador a la funcion callback itemIgual
//         arrayResultadoGet.push(fruta)}}}
//         // manejo de errores y resultados
//         if(arrayResultadoGet.length>0){
//           res.status(201).send(`Se encontraron los productos con ID ${idFrutaABuscar}`);      
//         }else{
//           res.status(404).send(`no se encontraron productos`); }    
//   })

  app.get("/:id",(req,res)=>{
    let idFrutaABuscar=parseInt(req.params.id); 
    function itemIgual(item){return item.id===idFrutaABuscar;} //funcion accesoria para callback
    if(typeof(idFrutaABuscar)==='number'){
        resultado=BD.find(itemIgual);
        if(resultado!=undefined){
          return res.status(200).json(resultado)}else{
            res.status(404).send(`no se encontraron productos`);}}
        })

//POST 
  app.post("/", (req, res) => {
    const nuevaFruta = req.body;
    BD.push(nuevaFruta);
    guardarFrutas(BD);
    res.status(201).send("Fruta agregada!");
});

// DELETE: este método HTTP eliminará un producto existente. 
// También debes agregar el parámetro :id en la URL para identificar el producto en 
// el array, y luego aplicar el método de array .splice(). 
// Recuerda retornar un mensaje de error si no encuentra el producto.

//utilizo loop while (condicion) para borrar mas de un elemento con el mismo ID 

app.delete("/:id",(req,res)=>{
  let arrayResultado=[];
  let idFrutaABorrar=parseInt(req.params.id)
  if(typeof(idFrutaABorrar==='number')){
          while (BD.find(i=>i.id===idFrutaABorrar)) {
                arrayResultado.push(BD.find(i=>i.id===idFrutaABorrar));
                BD.splice(BD.indexOf(BD.find(i=>i.id===idFrutaABorrar)),1);
                guardarFrutas(BD);
          }}
          // manejo de errores y resultados
   arrayResultado.length>0?
            res.status(200).send(`Se borrarron ${arrayResultado.length} productos con ID ${idFrutaABorrar} `)
          : res.status(404).send(`no se encontraron`);  
        })

// PUT: este método HTTP permitirá modificar algún producto existente. 
// Debes agregar el parámetro :id en la URL para encontrar primero el producto, y 
// luego modificarlo de acuerdo a los datos enviados en el cuerpo del mensaje.
// Recuerda retornar un mensaje de error si no encuentra el producto.

app.put("/:id",(req,res)=>{
  let arrayResultadoPut=[];
  let arrayResultadoAgregar=[];
  let idFrutaAModificar=parseInt(req.params.id); 
  const frutaNueva=req.body;
  function itemIgual(item){return item.id===idFrutaAModificar;} //funcion accesoria para callback
  if(typeof(idFrutaAModificar)==='number'){
    //si existe el producto lo modifico, si no existe lo agrego    
        let resultado=BD.find(itemIgual);
        if(resultado){
          arrayResultadoPut.push(resultado);
          BD.splice(BD.indexOf(resultado),1,frutaNueva);
          guardarFrutas(BD);} 
        else {
          arrayResultadoAgregar.push(req.body);
          BD.push(req.body)
          guardarFrutas(BD)}
      }
        // manejo de errores y resultados
        if(arrayResultadoPut.length>0){
          res.status(200).send(`Se modificaron ${arrayResultadoPut.length} productos con ID ${idFrutaAModificar}`);      
        } else if (arrayResultadoAgregar.length>0){
          res.status(201).send(`Se agregaron ${arrayResultadoAgregar.length} productos con ID ${idFrutaAModificar}`);}
          else{      
          res.status(404).send(`no se encontraron productos`); }    
  })

  

app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe.");
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
