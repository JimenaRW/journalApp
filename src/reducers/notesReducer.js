import { TYPES } from "../types";

const initialState = {
  notes: [],
  active: null,
};

export const notesReducer = (state = initialState, action) => {
  switch (action?.type) {
    case TYPES.noteAddNew:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case TYPES.noteActive:
      return {
        ...state,
        active: {
          ...action.payload,
        },
      };
    case TYPES.notesLoad:
      return {
        ...state,
        notes: [...action.payload],
      };
    case TYPES.noteUpdated:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };
    case TYPES.noteDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};
