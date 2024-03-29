/* eslint-disable require-jsdoc */
// UserListComponent.tsx
import React, { useEffect } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks';
import {
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
  upsertMany,
  selectAllUsers,
  selectUserById,
  selectUserEntities,
  selectUserIds,
  selectUserTotal
} from '../../redux/user/UserSlice';
import styleSheet from './HomeStyles';
// import { selectAllUsers, setMany, RootState } from './userSlice';

const UserListComponent: React.FC = () => {
  const { styles } = useTheme(styleSheet);
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    // Dispatch actions to update user data in the store
    dispatch(
      addMany([
        { id: 1, name: 'John', age: 25 },
        { id: 2, name: 'Alice', age: 30 },
        { id: 3, name: 'Bob', age: 28 }
      ])
    );

    dispatch(addUser({ id: 4, name: 'Jacob', age: 35 }));

    // dispatch(removeUser(2));

    dispatch(
      updateUser({
        id: 3,
        changes: { name: 'Updated Bob', age: 29 }
      })
    );

    // dispatch(removerUserByIds([1, 4]));

    dispatch(
      updateUserByIds([
        { id: 2, changes: { name: 'Updated Alice', age: 31 } },
        { id: 3, changes: { name: 'Updated Bob Again', age: 30 } }
      ])
    );

    dispatch(setOne({ id: 5, name: 'Eva', age: 24 }));

    dispatch(
      setMany([
        { id: 6, name: 'Frank', age: 27 },
        { id: 7, name: 'Grace', age: 32 }
      ])
    );

    // dispatch(
    //   setAll([
    //     { id: 8, name: 'Henry', age: 28 },
    //     { id: 9, name: 'Isabel', age: 35 }
    //   ])
    // );

    // dispatch(removeAll());

    // dispatch(upsertUser({ id: 10, name: 'Jack', age: 30 }));

    // dispatch(
    //   upsertMany([
    //     { id: 11, name: 'Kate', age: 25 },
    //     { id: 12, name: 'Leo', age: 28 }
    //   ])
    // );
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User List</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {users?.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <View style={styles.itemView}>
              <Text style={styles.label}>ID:</Text>
              <Text style={styles.text}>{user.id}</Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.text}>{user.name}</Text>
            </View>
            <View style={styles.itemView}>
              <Text style={styles.label}>Age:</Text>
              <Text style={styles.text}>{user.age}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* <Button title="Add User" onPress={handleAddUser} />
      <Button title="Add Many" onPress={handleAddMany} />
      <Button title="Remove User" onPress={handleRemoveUser} />
      <Button title="Update User" onPress={handleUpdateUser} />
      <Button title="Remove Users by IDs" onPress={handleRemoveUserByIds} />
      <Button title="Update Users by IDs" onPress={handleUpdateUserByIds} />
      <Button title="Set One" onPress={handleSetOne} />
      <Button title="Set Many" onPress={handleSetMany} />
      <Button title="Set All" onPress={handleSetAll} />
      <Button title="Remove All" onPress={handleRemoveAll} />
      <Button title="Upsert User" onPress={handleUpsertUser} />
      <Button title="Upsert Many" onPress={handleUpsertMany} /> */}
    </View>
  );
};

export default UserListComponent;
