import { useParams } from "react-router-dom";
import { Container } from "./styles";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Repositorio() {
  const { repositorio } = useParams();

  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setRepo(repositoriosData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [repositorio]);
  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    );
  }

  return (
    <Container>
      <h1 style={{ color: "white" }}>{repositorio}</h1>
    </Container>
  );
}
