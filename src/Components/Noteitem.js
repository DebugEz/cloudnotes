import React, {useContext} from 'react'
import noteContext from '../Context/notes/noteContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Noteitem = (props) => {
   const context = useContext(noteContext);
   const {deleteNote} = context;
   const {note, updateNote} = props;
  return (
    <div className='col-md-3' >
    <div className="card my-3">
      <div className="card-body">
         <div className="d-flex justify-content-between">
         <h5 className="card-title">{note.title}</h5>
              <DeleteIcon onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully", "danger")}}/>
          <EditIcon onClick={()=>{updateNote(note);}}/>
          </div>
          <p className="card-text">{note.description}</p>
         </div>
    </div>
    </div>
  )
}

export default Noteitem
