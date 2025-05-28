import FormComp, { type IState } from "./components/FormComp";
import "./App.css";
import TableComp from "./components/TableComp";
import { useState } from "react";
const App = () => {
  const [user, setUser] = useState<IState>({
    name: "",
    sname: "",
    gender: "",
    check: false,
    city: "",
  });
  const onAddUser = (user: IState) => {
    setUser(user);
  };
  return (
    <>
      <FormComp onAddUser={onAddUser} />
      <TableComp user={user} />
    </>
  );
};

export default App;
