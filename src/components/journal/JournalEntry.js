import { useDispatch } from "react-redux";
import { activeNote } from "../../actions/notes";

// utils
import { dateNumber, dateString } from "../../utils/moment/dateMoment";

export const JournalEntry = ({ id, title, body, date, url }) => {
  const dispatch = useDispatch();

  const handleNoteActive = () => {
    dispatch(activeNote(id, { title, body, date, url }));
  };

  
  return (
    <div className="journal__entry pointer" onClick={handleNoteActive}>
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage: `${url ? (`url(${url})`) : ("url(https://placeimg.com/400/400/tech)")}`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title.length > 13 ? title.slice(0,12) + "..." : title}</p>
        <p className="journal__entry-content">{body.length > 25 ? body.slice(0,25) + "..." : body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>
          {dateString(date, "dayString")}
        </span>
        <h4>{dateNumber(date, "dayNumber")}</h4>
      </div>
    </div>
  );
};
