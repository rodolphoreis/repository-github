import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import { useState } from "react";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");

  function handleInputChange(event) {
    setNewRepo(event.target.value);
  }

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={() => {}}>
        <input
          type="text"
          name="newRepo"
          value={newRepo}
          onChange={handleInputChange}
          placeholder="Adicionar Repositório"
        />
        <SubmitButton style={{ background: "#0D2636" }}>
          <FaPlus size={14} color="white" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
