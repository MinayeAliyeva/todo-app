import FormComp from "./components/FormComp";
import "./App.css";
import TableComp from "./components/TableComp";
import { useState } from "react";
import type { IUser } from "./type";
import { Form } from "react-bootstrap";

export interface IState {
  users: IUser[];
  searchText: string;
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
  });

  const [editedUser, setEditedUser] = useState<IUser | null>(null);

  const onAddUser = (user: IUser) => {
    setState((prevState) => ({
      ...prevState,
      users: [...prevState.users, user], 
    }));
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState((prevState) => ({ ...prevState, searchText: event.target.value }));
  };

  const onEditUser = (user: IUser) => {
    setEditedUser(user); 
  };

  const onUpdateUser = (updatedUser: IUser) => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.map(
        (user) => (user.id === updatedUser.id ? updatedUser : user) 
      ),
    }));
    setEditedUser(null); 
  };

  return (
    <>
      <FormComp
        onAddUser={onAddUser}
        userToEdit={editedUser}
        onUpdateUser={onUpdateUser}
      />
      <Form.Control
        type="text"
        id="search"
        style={{ margin: "20px", width: "250px" }}
        placeholder="Arama Yap"
        onChange={handleChange}
        name="search"
      />
      <TableComp
        users={state.users}
        searchText={state.searchText}
        onEditUser={onEditUser}
      />
    </>
  );
};

export default App;
