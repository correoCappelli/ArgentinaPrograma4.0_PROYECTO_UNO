## para lanzar el Server utilizar >nodemon start
## PORT por defecto es 3008
## el metodo HTTP PUT modifica el /:id si existe , y si no existe lo adiciona a la base de datos
## los endpoints son :
   "/"       raiz principal 
             metodo GET : devuelve la base de datos completa
             metodo POST : agrega el elemento del body
   "/:id"    metodo GET : devuelve el producto del req.param.Id
             metodo DELETE : borra el producto dl req.param.id
             metodo PUT : modifica el producto del req.param.id , si no existe lo agrega
## el metodo DELETE utiliza un arreglo para guardar los objetos encontrados. Esto es por si hay má de uno con el mismo Id.             