import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/config";
import { TYPES } from "../types";

export const startNewNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: "",
      body: "",
      url: "",
      date: new Date().getTime(),
    };

    const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote);

    dispatch(activeNote(doc.id, newNote));
    dispatch(addNewNote({...newNote, id: doc.id}));
  };
};

export const activeNote = (id, note) => ({
  type: TYPES.noteActive,
  payload: { id, ...note },
});

export const addNewNote = (note) => ({
  type: TYPES.noteAddNew,
  payload: note
});

export const loadNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const notes = [];

    let query = await getDocs(collection(db, `${uid}/journal/notes`));
    query.forEach((doc) => {
      //console.log(doc.data());
      notes.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: TYPES.notesLoad,
  payload: notes,
});

export const startUpdateNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const noteFirebase = { ...note };
    delete noteFirebase.id;

    try {
      await updateDoc(doc(db, `${uid}/journal/notes`, note.id), noteFirebase);

      dispatch(updateNote(note.id, note));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateNote = (id, note) => ({
  type: TYPES.noteUpdated,
  payload: { id, note },
});

export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    try {
      await deleteDoc(doc(db, `${uid}/journal/notes`, id));

      dispatch(deleteNote(id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteNote = (id) => ({
  type: TYPES.noteDelete,
  payload: id,
});

export const uploadFileActive = (file) => {
  return async (dispatch, getState) => {
    let { active } = getState().notes;

    const cloudURL = process.env.REACT_APP_CLOUD_URL;

    const formData = new FormData();

    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET_NAME);
    formData.append("file", file);
    
    Swal.fire({
      title:"Cargando imagen",
      text: "por favor, espere",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    try {
      const response = await fetch(cloudURL, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      dispatch(activeNote(active.id, {...active, url: result.secure_url}));
      
      Swal.close();
    } catch (error) {
      console.error(error);
    }
  };
};
