import { useState } from "react";
import { nanoid } from 'nanoid'
export default function App() {
  const [items, setItems] = useState("")
  const [addItem, setAddItem] = useState([])
  function changeItemName(e) {
    setItems(e.target.value)
  }
  function handleSubmit(event) {
    event.preventDefault()
    const newItem = { id: nanoid(), name: items }
    setAddItem(prev => [...prev, newItem])
    setItems("")
  }

  const listt = addItem.map(item =>
    <div>
      <li key={item.id}>
        {item.name}
      </li>
      <button onClick={() => deleteItems(item.id)}>Delete</button>
    </div>)
  
  function deleteItems(id) {
    setAddItem(prev => prev.filter(item => item.id !== id))
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={items} onChange={changeItemName} placeholder="Enter item name" />
        <button type="submit">Add</button>
      </form>
      <p>Item Added: <ul>{addItem ? listt : "No items in the shopping list"}</ul> </p>
    </div >
  )
}