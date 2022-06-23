import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NotesAppBar } from "./NotesAppBar";
import { useForm } from "../../hooks/useForm";
import { activeNote, startDeleteNote } from "../../actions/notes";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const activeId = useRef(note.id); // para comparar s la nota activa es igual a la que esta mostrando el componente

  const [formValues, handleInputChange, reset] = useForm(note);

  const { title, body } = formValues;

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset, note.url]);

  useEffect(() => {
    dispatch(activeNote(note.id, { ...formValues, url: note.url }));
  }, [formValues]);

  const handleDelete = () => {
    dispatch(startDeleteNote(note.id));
  };

  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          name="title"
          type="text"
          placeholder="Escribe el título"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          onChange={handleInputChange}
        />
        <textarea
          name="body"
          placeholder="Contenido de la nota"
          className="notes__textarea"
          value={body}
          onChange={handleInputChange}
        ></textarea>
        <div className="notes__image">
          {note.url ? (
            <img src={note.url} alt={note.id} />
          ) : (
            <img src={"https://placeimg.com/400/400/tech"} alt={"imagen"} />
          )}
        </div>
      </div>
      <button
        className="buttons__btn buttons__btn-danger mt-5 pointer"
        onClick={handleDelete}
      >
        Eliminar nota
      </button>
    </div>
  );
};
