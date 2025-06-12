import Table from "react-bootstrap/Table";
import { memo, useEffect, useState } from "react";
import type { IUser } from "../type";
import { v4 as uuid } from "uuid";
import { Button } from "react-bootstrap";
interface ITableProps {
  user: IUser;
  searchText: string;
}
interface ITableState {
  users: IUser[];
  editedUser?: IUser | null;
}
const TableComp = ({ user, searchText }: ITableProps) => {
  const [state, setState] = useState<ITableState>({
    users: [
      {
        name: "Minaya",
        sname: "Aliyeva",
        city: "Baku",
        gender: "female",
        check: true,
        id: "1",
      },
    ],
    editedUser: null,
  });
  useEffect(() => {
    if (user.name && user.sname) {
      setState((prevState) => ({
        ...prevState,
        users: [...prevState.users, { ...user, id: uuid() }],
      }));
    }
  }, [user]);
  const filteredUsers = state.users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.sname.toLowerCase().includes(searchText.toLowerCase()) ||
      user.city.toLowerCase().includes(searchText.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchText.toLowerCase())
  );

  const onDeleteUser = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.filter((user) => user.id !== id),
    }));
  };
  const onEditUser = (id: string) => {
    const userToEdit = state.users.find((user) => user.id === id);
    setState((prevState) => ({ ...prevState, editedUser: userToEdit }));
  };

  return (
    <Table striped bordered hover style={{ marginTop: "50px" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Gender</th>
          <th>City</th>
          <th>Are you agree ?</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers?.map((user, index) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{user.name}</td>
              <td>{user.sname}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>{user.check ? "Yes" : "No"}</td>
              <td>
                <Button
                  children="Delete "
                  size="lg"
                  variant="danger"
                  onClick={() => onDeleteUser(user.id)}
                />

                <Button
                  children="Edit "
                  size="lg"
                  variant="primary"
                  onClick={() => onEditUser(user.id)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default memo(TableComp);
