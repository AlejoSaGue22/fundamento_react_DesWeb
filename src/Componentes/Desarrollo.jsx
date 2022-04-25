import React from 'react'
import {nanoid} from 'nanoid'
import {firebase} from '../firebase'

const Desarrollo = () => {
  const [Titulo, setTitulo] = React.useState('')
  const [Autor, setAutor] = React.useState('')
  const [Editorial, setEditorial] = React.useState('')
  const [Edicion, setEdicion] = React.useState('')
  const [ISBN, setISBN] = React.useState('')
  const [Fechapubli, setFechapubli] = React.useState('')
  const [Listaslibros, setListaslibros] = React.useState([])
  const [id, setId] = React.useState()
  const [cambioNombre, setcambioNombre] = React.useState()
  const [error, setError] = React.useState()

  React.useEffect(()=>{
    const obtenerinfo = async () =>{
      try{
        const db = firebase.firestore()
        const data = await db.collection('Libros').get()
        const arrayDatos= data.docs.map(item =>(
            {
              id: item.id, ... item.data()
            }

        ))
        setListaslibros(arrayDatos)
      }catch(error){
        console.log(error)
      }
    }

    obtenerinfo();
  }
  )


  const guardarDatos = async (e) =>{
      e.preventDefault()
      if(!Titulo.trim()){
        setError('Digite el Titulo')
        return

      }
      if(!Autor.trim()){
        setError('Digite el Autor')
        return

      }
      if(!Editorial.trim()){
        setError('Digite el Editorial')
        return

      }
      if(!Edicion.trim()){
        setError('Digite el Edicion')
        return

      }
      if(!ISBN.trim()){
        setError('Digite el ISBN')
        return

      }
      if(!Fechapubli.trim()){
        setError('Ingrese la Fecha')
        return

      }

      try{

        const db = firebase.firestore()
      const nuevoLibro = {
        nomTitulo: Titulo, 
        nomAutor: Autor, 
        nomEditorial: Editorial, 
        nomEdicion: Edicion, 
        nomISBN: ISBN, 
        nomFecha: Fechapubli

      }

      const info = await db.collection('Libros').add(nuevoLibro)



      e.target.reset()
      setTitulo('')
      setAutor('')
      setEditorial('')
      setEdicion('')
      setISBN('')
      setFechapubli('')
      setError(null)

  
    }catch(error){
        console.log(error)
      }

    }

      

      const editarLibros = item =>{
      setTitulo(item.nomTitulo)
      setAutor(item.nomAutor)
      setEditorial(item.nomEditorial)
      setEdicion(item.nomEdicion)
      setISBN(item.nomISBN)
      setFechapubli(item.nomFecha)
      setcambioNombre(true)
      setId(item.id)
      }

      const aceptarEdicion = async e =>{
        e.preventDefault()

        if(!Titulo.trim()){
          setError('Digite el Titulo')
          return
  
        }
        if(!Autor.trim()){
          setError('Digite el Autor')
          return
  
        }
        if(!Editorial.trim()){
          setError('Digite el Editorial')
          return
  
        }
        if(!Edicion.trim()){
          setError('Digite el Edicion')
          return
  
        }
        if(!ISBN.trim()){
          setError('Digite el ISBN')
          return
  
        }
        if(!Fechapubli.trim()){
          setError('Ingrese la Fecha')
          return
  
        }

        try{
          const db = firebase.firestore()
          await db.collection('Libros').doc(id).update({
            nomTitulo: Titulo, 
          nomAutor: Autor, 
          nomEditorial: Editorial, 
          nomEdicion: Edicion, 
          nomISBN: ISBN, 
          nomFecha: Fechapubli

          }

          )
          const arrayEditado = Listaslibros.map(
            item => item.id === id ? {id:id, nomTitulo: Titulo, nomAutor: Autor, nomEditorial: Editorial, nomEdicion: Edicion, nomISBN: ISBN, nomFecha: Fechapubli}: item
              )
              setListaslibros(arrayEditado)
              setTitulo('')
              setAutor('')  
              setEditorial('')
              setEdicion('')
              setISBN('')
              setFechapubli('')
              setId('')
              setcambioNombre(false)
              setError(null)
        }catch(error){
          console.log(error)
        }


        

      }

      const eliminarLibros = async id =>{

        try{
          const db = firebase.firestore()
          await db.collection('Libros').doc(id).delete()
          const aux = Listaslibros.filter(item => item.id !== id)
          setListaslibros(aux)

        }catch(error){
          console.log(error)
        }
        
      }

      const cancelar = () =>{
        setcambioNombre(false)
        setTitulo('')
        setAutor('')
        setEditorial('')
        setEdicion('')
        setISBN('')
        setFechapubli('')
        setId('')
        setError(null)
      }
  
  return (
    <div className='container mt-5'>
    <h2 className= 'text-center'> BIBLIOTECA ALEJOSAN</h2>
    <hr/>
    <div className='row'>
        <div className='col-8'>
            <h4 className='text-center'>Listado de Libros</h4>
            <ul className='list-group'>
            {
          Listaslibros.map(item=>(
            <li className='list-group-item' key={item.id}>
         <spam className='lead'>{item.nomTitulo}-{item.nomAutor}-{item.nomEditorial}-{item.nomEdicion}-{item.nomISBN}-{item.nomFecha}</spam>
              <button className='btn btn-info btn-sm float-end mx-2' onClick={()=>eliminarLibros(item.id)}> Eliminar libro
              </button>
              <button className='btn btn-secondary btn-sm float-end mx-2' onClick={()=>editarLibros(item)}> Editar libro
              </button>

            </li>

          ))
          }

            </ul>

        </div>
        <div className='col-4'>
            <h4 className='text-center'>
              {
                cambioNombre ? 'Editar Libro' : 'Agregar Libro'
              }
            </h4>
       <form onSubmit ={cambioNombre ? aceptarEdicion : guardarDatos}>
         {
           error ? <spa className= 'text-danger'>{error} </spa> 
           : null

         }
          <input
          className='form-control mb-2'
          type = 'text'
          placeholder = 'Ingrese Titulo'
          onChange={(e)=> setTitulo(e.target.value)}
          value={Titulo}
          />
          <input
          className='form-control mb-2'
          type = 'text'
          placeholder = 'Ingrese Autor'
          onChange={(e)=> setAutor(e.target.value)}
          value={Autor}
          />
          <input
          className='form-control mb-2'
          type = 'text'
          placeholder = 'Ingrese Editorial'
          onChange={(e)=> setEditorial(e.target.value)}
          value={Editorial}
          />
          <input
          className='form-control mb-2'
          type = 'text'
          placeholder = 'Ingrese Edicion'
          onChange={(e)=> setEdicion(e.target.value)}
          value={Edicion}
          />
          <input
         className='form-control mb-2'
         type = 'text'
         placeholder = 'Ingrese ISBN'
         onChange={(e)=> setISBN(e.target.value)}
         value={ISBN}
         />

         <input
          className='form-control mb-2'
          type = 'date'
          onChange={(e)=> setFechapubli(e.target.value)}
          value={Fechapubli}
          />
          {
            cambioNombre ?
            (
              <>
              <button className = 'btn btn-warning btnblock' type='submit' 
              >Editar</button>
              <button className = 'btn btn-danger btn-block mx-2' onClick={() => cancelar()}
              >Cancelar </button>
              </>
            ) 
            :
              <button
              className='btn btn-primary btn-block'
              type='submit'
              >Agregar</button>

          }
         
     </form>
        </div>

    </div>
       
        <br/>
        

       </div>
      )
  }

export default Desarrollo