import FormComp from "./components/FormComp";
import "./App.css";
import TableComp from "./components/TableComp";
import { useState } from "react";
import type { IUser } from "./type";
import { Form } from "react-bootstrap";
export interface IState {
  user: IUser;
  searchText: string;
}
const App = () => {
  const [state, setState] = useState<IState>({
    user: {
      name: "",
      sname: "",
      gender: "",
      check: false,
      city: "",
      id:""
    },
    searchText: "",
  });

  const onAddUser = (user: IUser) => {
    setState((prevState) => ({
      ...prevState,
      user,
    }));
  };
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setState((prevState) => ({ ...prevState, searchText: event.target.value }));
  };

  
  return (
    <>
      <FormComp onAddUser={onAddUser} />
      <Form.Control
        type="text"
        id="search"
        style={{ margin: "20px", width: "250px" }}
        placeholder="Search By Name"
        onChange={handleChange}
        name="search"
      />
      <TableComp  user={state.user} searchText={state.searchText}  />
    </>
  );
};

export default App;
