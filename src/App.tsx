import FormComp from "./components/FormComp";
import "./App.css";
import TableComp from "./components/TableComp";
import { useState } from "react";
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
    searchText: "",
    copyUsers: [
      {
        name: "Minaya",
        sname: "Aliyeva",
        gender: "female",
        check: true,
        city: "Baku",
        id: "1",
      },
    ],
  });

  const [editedUser, setEditedUser] = useState<IUser | null>(null);

  const onAddUser = (user: IUser) => {
    const exsistedUser = state.users.find((item) => item.id === user.id);
    const isEditedMode = !!exsistedUser;

    setState((prevState) => ({
      ...prevState,
      users: isEditedMode
        ? prevState.users.map((item) => {
            if (item.id === user.id) {
              return user;
            }
            return item;
          })
        : [...prevState.users, user],
      copyUsers: isEditedMode
        ? prevState.users.map((item) => {
            if (item.id === user.id) {
              return user;
            }
            return item;
          })
        : [...prevState.users, user],
    }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState((prevState) => ({ ...prevState, searchText: event.target.value }));
  };

  const onEditUser = (user: IUser) => {
    setEditedUser(user);
  };

  const onDeleteUser = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.filter((user: IUser) => user.id !== id),
      copyUsers: prevState.users.filter((user: IUser) => user.id !== id),
    }));
  };

  const filteredUsers = state.users.filter(
    (user) =>
      user.name.toLowerCase().includes(state.searchText) ||
      user.sname.toLowerCase().includes(state.searchText) ||
      user.city.toLowerCase().includes(state.searchText) ||
      user.gender.toLowerCase().includes(state.searchText)
  );

  return (
    <>
      <FormComp onAddUser={onAddUser} userToEdit={editedUser} />
      <Form.Control
        type="text"
        id="search"
        style={{ margin: "20px", width: "250px" }}
        placeholder="Arama Yap"
        onChange={handleChange}
        name="search"
      />
      <TableComp
        users={filteredUsers}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
      />
    </>
  );
};

export default App;
