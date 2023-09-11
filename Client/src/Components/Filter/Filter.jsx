import React from "react";
import style from "./Filter.module.css"

const FilterComponent = ({ selectedType, onFilterByType }) => {
  const handleTypeChange = (event) => {
    const selectedValue = event.target.value;
    onFilterByType(selectedValue);
  };

  return (
    <div className={style.container}>
      <label>Filtrar por tipo:</label>
      <select value={selectedType} onChange={handleTypeChange}>
        <option value="">Todos</option>
        <option value="fire">Fuego</option>
        <option value="water">Agua</option>
        <option value="grass">Hierba</option>
        <option value="normal">Normal</option>
        <option value="fighting">Lucha</option>
        <option value="flying">Volador</option>
        <option value="poison">Veneno</option>
        <option value="ground">Tierra</option>
        <option value="rock">Roca</option>
        <option value="bug">Bicho</option>
        <option value="ghost">Fantasma</option>
        <option value="steel">Acero</option>
        <option value="electric">Electrico</option>
        <option value="psychic">Psiquico</option>
        <option value="ice">Hielo</option>
        <option value="dragon">Dragón</option>
        <option value="dark">Siniestro</option>
        <option value="fairy">Hada</option>
        <option value="shadow">Sombra</option>
        {/* Agrega más opciones según los tipos disponibles */}
      </select>
    </div>
  );
};

export default FilterComponent;