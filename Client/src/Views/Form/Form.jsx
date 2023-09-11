import { useState } from "react"
import axios from "axios"

const Form = () => {

    const [form, setForm] = useState({
        Nombre:"",
        Imagen:"",
        Vida:"",
        Ataque:"",
        Defensa: "",
        Velocidad:"",
        Altura:"",
        Peso:"",
        Tipos:"",
    })

    const [errors, setErrors] = useState({
        Nombre:"",
        Imagen:"",
        Vida:"",
        Ataque:"",
        Defensa: "",
        Velocidad:"",
        Altura:"",
        Peso:"",
        Tipos:"",
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        validate({...form,[property]:value});
        setForm({...form,[property]:value})
    }
    //const numberRegex = /^\d+$/

    const validate = (form) => {
        if(!/^\b(?:\w|-)+\b$/.test(form.Nombre)){
            setErrors({...errors, Nombre:"Sólo debe contener letras"})
        }

        if(!/^\d+$/.test(form.Vida)){
            setErrors({...errors, Vida:"Deben ser sólo números"})
        }

        if(!/^\d+$/.test(form.Ataque)){
            setErrors({...errors, Vida:"Deben ser sólo números"})
        }

        if(!/^\d+$/.test(form.Defensa)){
            setErrors({...errors, Vida:"Deben ser sólo números"})
        }

        if(!/^\d+$/.test(form.Velocidad)){
            setErrors({...errors, Vida:"Deben ser sólo números"})
        }

        if(!/^\d+$/.test(form.Altura)){
            setErrors({...errors, Vida:"Deben ser sólo números"})
        }

        if(!/^\d+$/.test(form.Peso)){
            setErrors({...errors, Vida:"Deben ser sólo números"})
        }
    }

    const submitHandler = async (event) => {
        event.preventDefault()

        if (validate()) {
        try{
        await axios.post("http://localhost:3001/pokemons", form)
        alert("Pokemon creado con exito");
        setForm({
            Nombre:"",
            Imagen:"",
            Vida:"",
            Ataque:"",
            Defensa: "",
            Velocidad:"",
            Altura:"",
            Peso:"",
            Tipos:"",
        })} catch(error){
            console.error("Error al crear el pokemon", error)
        }
    }
}


    return(
        <form onSubmit={submitHandler}>
            <div>
                <label>Nombre: </label>
                <input type="text" value={form.Nombre} onChange={changeHandler} name="Nombre"/>
            </div>

            <div>
                <label>Imagen: </label>
                <input type="text" value={form.Imagen} onChange={changeHandler} name="Imagen"/>
            </div>

            <div>
                <label>Vida: </label>
                <input type="text" value={form.Vida} onChange={changeHandler} name="Vida"/>
            </div>

            <div>
                <label>Ataque: </label>
                <input type="text" value={form.Ataque} onChange={changeHandler} name="Ataque"/>
            </div>

            <div>
                <label>Defensa: </label>
                <input type="text" value={form.Defensa} onChange={changeHandler} name="Defensa"/>
            </div>

            <div>
                <label>Velocidad: </label>
                <input type="text" value={form.Velocidad} onChange={changeHandler} name="Velocidad"/>
            </div>

            <div>
                <label>Altura: </label>
                <input type="text" value={form.Altura} onChange={changeHandler} name="Altura"/>
            </div>

            <div>
                <label>Peso: </label>
                <input type="text" value={form.Peso} onChange={changeHandler} name="Peso"/>
            </div>

            <div>
                <label>Tipos: </label>
                <input type="text" value={form.Tipos} onChange={changeHandler} name="Tipos"/>
            </div>
            <button type="button">Crear pokemon</button>
        </form>
    )
}

export default Form;