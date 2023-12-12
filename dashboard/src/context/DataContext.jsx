import { createContext, useEffect, useState } from "react"
import { getProducts, getOneProduct } from '../queries/productsApi';
import { getOneUser, getUsers } from '../queries/usersApi';

export const dataContext = createContext()

function DataContext({children}) {

  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [lastProduct, setLastProduct] = useState([])
  const [lastUser, setLastUser] = useState([])

  async function getData() {
    const dataProducts = await getProducts()
    const dataUsers = await getUsers()
    const dataOneProduct = await getOneProduct(dataProducts.data.products[dataProducts.data.products.length - 1].id)
    const dataOneUser = await getOneUser(dataUsers.data[dataUsers.data.length - 1].id)

    setLastProduct(dataOneProduct)
    setLastUser(dataOneUser)
    setProducts(dataProducts)
    setUsers(dataUsers)
  }

  useEffect(() => {
    getData()
  }, [])
  console.log(lastUser);
  return (
    <>
      {products.meta && users.meta && lastProduct.meta ? (
      <dataContext.Provider value={{ products, users, lastProduct, lastUser }}>
        {children}
      </dataContext.Provider>
      ) : undefined
      }
    </>
  )
}


export default DataContext