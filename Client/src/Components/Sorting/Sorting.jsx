import React from "react";

const SortingOptions = ({ sortOrder, sortDirection, onSortChange }) => {
  return (
    <div>
      <label>Ordenar por:</label>
      <select value={sortOrder} onChange={(e) => onSortChange("order", e.target.value)}>
        <option value="id">Por id</option>
        <option value="name">Nombre</option>
        <option value="attack">Ataque</option>
      </select>

      <label>Dirección:</label>
      <select value={sortDirection} onChange={(e) => onSortChange("direction", e.target.value)}>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>
  );
};

export default SortingOptions;