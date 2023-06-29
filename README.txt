## para lanzar el Server utilizar >nodemon start
## el metodo HTTP PUT modifica el /:id si existe , y si no existe lo adiciona a la base de datos
## los endpoints son :
   "/"       raiz principal 
             metodo GET : devuelve la base de datos completa
             metodo POST : agrega el elemento del body
   "/:id"    metodo GET : devuelve el producto del req.param.Id
             metodo DELETE : borra el producto dl req.param.id
             metodo PUT : modifica el producto del req.param.id , si no existe lo agrega