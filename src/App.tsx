import FormComp from "./components/FormComp";
import "./App.css";
import TableComp from "./components/TableComp";
import { useRef, useState } from "react";
import type { IUser } from "./type";
import { Form } from "react-bootstrap";

export interface IState {
  users: IUser[];
  searchText: string;
  copyUsers: IUser[];
}

const App = () => {
  const [state, setState] = useState<IState>({
    users: [
      {
        name: "Minaya",
        sname: "Aliyeva",
        gender: "female",
        check: true,
        city: "Baku",
        id: "1",
      },
    ],
    copyUsers: [],
    searchText: "",
  });

  const [editedUser, setEditedUser] = useState<IUser | null>(null);
  const onAddUser = (user: IUser) => {
    const exsistedUser = state.users.find((item) => item.id === user.id);
    setState((prevState) => ({
      ...prevState,

      users: exsistedUser
        ? prevState.users.map((item) => {
            if (item.id === exsistedUser.id) {
              return user;
            }
            return item;
          })
        : [...prevState.users, user],
      copyUsers: exsistedUser
        ? prevState.users.map((item) => {
            if (item.id === exsistedUser.id) {
              return user;
            }
            return item;
          })
        : [...prevState.users, user],
    }));
  };

  const onEditUser = (user: IUser) => {
    setEditedUser(user);
  };
  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const searchedUsers = state.users.filter(
      (user) =>
        user.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.sname.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
        user.gender.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log({ searchedUsers, value: event.target.value });

    setState((prevState) => ({
      ...prevState,
      users: event.target.value ? searchedUsers : state.copyUsers,
    }));
  };
  const onDeleteUser = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.filter((user) => user.id !== id),
    }));
  };

  return (
    <>
      <FormComp onAddUser={onAddUser} userToEdit={editedUser} />
      <Form.Control
        type="text"
        id="search"
        style={{ margin: "20px", width: "250px" }}
        placeholder="Arama Yap"
        onChange={handleSearchChange}
        name="search"
      />
      <TableComp
        users={state.users}
        searchText={state.searchText}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
      />
    </>
  );
};

export default App;
