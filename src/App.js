
import { useEffect, useState } from 'react';
import './App.css';
import SuccessToaster from './component/toester';

import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useRef } from 'react';

function App() {
  const [task, setTask] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef < HTMLInputElement > (null);

  const [inputEditValue, setInputEditValue] = useState('');
  const [editButtonClick, setEditBUttonClick] = useState(false);
  
  var noTodos = '';
  if (task.length != 0) {
     noTodos = 'hidden';
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }

  const addTask = () => {
    setTask(prevValue => [...prevValue, inputValue]);
    setInputValue('')
  };

  const isPress = (e) => {
    if (inputValue == '' && e.key === 'Enter') {
       alert('Text field is empty')
    }
    if(inputValue != '' && e.key === 'Enter'){
        addTask();
    }
   
  }

  const deleteItem = (index) => {
    const temp = [...task];
    temp.splice(index, 1);
    setTask(temp);
    console.log(temp)
  }

  // -------------------------
  const handleChange = (event) => {
    setInputEditValue(event.target.value);
  };


  const addEditValue = (index) => {

    const val = task[index];
    setInputEditValue(val);

    setEditBUttonClick(index);
  };

  const updateValue = () => {
    const index = editButtonClick;
    const tempArray = [...task];
    tempArray.splice(index, 1, inputEditValue);
    setTask(tempArray);
  }


  return (
    <>

      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label value="Edit todos" />
              </div>
              <TextInput id="text" value={inputEditValue} onChange={handleChange} autoComplete='false' required />
            </div>

            <div className="w-full flex justify-end">     
                <Button onClick={() => { setOpenModal(false); updateValue() }}>Update</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>

      <div className='bg-gray-900 h-screen w-screen flex items-start pt-[4rem] justify-center '>
        <main className='h-fit w-[35rem] max-w-[90%]'>
          <section className='mb-5'>
            <input type="text" placeholder='Enter your todo...' value={inputValue} onChange={handleInputChange} onKeyDown={isPress}
              className='border h-[4rem] w-full rounded-lg outline-none bg-gray-700 border-none px-5 text-white text-lg font-semibold' />

          </section>

          <section>
            <div className={`${noTodos} h-[15rem] w-full border-4 border-gray-800 rounded-2xl flex items-center justify-center text-white text-[3rem] font-bold`}>
              <h1> No Todos </h1>
            </div>
            <ol>
              {
                ((() => {
                  return task.map((taskItem, index) => {
                    return <li className='bg-gray-700 h-[4rem] w-full rounded-md mt-1 flex items-center justify-between px-5 text-white text-xl'>

                      {taskItem}
                      <div className='flex gap-x-2'>
                        <Button onClick={() => { setOpenModal(true); addEditValue(index) }} color="dark"><FaEdit className='text-green-500' /></Button>
                        <Button onClick={() => deleteItem(index)} color="dark"> <FaRegTrashAlt className='text-red-500' /> </Button>
                      </div>

                    </li>

                  })
                })())
              }
            </ol>

          </section>

        </main>
      </div>

    </>

  );
}

export default App;
