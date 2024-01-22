import { KeyboardEvent, useEffect, useState } from "react";
import {toast} from 'react-toastify';

type ItemProps = {
  id: number;
  task: string;
  finished: boolean;
}
function App() {

  const [list, setList] = useState<ItemProps[]>([]);
  const [taskValue, setTask] = useState('');

  useEffect(() => loadTasks(), []);

  function handleAddTask() {

    if (taskValue === '') {
      toast.error('Digite alguma tarefa!');
      return;
    }
    const newList = [...list, {
      id: Math.floor(Math.random() * 10000),
      task: taskValue,
      finished: false
    }];

    setList(newList);
    setTask('');

    showTasks(newList);
  }

  function showTasks(list: ItemProps[]) {
    setList(list);
    localStorage.setItem('todoList', JSON.stringify(list));
  }

  function handleChangeTask(id: number) {
      const newList = list.map((item) => {
          return item.id === id ? { ...item, finished: !item.finished } : item
      });

      showTasks(newList)
    }
    
    function handleDeleteTask(id: number) {
      const newList = list.filter((item) => item.id !== id);
      
      showTasks(newList);
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      handleAddTask();
    }
  }
  
  function loadTasks() {
    const tasks = localStorage.getItem('todoList');

    if (tasks) {
      setList(JSON.parse(tasks));
    }
  }

  return (
    <>
      <div className="container">
        <header>
            <input
              placeholder="O que tenho que fazer..."
              className="input"
              value={taskValue}
              onChange={(event) => setTask(event.target.value)}
              onKeyDown={(event) => handleKeyDown(event)}
              />
            <button
              className="button"
              onClick={handleAddTask}
              >
                Adicionar
            </button>
        </header>
        <ul className="list-container">
        {list.length === 0 && (
          <h2>Não há tarefas</h2>
        )}
          {list.length > 0 && (
            list.map((item: ItemProps) => (
              <li className={`item ${item.finished && 'active'}`} key={item.id}>
                  <button
                    className="edit-button"
                    onClick={() => handleChangeTask(item.id)}
                    >
                      <i className='bx bxs-rocket'></i>
                  </button>
                  <span>{item.task}</span>
                  <button
                    className="trash-button"
                    onClick={() => handleDeleteTask(item.id)}>
                      <i className='bx bxs-trash-alt'></i>
                  </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </>
  )
}

export default App
