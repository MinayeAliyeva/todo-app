import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import type { IUser } from "../type";
const cityOptions = [
  {
    key: "1",
    value: "Ganja",
    label: "Ganja",
  },
  {
    key: "2",
    value: "Baku",
    label: "Baku",
  },
  {
    key: "3",
    value: "Shamkir",
    label: "Shamkir",
  },
];

interface IProps {
  onAddUser: (user: IUser) => void;
}
const FormComp = ({ onAddUser }: IProps) => {
  const [state, setState] = useState<IUser>({
    name: "",
    sname: "",
    city: "",
    check: false,
    gender: "",
    id:""
  });

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement & HTMLSelectElement
  > = (event) => {
    const { name, value, checked } = event.target;
    if (name === "check") {
      setState((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
      return;
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Card
      style={{
        background: "#f3f3f3",
        height: "600px",
      }}
    >
      <Form style={{ width: "400px", margin: "0 auto" }}>
        <Form.Label htmlFor="name">Name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          style={{ marginBottom: "20px" }}
          onChange={handleChange}
          name="name"
          defaultValue={"m"}
        />
        <Form.Label htmlFor="sname">Sname</Form.Label>
        <Form.Control
          type="text"
          id="sname"
          style={{ marginBottom: "20px" }}
          onChange={handleChange}
          name="sname"
        />
        <Form.Label htmlFor="city">City</Form.Label>
        <Form.Select
          name="city"
          aria-label="Default select example"
          id="city"
          onChange={handleChange}
        >
          {cityOptions.map((city) => {
            return (
              <option key={city.key} value={city.value}>
                {city.label}
              </option>
            );
          })}
        </Form.Select>
        <div
          style={{
            display: "flex",
            gap: "60px",
            marginTop: "20px",
            justifyContent: "space-between",
          }}
        >
          <Form.Label>Gender:</Form.Label>
          <Form.Check
            type="radio"
            id="male"
            label="male"
            name="gender"
            value="male"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            id="female"
            label="female"
            name="gender"
            value="female"
            onChange={handleChange}
          />
        </div>
        <Form.Check
          type="checkbox"
          id="check"
          label="Okay?"
          name="check"
          onChange={handleChange}
        />
        <Button
          children="Add "
          size="lg"
          style={{ width: "400px", marginTop: "20px" }}
          onClick={() => {
            onAddUser(state);
          }}
        />
      </Form>
    </Card>
  );
};

export default FormComp;
