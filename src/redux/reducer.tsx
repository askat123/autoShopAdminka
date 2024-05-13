interface User {
  productName: string;
  image: string;
  price: number;
  type: string;
  id: number;
}

interface State {
  users: User[];
}

const initialState: State = {
  users: [],
};

export const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        users: action.payload,
      };
    case "ADD_USER":
      return {
        users: [...state.users, action.payload],
      };
    case "DELETE_USER":
      return {
        users: state.users.filter((user) => user.id !== action.payload.id),
      };
    case "CHANGE_USER":
      return {
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    default:
      return state;
  }
};
