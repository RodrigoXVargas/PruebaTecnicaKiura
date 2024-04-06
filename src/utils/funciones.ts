//Funcion que concatena los mesajes de error de las validaciones
export function jsonProcess(data: string | any[]) {
    let output = ""
    for (let index = 0; index < data.length; index++) {
        output += data[index].message + ". "

    }
    return output
}

/**
 La función "paginar" calcula el número total de páginas según el límite dado y el total de elementos, y devuelve los números de página actual, siguiente y anterior..
 @param {number} page - El número de página actual
 @param {number} limit - El parámetro `límite` representa el número máximo de elementos que se mostrarán en cada página de la paginación.
 @param {number} totalItems - El número total de elementos del conjunto de datos.
 @returns un objeto con las siguientes propiedades:
  - totalPages: el número total de páginas calculado en función del total de elementos y el límite.
  - currentPage: el número de página actual pasado como argumento a la función.
  - nextPage: el número de la página siguiente si existe, en caso contrario, nulo.
  - previusPage: el número de página anterior si existe, en caso contrario nulo.
 */
export function paginar(page: number, limit: number, totalItems: number) {
    const totalPages = Math.ceil(totalItems / limit)
    const nextPage = page < totalPages ? page + 1 : null
    const previusPage = page > 1 ? page - 1 : null

    return {
        totalPages,
        currentPage: page,
        nextPage,
        previusPage
    }
}