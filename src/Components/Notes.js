import React, {useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../Context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate }  from 'react-router-dom';



const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const {notes, getNotes, editNote} = context;
    
    useEffect(()=>{
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      console.log("no token found redirecting to login");
      navigate('/login')
    }
      // eslint-disable-next-line
    },[])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [note, setNotes] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateNote = (currentNote)=>{
      ref.current.click()
      setNotes({id: currentNote._id,etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    }

    const handleClick =(e)=>{
      console.log("updating guys");
      editNote(note.id, note.etitle, note.edescription, note.etag)
      refClose.current.click()
      props.showAlert("updated successfully", "success")
     
  }

  const onChange = (e)=>{
      setNotes({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
    <AddNote showAlert={props.showAlert}/>
    <button ref={ref} type="button"  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Notes</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
        <div className="mb-3">
        <label htmlFor="title" className="form-label mb-2">Title</label>
          <input type="text" className="Form-control mx-3" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="Form-control" id="edescription" name= "edescription" value={note.edescription} onChange={onChange}/>
        </div>
        <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="Form-control" id="tag" name= "tag" value={note.etag} onChange={onChange}/>
        </div>
        
      </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">update Notes</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-4">
      <h3>Your Notes</h3>
      <div className="container mx-2">
      {notes.length===0 && 'No note to display'}
      </div>
      {notes.map((note)=>{
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
      })}
    </div>
    </>
    
  )
}

export default Notes
