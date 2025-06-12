import Table from "react-bootstrap/Table";
import { memo } from "react";
import { Button } from "react-bootstrap";
import type { IUser } from "../type";

interface ITableProps {
  users: IUser[];
  searchText: string;
  onEditUser: (user: IUser) => void; 
}

const TableComp = ({ users, searchText, onEditUser }: ITableProps) => {
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.sname.toLowerCase().includes(searchText.toLowerCase()) ||
      user.city.toLowerCase().includes(searchText.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchText.toLowerCase())
  );

  const onDeleteUser = (id: string) => {
    setState((prevState) => ({
      ...prevState,
      users: prevState.users.filter((user:IUser) => user.id !== id),
    }));
  };

  return (
    <Table striped bordered hover style={{ marginTop: "50px" }}>
      <thead>
        <tr>
          <th>#</th>
          <th>İsim</th>
          <th>Soyisim</th>
          <th>Cinsiyet</th>
          <th>Şehir</th>
          <th>Onayladınız mı?</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers?.map((user, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.sname}</td>
              <td>{user.gender}</td>
              <td>{user.city}</td>
              <td>{user.check ? "Evet" : "Hayır"}</td>
              <td>
                <Button
                  children="Sil"
                  size="lg"
                  variant="danger"
                  onClick={() => onDeleteUser(user.id)}
                />
                <Button
                  children="Düzenle"
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
