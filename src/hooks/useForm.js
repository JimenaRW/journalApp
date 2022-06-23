import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [state, setState] = useState(initialState);

  const reset = (newState = initialState) => {
    setState(newState);
  };

  const handleInputChange = ({ target }) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  return [state, handleInputChange, reset];
};
