import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const InputForm = (props) => {

    

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={props.handleClickOpen}>
        Add Task
      </Button>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
       
          <TextField
            autoFocus
            margin="dense"
            placeholder="タスクを追加"
            type="text"
            fullWidth
            value={props.taskTitle}
            onChange={props.inputTask}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.addTask} color="secondary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default InputForm;