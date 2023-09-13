import { useReducer } from "react";

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return {
        ...state,
        [action.field]: action.value,
      };
    case 'CLEAR_FORM':
      return action.initialState;
    default:
      return state;
  }
}


export const useForm = (initialState) => {
  const [formData, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (field, value) => {
    dispatch({ type: 'UPDATE_FIELD', field, value });
  };

  const resetForm = (newInitialState) => {
    dispatch({ type: 'CLEAR_FORM', initialState: newInitialState });
  };

  return { formData, handleChange, resetForm };
};