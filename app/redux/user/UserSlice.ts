// userSlice.ts
import {
  createSlice,
  createEntityAdapter,
  type EntityState,
  type PayloadAction
} from '@reduxjs/toolkit';

// Define the user entity type
interface User {
  id: number;
  name: string;
  age: number;
}

type RootStateType = ReturnType<typeof userSlice.reducer>;
// Define the entity adapter
// const usersAdapter = createEntityAdapter<User>({ selectId: (user) => user.id });
const usersAdapter = createEntityAdapter<User>({
  selectId: (user) => user?.id
});

// Define the user state using the adapter's EntityState
// interface UserState extends EntityState<User> {
// }

const initialState = usersAdapter.getInitialState({
  // Additional properties can be initialized here
  loading: false,
  error: null
});

//the modified initialState
//initailState {"entities": {}, "error": null, "ids":[], loading:false}

const userSlice = createSlice({
  name: 'users',
  initialState,
  // initialState: usersAdapter.getInitialState(),
  reducers: {
    addUser: usersAdapter.addOne,
    addMany: usersAdapter.addMany,
    removeUser: usersAdapter.removeOne,
    updateUser: usersAdapter.updateOne,
    removerUserByIds: usersAdapter.removeMany,
    updateUserByIds: usersAdapter.updateMany,

    //additional generated methods
    setOne: usersAdapter.setOne,
    setMany: usersAdapter.setMany,
    setAll: usersAdapter.setAll,
    removeAll: usersAdapter.removeAll,
    upsertUser: usersAdapter.upsertOne,
    upsertMany: usersAdapter.upsertMany
  }
});

// Selectors for accessing user entities and initial state
export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectUserTotal
} = usersAdapter.getSelectors((state: RootStateType) => state.users);

// Export actions and reducer
export const {
  addUser,
  addMany,
  removeUser,
  updateUser,
  removerUserByIds,
  updateUserByIds,
  setOne,
  setMany,
  setAll,
  removeAll,
  upsertUser,
  upsertMany
} = userSlice.actions;
export const UserReducer = userSlice.reducer;
