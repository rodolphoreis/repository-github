import { useParams } from "react-router-dom";
import { Container } from "./styles";
import { useEffect } from "react";
import api from "../../services/api";

export default function Repositorio() {
  const { repositorio } = useParams();

  useEffect(() => {
    async function load() {
      const [repositoriosData, issuesData] = await Promise.all([
        api.get(`repos/${repositorio}`),
        api.get(`repos/${repositorio}/issues`, {
          params: {
            state: "open",
            per_page: 5,
          },
        }),
      ]);
    }
    load();
  }, [repositorio]);

  return (
    <Container>
      <h1 style={{ color: "white" }}>{repositorio}</h1>
    </Container>
  );
}
