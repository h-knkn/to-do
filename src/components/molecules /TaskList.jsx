import React  from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from "axios";

const url = "https://legitbackend.wtf/box_268800f8baf7ef7b0845";


const TaskList = (props) => {
// console.log("props.item",props.displayItems);
// console.log("props.task",props.tasks);

    // チェックボックス
    const handleCheckboxChanges = task => {
        props.setTasks(props.displayItems.filter(data => {
            if (data === task) data.doing = !data.doing
            // console.log(task.doing);
            props.setDoId(task.doing);
            const editDoing = async (e, id) => {
                const newEditInfo = {
                    taskTitle:task.taskTitle,
                    doing: task.doing,
                }
                await axios.put(`${url}/${task._id}`, newEditInfo)
                props.setEditing(false) 
            }
            editDoing();
            return data   
        }))
    }

    return(
        <>
            <List style={{marginTop: '48px'}} component='ul'>
                {props.displayItems.map((task ,index)=> (
                    <ListItem key={index} component='li'>
                        <Checkbox
                            checked={task.doing}
                            value='primary'
                            onChange={() => handleCheckboxChanges(task)}     
                        />
                        <ListItemText >{task.taskTitle}</ListItemText>
                        {props.editing !== task._id ? (
                            ''
                        ) : (
                            <form onSubmit={async e => props.editTask(e, task._id)}>
                            <TextField
                                value={props.newTitle || ""}
                                onChange={props.inputNewTask}
                                placeholder={task.taskTitle}
                            />
                            </form>
                        )}
                        <EditIcon className="icon" onClick={() => props.setEditing(task._id)}></EditIcon>
                        <span className="margin"></span>
                        <DeleteOutlineIcon className="icon" onClick={() => props.removeTask(task._id)}></DeleteOutlineIcon>  
                    </ListItem>
                ))}
            </List>

            
        </>
    )
}

export default TaskList;
