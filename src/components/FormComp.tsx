import { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import type { IUser } from "../type";

const cityOptions = [
  { key: "1", value: "Ganja", label: "Ganja" },
  { key: "2", value: "Baku", label: "Baku" },
  { key: "3", value: "Shamkir", label: "Shamkir" },
];

interface IProps {
  onAddUser: (user: IUser) => void;
  userToEdit: IUser | null;
  onUpdateUser: (user: IUser) => void;
}

const FormComp = ({ onAddUser, userToEdit, onUpdateUser }: IProps) => {
  const [user, setUser] = useState<IUser>({
    name: "",
    sname: "",
    city: "",
    check: false,
    gender: "",
    id: "",
  });

  useEffect(() => {
    if (userToEdit) {
      setUser(userToEdit);
    }
  }, [userToEdit]);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement & HTMLSelectElement
  > = (event) => {
    const { name, value, checked } = event.target;
    if (name === "check") {
      setUser((prevuser) => ({
        ...prevuser,
        [name]: checked,
      }));
      return;
    }
    setUser((prevuser) => ({
      ...prevuser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (user.name && user.sname && user.city && user.gender) {
      if (user.id) {
        onUpdateUser(user); 
      } else {
        onAddUser(user);
      }
      setUser({
        name: "",
        sname: "",
        city: "",
        check: false,
        gender: "",
        id: "",
      });
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  };

  return (
    <Card style={{ background: "#f3f3f3", height: "600px" }}>
      <Form style={{ width: "400px", margin: "0 auto" }}>
        <Form.Label htmlFor="name">İsim</Form.Label>
        <Form.Control
          type="text"
          id="name"
          style={{ marginBottom: "20px" }}
          onChange={handleChange}
          name="name"
          value={user.name}
        />
        <Form.Label htmlFor="sname">Soyisim</Form.Label>
        <Form.Control
          type="text"
          id="sname"
          style={{ marginBottom: "20px" }}
          onChange={handleChange}
          name="sname"
          value={user.sname}
        />
        <Form.Label htmlFor="city">Şehir</Form.Label>
        <Form.Select
          name="city"
          aria-label="Default select example"
          id="city"
          onChange={handleChange}
          value={user.city}
        >
          {cityOptions.map((city) => (
            <option key={city.key} value={city.value}>
              {city.label}
            </option>
          ))}
        </Form.Select>
        <div
          style={{
            display: "flex",
            gap: "60px",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <Form.Label>Cinsiyet:</Form.Label>
          <Form.Check
            type="radio"
            id="male"
            label="Erkek"
            name="gender"
            value="male"
            onChange={handleChange}
            checked={user.gender === "male"}
          />
          <Form.Check
            type="radio"
            id="female"
            label="Kadın"
            name="gender"
            value="female"
            onChange={handleChange}
            checked={user.gender === "female"}
          />
        </div>
        <Form.Check
          type="checkbox"
          id="check"
          label="Onaylıyor musunuz?"
          name="check"
          onChange={handleChange}
          checked={user.check}
        />
        <Button
          children={userToEdit ? "Güncelle" : "Ekle"}
          size="lg"
          style={{ width: "400px", marginTop: "20px" }}
          onClick={handleSubmit}
        />
      </Form>
    </Card>
  );
};

export default FormComp;
