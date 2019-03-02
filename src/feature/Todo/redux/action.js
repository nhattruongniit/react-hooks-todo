export const TODO_REQUEST = 'TODO_REQUEST';
export const TODO_SUCCESS = 'TODO_SUCCESS';
export const TODO_FAILURE = 'TODO_FAILURE';

export const todoSuccess = payload => ({ type: TODO_SUCCESS, payload });

export const fetchTodo = callback => async (dispatch) => {
  dispatch({ type: TODO_REQUEST });
  try {
    const { data } = await callback();
    return data;
  } catch (error) {
    dispatch({ type: TODO_FAILURE });
  }
}