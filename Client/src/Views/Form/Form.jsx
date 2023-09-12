import { useState, useEffect } from "react"
import axios from "axios"
import NavBar from "../../Components/NavBar/NavBar"
import style from "./Form.module.css"
import { getAllTypes } from "../../Helpers/Helpers"

const Form = () => {

    const [form, setForm] = useState({
        name:"",
        sprites:"",
        health:"",
        attack:"",
        defense: "",
        speed:"",
        height:"",
        weight:"",
        type:[],
    })

    const [typesList, setTypesList] = useState([]);

        useEffect(() => {
            async function fetchTypes() {
            try {
                const types = await getAllTypes();
                setTypesList(types);
            } catch (error) {
                console.error("Error al obtener tipos:", error);
            }
            }

            fetchTypes();
        }, []);


    const [errors, setErrors] = useState({
        name:"",
        sprites:"",
        health:"",
        attack:"",
        defense: "",
        speed:"",
        height:"",
        weight:"",
        type:"",
    })

    const changeHandler = (event) => {
        const property = event.target.name;
        let value;
            if (event.target.type === "checkbox") {
                value = handleCheckboxChange(event)
                setForm({...form, type:value})
            } else {
                value = event.target.value;        
                validate({...form, [property]:value});
                setForm({...form, [property]:value})
                }
    }

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        const updatedTypes = [...form.type];
        if (checked) {
            updatedTypes.push(name);
            setForm({ ...form, type: updatedTypes });
            
        } else {
            const index = updatedTypes.indexOf(name);
            if (index !== -1) {
                updatedTypes.splice(index, 1);
            }
            setForm({ ...form, type: updatedTypes });
        }
        return updatedTypes;
      };
    
    const validate = (form) => {
        let newErrors = {}
        const letraRegex = /^[A-Z]+$/i;
        const numberRegex = /^\d+$/;
        const regexURL = /^(ftp|http|https):\/\/[^ "]+$/;
        if(letraRegex.test(form.Nombre)){
            setErrors({...errors, name:""})
        } else {
            setErrors({...errors, name:"Sólo debe contener letras"})
        }

        if(regexURL.test(form.Imagen)){
            setErrors({...errors, sprites:""})
        } else {
            setErrors({...errors, sprites:"Debe ser un URL"})
        }

        if(numberRegex.test(form.health)){
            setErrors({...errors, health:""})
        } else {
            setErrors({...errors, health:"Deben ser sólo números"})
        }

        if(numberRegex.test(form.Ataque)){
            setErrors({...errors, attack:""})
        } else {
            setErrors({...errors, attack:"Deben ser sólo números"})
        }

        if(numberRegex.test(form.defense)){
            setErrors({...errors, defense:""})
        } else {
            setErrors({...errors, defense:"Deben ser sólo números"})
        }

        if(numberRegex.test(form.speed)){
            setErrors({...errors, speed:""})
        } else {
            setErrors({...errors, speed:"Deben ser sólo números"})
        }

        if(numberRegex.test(form.height)){
            setErrors({...errors, height:""})
        } else {
            setErrors({...errors, height:"Deben ser sólo números"})
        }

        if(numberRegex.test(form.weight)){
            setErrors({...errors, weight:""})
        } else {
            setErrors({...errors, weight:"Deben ser sólo números"})
        }

        setErrors(newErrors)
 
    }

    const submitHandler = async (event) => {
        event.preventDefault()
        if (Object.values(errors).every((error)=> error === "")) {
            try{                
                await axios.post("http://localhost:3001/pokemons/pokemons", form)
                alert("Pokemon creado exitosamente")
                setForm({
                    name:"",
                    sprites:"",
                    health:"",
                    attack:"",
                    defense: "",
                    speed:"",
                    height:"",
                    weight:"",
                    types:[],
                })
            setErrors({
                name:"",
                sprites:"",
                health:"",
                attack:"",
                defense: "",
                speed:"",
                height:"",
                weight:"",
                types:"",
            })
            } catch(error){
            window.alert("Error al crear el pokemon", error)
            }
        }
    }
    return(
        <div className={style.container}>
        <form onSubmit={submitHandler}>
            <NavBar/>
            <div className={style.form}>
                <div className={style.inputs}>
                    <label>Nombre: </label>
                    <input type="text" value={form.name} onChange={changeHandler} name="name"/>
                    {errors.name && <span>{errors.name}</span>}
                </div>

                <div className={style.inputs}>
                    <label>Imagen: </label>
                    <input type="text" value={form.sprites} onChange={changeHandler} name="sprites"/>
                    {errors.sprites && <span>{errors.sprites}</span>}
                </div>

                <div className={style.inputs}>
                    <label>Vida: </label>
                    <input type="text" value={form.health} onChange={changeHandler} name="health"/>
                    {errors.health && <span>{errors.health}</span>}
                </div>

                <div className={style.inputs}>
                    <label>Ataque: </label>
                    <input type="text" value={form.attack} onChange={changeHandler} name="attack"/>
                    {errors.attack && <span>{errors.attack}</span>}
                </div>

                <div className={style.inputs}>
                    <label>Defensa: </label>
                    <input type="text" value={form.defense} onChange={changeHandler} name="defense"/>
                    {errors.defense && <span>{errors.defense}</span>}
                </div>

                <div className={style.inputs}>
                    <label>Velocidad: </label>
                    <input type="text" value={form.speed} onChange={changeHandler} name="speed"/>
                    {errors.speed && <span>{errors.speed}</span>}
                </div>

                <div className={style.inputs}>
                    <label>Altura: </label>
                    <input type="text" value={form.height} onChange={changeHandler} name="height"/>
                    {errors.height && <span>{errors.height}</span>}
                </div>

                <div className={style.inputs}>
                    <label>Peso: </label>
                    <input type="text" value={form.weight} onChange={changeHandler} name="weight"/>
                    {errors.weight && <span>{errors.weight}</span>}
                </div>

                <div className={style.checkboxes}>
                <label>Tipos: </label>
                    {typesList.map((type) => (
                    <label key={type}>
                        <input type="checkbox" name={type} checked={form.type.includes(type)} onChange={changeHandler}/>
                        <label>{type.toUpperCase()}</label>
                    </label>
                    ))}
                </div>
            <button className={style.crearPokemon} type="submit">Crear pokemon</button>
            </div>
        </form>
        </div>
    )
}

export default Form;