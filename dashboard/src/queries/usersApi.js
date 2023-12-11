export async function getUsers(){

  try {    
    const data = await fetch('http://localhost:8080/api/users')
    const users = await data.json()
    if(users.meta.status === 200){
      return users
    }

    throw new Error("Error al cargar los datos de los usuarios")
  } catch (error) {
    console.log(error)
  }
}


export async function getOneUser(id){

  try {    
    const data = await fetch(`http://localhost:8080/api/users/${id}`)
    const user = await data.json()
    if(user.meta.status === 200){
      return user
    }

    throw new Error("Error al cargar los datos del usuario")
  } catch (error) {
    console.log(error)
  }
}