export async function getProducts(){

  try {    
    const data = await fetch('http://localhost:8080/api/products')
    const products = await data.json()
    if(products.meta.status === 200){
      return products
    }

    throw new Error("Error al cargar los datos de los productos")
  } catch (error) {
    console.log(error)
  }
}


export async function getOneProduct(id){

  try {    
    const data = await fetch(`http://localhost:8080/api/products/${id}`)
    const product = await data.json()
    if(product.meta.status === 200){
      return product
    }

    throw new Error("Error al cargar del producto")
  } catch (error) {
    console.log(error)
  }
}