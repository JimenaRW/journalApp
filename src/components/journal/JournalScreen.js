import { useSelector } from "react-redux";
import { NoteScreen } from "../notes/NoteScreen";
import { Sidebar } from "./Sidebar";
import { NothingSelected } from "./NothingSelected";

export const JournalScreen = () => {
  const { active } = useSelector((state) => state.notes);
  return (
    <div className="journal__main-content">
      <Sidebar />
      <main>{active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
