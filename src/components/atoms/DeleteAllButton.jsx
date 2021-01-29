import React from 'react';
import Button from '@material-ui/core/Button';

const DeleteAllButton = (props) => {
    return(
        <Button onClick={props.deleteAllTask} variant="outlined">Delete All</Button>
    )

}

export default DeleteAllButton;