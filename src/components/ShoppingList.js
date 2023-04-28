import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const[searchText, setSearchText] = useState("")
   
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  }).filter((item) => {
    if (!searchText) return true;
    return item.name.toLowerCase().includes(searchText.toLowerCase());
  });

  function onSearchChange (newSearch){
    setSearchText(newSearch)
  
  }

  function onItemFormSubmit(newItem){
    const listWithNewItem = [newItem, ...itemsToDisplay]
    setItems(listWithNewItem);
  }

  return (
    <div className="ShoppingList">
      <ItemForm  onItemFormSubmit = {onItemFormSubmit} />
      <Filter onCategoryChange={handleCategoryChange} 
      onSearchChange = {onSearchChange}
      search={searchText}
      searchText = {setSearchText} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
