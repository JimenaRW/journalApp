import { useDispatch, useSelector } from "react-redux";

import { startLogout } from "../../actions/auth";
import { startNewNotes } from "../../actions/notes";

import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(startLogout());

  const handleNewNote = () => dispatch(startNewNotes());

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span>{name}</span>
        </h3>
        <button className="buttons__btn" onClick={() => handleLogout()}>
          Salir
        </button>
      </div>
      <div className="journal__new-entry pointer" onClick={handleNewNote}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">Nueva entrada</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
