import CardContainer from "../../Components/CardContainer/CardContainer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemonsByType, getPokemons } from "../../Redux/actions";
import FilterComponent from "../../Components/Filter/Filter";
import SortingOptions from "../../Components/Sorting/Sorting";
import style from './Home.module.css'
import NavBar from "../../Components/NavBar/NavBar";


const Home = () => {
    const dispatch = useDispatch();

    const filteredPokemons = useSelector((state) => state.filteredPokemons) || [];
    const [selectedType, setSelectedType] = useState("");
    const [sortOrder, setSortOrder] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [offset, setOffset] = useState(0);

    useEffect(()=>{
        dispatch(getPokemons());
    }, [dispatch])
    
    const handleFilterByType = (type) => {
        setSelectedType(type);
        dispatch(filterPokemonsByType(type));
    };

    const handleSortChange = (field, value) => {
        if (field === "order") {
          setSortOrder(value);
        } else if (field === "direction") {
          setSortDirection(value);
        }
      };

      
    const handleNextClick = () => {
        const newOffset = offset + 12;
        dispatch(getPokemons(12, newOffset))
        setOffset(newOffset)
    }
    
    const handlePrevClick = () => {
        const newOffset = offset - 12;
        dispatch(getPokemons(12, newOffset))
        setOffset(newOffset)
    }
    
    const sortPokemons = (pokemons) => {
        return pokemons.sort((a, b) => {
            if (sortOrder === "id") {
                return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
            } else if (sortOrder === "name") {
                return sortDirection === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (sortOrder === "attack") {
                return sortDirection === "asc" ? a.attack - b.attack : b.attack - a.attack;
            }
        return 0;
    });
    };

    const sortedPokemons = sortPokemons(filteredPokemons);

    return(
        <div className={style.container}>
            <NavBar/>
            <FilterComponent selectedType={selectedType} onFilterByType={handleFilterByType}/>
            <SortingOptions sortOrder={sortOrder} sortDirection={sortDirection} onSortChange={handleSortChange}/>
            <div className={style.prevNext}>
                { offset>=12 && <button className={style.buttonP} onClick={handlePrevClick}> {"<<<"} </button>}
                { offset<=88 && <button className={style.buttonN} onClick={handleNextClick}> {">>>"} </button>}
            </div>
            <CardContainer pokemons={sortedPokemons} />
        </div>
    )
    }

export default Home;