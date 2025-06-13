import Table from "react-bootstrap/Table";
import { memo } from "react";
import type { IUser } from "../type";
import { Button } from "react-bootstrap";
interface ITableProps {
  users: IUser[];
  searchText: string;
  onEditUser: (user: IUser) => void;
  onDeleteUser: (id: string) => void;
}

const TableComp = ({
  users,
  searchText,
  onEditUser,
  onDeleteUser,
}: ITableProps) => {
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.sname.toLowerCase().includes(searchText.toLowerCase()) ||
      user.city.toLowerCase().includes(searchText.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchText.toLowerCase())
  );

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
        {users?.map((user, index) => {
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
                  onClick={() => onEditUser(user)}
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
