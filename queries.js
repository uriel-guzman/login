/**
 * Conexión a la base de datos
 */
const Pool = require('pg').Pool
const pool = new Pool({
  user:         "postgres",
  password:     "salamance333",
  host:         "localhost",
  port:         5432,
  database:     "postgres"
})

 /**
  * Generar objeto JSON con todo lo que está en la tabla "libros"
  */
const getBooks = (request, response) => {
    pool.query('SELECT * FROM libros ORDER BY id ASC', (error, results) => {
        if(error) {
            throw error
        }
    response.status(200).json(results.rows)
    })
}
/**
 * Insertar valores del formulario en la tabla "libros"
 */
const addBook = (request, response) => {
    const title         = request.body.title
    const author        = request.body.author
    const editorial     = request.body.editorial
    const genre         = request.body.genre
    const isbn          = request.body.isbn
    const copyNum  = request.body.copyNum

    pool.query("INSERT INTO libros (titulo, autor, editorial, genero, ISBN, num_ejemplar) VALUES ($1, $2, $3, $4, $5, $6)",
    [title, author, editorial, genre, isbn, copyNum],
    (error, results) => {
         if (error) {
             throw error
         }
         response.status(201).send('Libro añadido')
    })
}

/**
 * Consultas individuales
 */
const getBookById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM libros WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

/**
 * Exporta funciones
 */
module.exports = {
    getBooks,
    addBook,
    getBookById
  }