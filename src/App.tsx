import { useState } from "react";
import {toast} from 'react-toastify';

type ItemProps = {
  id: number;
  task: string;
  finished: boolean;
}
function App() {

  const [list, setList] = useState<ItemProps[]>([]);
  const [task, setTask] = useState('');

  function addTask() {

    if (task === '') {
      toast.error('Digite alguma tarefa!');
      return;
    }
    const newList = [...list, {
      id: Math.floor(Math.random() * 10000),
      task: task,
      finished: false
    }];

    setList(newList);
    setTask('');
  }

  function handleChangeItem(id: number) {
    setList((prevState) => {
      return prevState.map((item) =>
        item.id === id ? { ...item, finished: !item.finished } : item
      );
    });
  }

  function deleteItem(id: number) {
    const newList = list.filter((item) => item.id !== id)

    setList(newList)
  }
  return (
    <>
      <div className="container">
        <header>
            <input
              placeholder="O que tenho que fazer..."
              className="input"
              value={task}
              onChange={(event) => setTask(event.target.value)}
              />
            <button
              className="button"
              onClick={addTask}
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
                    onClick={() => handleChangeItem(item.id)}
                    >
                      <i className='bx bxs-rocket'></i>
                  </button>
                  <span>{item.task}</span>
                  <button
                    className="trash-button"
                    onClick={() => deleteItem(item.id)}>
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
