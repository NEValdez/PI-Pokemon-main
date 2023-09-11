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

    const sortPokemons = (pokemons) => {
        return pokemons.sort((a, b) => {
            if (sortOrder === "name") {
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
            <CardContainer pokemons={sortedPokemons} />

        </div>
    )
    }

export default Home;