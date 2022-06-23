import { useDispatch, useSelector } from "react-redux";
import { startUpdateNote, uploadFileActive } from "../../actions/notes";

// utils
import { dateFull } from "../../utils/moment/dateMoment";

export const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSave = () => dispatch(startUpdateNote(active));

  const handleFileChange = ({ target }) => {
    const file = target.files[0];

    file && dispatch(uploadFileActive(file));
  };

  return (
    <div className="notes__appbar">
      <span>{dateFull(active.date)}</span>
      <input
        name="file"
        type="file"
        hidden
        onChange={handleFileChange}
        id="fileSelector"
      />
      <div>
        <label className="buttons__btn" htmlFor="fileSelector">
          Picture
        </label>
        <button className="buttons__btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
