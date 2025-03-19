import { useState } from "react";
import { nanoid } from 'nanoid'
import { useLocalStorage } from "usehooks-ts"
export default function App() {
  const [title, setTitle] = useLocalStorage('Title',"");
  const [taskList, setTaskList] = useLocalStorage("Tasks", []);
  const [focusedTaskId, setFocusedTaskId] = useState(null);
  const [showTicked, setShowTicked] = useLocalStorage("showTicked", true);
  const [bgColor, setBgColor] = useLocalStorage('BackgroundColor', "");
  const len = taskList.filter(task => task.isCompleted).length


  function handleClick(event) {
    event.preventDefault()
    const newTask = { id: nanoid(), textname: "", isCompleted: false }
    setTaskList(prev => [...prev, newTask])

  }
  function deleteTasks(id,event) {
    event.preventDefault();
    setTaskList(prev => prev.filter(task => task.id !== id))
    setTimeout(() => setFocusedTaskId(null), 0); 
  }
  function editing(id, newTask) {
    setTaskList(prev => (prev.map(
      task => ((task.id === id) ? { ...task, textname: newTask } : task)
    )))
  }
  function isChecked(id) {
    setTaskList(prev => (prev.map(
      task => ((task.id === id) ? { ...task, isCompleted: !task.isCompleted } : task)
    )))
  }
  function clearTasks() {
    setTaskList([])
    localStorage.removeItem("Tasks")
    //clears all data localStorage.clear()
  }
  function changeBg(e) {
    setBgColor(e.target.value)
  }
  function hideTicked() {
    setShowTicked(prev => !prev)
  }
  return (
    <div style={{ backgroundColor: bgColor }}>
      <h3>
        <p>Todo List</p>
        <input type="text"
          className="titleWritingArea"
          style={{ backgroundColor: bgColor }}
          value={title}
          placeholder="Write Title Here..."
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </h3>
      <ul>
        {taskList.filter(task => !task.isCompleted).map(task =>
          
          <li key={task.id} style={{ listStyleType: "none" }}>
            <input className="checkbox"
              style={{ backgroundColor: bgColor }}
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => isChecked(task.id)} />

            <input type="text"
              className="nameWritingArea" 
              style={{ textDecoration: task.isCompleted ? "line-through" : "none", backgroundColor: bgColor }}
              value={task.textname}
              onChange={(e) => editing(task.id, e.target.value)}
              onFocus={() => setFocusedTaskId(task.id)}
              onBlur={() => setFocusedTaskId(null)} 
              autoFocus
            />
            
            {focusedTaskId === task.id && (
              <button
                className="delButton"
                style={{ backgroundColor: bgColor }}
                onMouseDown={(event) => deleteTasks(task.id, event)}>x</button>
            )}
          </li>)}
        
        <br />
        
        <button className="addCheckbox"
          style={{ backgroundColor: bgColor }}
          onClick={handleClick}>+ List item</button>
        <br/>
        <hr/>
        <button
          style={{ backgroundColor: bgColor }}
          className="ticked"
          onClick={() => hideTicked()}> {showTicked ? "v" : "^"} {len} {len > 1 ? "ticked items" : "ticked item"}</button>

        {showTicked ? taskList.filter(task => task.isCompleted).map(task =>
          
          <li key={task.id} style={{ listStyleType: "none" }}>
            <input className="checkbox"
              style={{ backgroundColor: bgColor }}
              type="checkbox"
              checked={task.isCompleted} onChange={() => isChecked(task.id)} />

            <input type="text" className="tickednameWritingArea"
              style={{ textDecoration: task.isCompleted ? "line-through" : "none", backgroundColor: bgColor }}
              value={task.textname}
              onChange={(e) => editing(task.id, e.target.value)}
              onFocus={() => setFocusedTaskId(task.id)}
              onBlur={() => setFocusedTaskId(null)}
              autoFocus
            />

            {focusedTaskId === task.id && (
              <button style={{ backgroundColor: bgColor }}
                className="delButton"
                onMouseDown={(event) => deleteTasks(task.id, event)}>x</button>
            )}
          </li>):null}
      </ul>
      <button
        style={{ backgroundColor: bgColor }}
        onClick={clearTasks}>Clear All</button>
      <input type="color" value={bgColor} onChange={(e) => changeBg(e)}/>
    </div >
  )
}
