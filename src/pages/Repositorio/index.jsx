import { Link, useParams } from "react-router-dom";
import {
  Container,
  Owner,
  Loading,
  BackButton,
  BackButtonLoading,
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
      <BackButtonLoading>
        <BackButton to="/">
          <FaArrowLeft size={20} color="white" />
        </BackButton>
        <Loading>
          <h1>Carregando...</h1>
        </Loading>
      </BackButtonLoading>
    );
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft size={20} />
      </BackButton>
      <Owner>
        <img src={repo.owner.avatar_url} alt={repo.owner.login} />
        <h1>{repo.name}</h1>
        <p>{repo.description}</p>
        <Link to={repo.html_url} target="_blank" rel="noopener noreferrer">
          Acessar Repositório
        </Link>
      </Owner>
    </Container>
  );
}
