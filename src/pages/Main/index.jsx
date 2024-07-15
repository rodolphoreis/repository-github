import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar Repositório" />
        <SubmitButton type="submit" style={{ background: "#0D2636" }}>
          <FaPlus size={14} color="white" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
