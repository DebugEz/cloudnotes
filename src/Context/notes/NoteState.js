import React, { useState } from "react";
import NoteContext from "./noteContext"
// import { useState } from "react";

const NoteState = (props)=>{
  const host = "http://localhost:5000"
  const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
     

        //get all note
        const getNotes = async()=>{
          console.log("getNotes run")
          //to do api calll
          //API Call
          const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET", 
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
          });
          const json = await response.json()
          console.log(json);
          setNotes(json)
        }
    //Add a note
    const addNote = async(title, description, tag)=>{
      //to do api calll
      //API Call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const note = await response.json()
      setNotes(notes.concat(note))
    }

    //delete a node
    const deleteNote = async(id)=>{
      
        //API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json = await response.json()
        console.log(json);

      console.log("deleting the code with id" + id);
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }


    // edit a node
    const editNote = async (id, title, description, tag) => {
      //API Call
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'), // Replace with your auth token
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      console.log(json);
    
      // Create a copy of the notes array
      const newNotes = [...notes];
    
      // Find the index of the note with the given id
      const noteIndex = newNotes.findIndex((note) => note._id === id);
    
      if (noteIndex !== -1) {
        // Update the properties of the note at the found index
        newNotes[noteIndex].title = title;
        newNotes[noteIndex].description = description;
        newNotes[noteIndex].tag = tag;
    
        // Update the state with the updated notes
        setNotes(newNotes);
      } else {
        console.error("Note not found.");
      }
    };  
     return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
           {props.children}
        </NoteContext.Provider>

     )

}

export default NoteState;
