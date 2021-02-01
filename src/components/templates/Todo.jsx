import React, {useState, useEffect, useCallback} from 'react';
import axios from "axios";
import {Filter} from "../organisms";
import {DeleteAllButton} from "../atoms";
import {InputForm, TaskList} from "../molecules /";
import useJsonBox　from 'react-jsonbox'



const url = "https://legitbackend.wtf/box_268800f8baf7ef7b0845";


const Todo = (props) => {

    // Addモーダル
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [doId, setDoId] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [editing, setEditing] = useState();
    const [filter, setFilter] = useState('ALL');

    const handleFilterChange = value => setFilter(value);

    const displayItems = tasks.filter(task => {
        if (filter === 'ALL') return true;
        if (filter === 'TODO') return !task.doing;
        if (filter === 'DONE') return task.doing;
    });

    console.log(displayItems);

    const { read, create, remove, update } = useJsonBox();

    const inputTask = useCallback((event) => {
        setTaskTitle(event.target.value);
    },[setTaskTitle]);

    const inputNewTask = useCallback((event) => {
        setNewTitle(event.target.value);
    },[setNewTitle]);

    // 取得
    const getData = async () => {
        const { data } = await read();
        setTasks(data);
    };
    useEffect(() => {getData()}, [tasks])

    // 追加
    const addTask = async e => {
        e.preventDefault();
        await create({taskTitle , doing:false})
        setTaskTitle("");
        handleClose();
    };

    // 削除
    const removeTask = async id => {
        await remove(id)
    };

    // 一括削除
    const deleteAllTask = () => {
        if (window.confirm("全て削除しますか？")) {
            tasks.forEach(element => {
                const id = element._id;
                console.log(id);
                axios
                .delete(`${url}/${id}`)
            });
        }  
    }

    // タイトル編集
    const editTask = async (e, id) => {
        e.preventDefault()
        axios.get(`${url}/${id}`)
        .then(res =>{
            const idDoing = res.data.doing;
        })
        await update(
          {
            taskTitle: newTitle,
            doing: false
          },
          id
        )
        setNewTitle("")
        setEditing(false)
    }

    return(
        <div> 
            <h2 className="title"> To Do List</h2>
            <Filter value={filter} onChange={handleFilterChange}/>
       
            <TaskList tasks={tasks} setTasks={setTasks} removeTask={removeTask} displayItems={displayItems} setDoId={setDoId}
             editing={editing} setEditing={setEditing} editTask={editTask} inputNewTask={inputNewTask} newTitle={newTitle} setNewTitle={setNewTitle}/>
        
            <div className="display-flex">
            <InputForm open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} inputTask={inputTask} addTask={addTask} taskTitle={taskTitle}/>
            <span className="margin"></span>
            <DeleteAllButton deleteAllTask={deleteAllTask} />
            </div>

        </div>
    )
}

export default Todo;


