import React,{useContext} from 'react'
import noteContext from '../Context/notes/noteContext';
import { useState } from 'react';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNotes] = useState({title: "", description: "", tag: ""})

    const handleClick =(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNotes({title: "", description: "", tag: ""})
        props.showAlert("Note added  successfully", "success")
    }

    const onChange = (e)=>{
        setNotes({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
    <div className="container">
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
        <label htmlFor="title" className="form-label mb-3 mx-3">Title</label>
          <input type="text" className="Form-control mx-3" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="tag" className="form-label mx-3">Tag</label>
          <input type="textarea" className="Form-control myx-3" id="tag" name= "tag" value={note.tag} onChange={onChange} required/>
        </div>
        <div className="mb-3">
        <label htmlFor="description" className="form-label my-3">Description</label>
          <textarea className="Form-control mx-3 " id="description" name= "description" value={note.description} onChange={onChange} required/>
        </div>
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
      </div>
    </div>
  )
}

export default AddNote
