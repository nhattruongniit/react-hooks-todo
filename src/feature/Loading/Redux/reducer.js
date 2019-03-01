const initialState = {
  loading: false,
};

export const loadingReducer = (state = initialState, { type }) => {
  switch(type) {
    case 'SHOW_LOADING': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'HIDDEN_LOADING': {
      return {
        ...state,
        loading: false,
      }
    }
    default:{
      return state;
    }
  }
};
