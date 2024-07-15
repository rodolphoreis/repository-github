import { FaGithub, FaPlus } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import { useCallback, useState } from "react";

import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleInputChange(event) {
    setNewRepo(event.target.value);
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const submit = async () => {
        setLoading(true);
        try {
          const response = await api.get(`repos/${newRepo}`);

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          console.error(error);
          alert("Repositório não encontrado.");
        } finally {
          setLoading(false);
        }
      };

      submit();
    },
    [newRepo, repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
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
