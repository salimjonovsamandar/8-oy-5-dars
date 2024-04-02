export interface UserTokenState {
  token: string | null;
  role: string | null;
}

const initialState: UserTokenState = {
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
};

interface SetTokenAction {
  type: "SET_TOKEN";
  payload: string | null;
}

interface SetRoleAction {
  type: "SET_ROLE";
  payload: string | null;
}
type UserTokenAction = SetTokenAction | SetRoleAction;

const userTokenReducer = (state = initialState, action: UserTokenAction) => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    default:
      return state;
  }
};

export const setToken = (token: string | null) => ({
  type: "SET_TOKEN",
  payload: token,
});
export const setRole = (role: string | null) => ({
  type: "SET_ROLE",
  payload: role,
});

export default userTokenReducer;
