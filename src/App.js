import { useState } from 'react';
import './App.css';

function App() {
  const [add, setAdd] = useState([]);
  const [idle, setIdle] = useState('');
  const [del, setDel] = useState([]);
  const [comp, setComp] = useState([]);

  const dlt = (index) => {
    var temp = add.filter((obj, i) => {
      if (index !== i) return obj
      else setDel([...del, obj])
    });
    setAdd(temp);
  }

  const taskCompleted = (index) => {
    var temp = add.map((obj, i) => {
      if (index === i) {
        setComp([...comp, { text: obj.text, status: true }]);
        return ({});
      }
      return obj;
    });
    setAdd(temp);
  }

  const notCompleted = (index) => {
    var temp = comp.filter((obj, i) => {
      if (index === i) setAdd([...add, { text: obj.text, status: false }]);
      else return (obj);
    });
    setComp(temp);
  }

  return (
    <div>
      <header>
        <h1>ToDo App</h1>
      </header>
      <section>
        <div>
          <div className='input-section'>
            <div className='taskInput'>
              <i class="fas fa-pen"></i>
              <input value={idle} onChange={(e) => setIdle(e.target.value)} type="text" placeholder='What next?' />
              <i onClick={() => { setAdd([...add, { text: idle, status: false }]); setIdle('') }} class="fas fa-plus plusIcon"></i>
            </div>
          </div>
          <div className='flex-container'>
            <div className='task-del'>
              <h2>Deleted Tasks :</h2>
              {
                del.map((obj) => {
                  return (
                    <div className='box1'>
                      <p>{obj.text}</p>
                    </div>
                  )
                })
              }
            </div>
            <div className='task-toComp'>
              <h2>To be completed :</h2>
              {
                add.map((obj, index) => {
                  if (obj.status === false) {
                    return (
                      <div className='box2'>
                        <input className='toCompChk' onClick={() => { taskCompleted(index) }} type="checkbox" checked={obj.status} />
                        {obj.text}
                        <i onClick={() => { dlt(index) }} class="fas fa-trash-alt toCompDel"></i>
                      </div>
                    )
                  }
                })
              }
            </div>
            <div className='task-comp'>
              <h2>Completed Tasks :</h2>
              {
                comp.map((obj, index) => {
                  return (
                    <div className='box3'>
                      <input onClick={() => { notCompleted(index) }} type="checkbox" id='box3' checked={obj.status} />
                      <label htmlFor="box3">{obj.text}</label>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>
    </div >
  );
}

export default App;
