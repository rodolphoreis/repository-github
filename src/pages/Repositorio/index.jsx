/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import {
  Container,
  Owner,
  Loading,
  BackButton,
  BackButtonLoading,
  IssuesList,
  PageActions,
  FilterList,
} from "./styles";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {
  const { repositorio } = useParams();

  const [repo, setRepo] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    {
      label: "Todas",
      state: "all",
      active: true,
    },
    {
      label: "Abertas",
      state: "open",
      active: false,
    },
    {
      label: "Fechadas",
      state: "closed",
      active: false,
    },
  ]);
  const [filterIndex, setFilterIndex] = useState(0);

  useEffect(() => {
    async function load() {
      const [repositoriosData, issuesData] = await Promise.all([
        api.get(`repos/${repositorio}`),
        api.get(`repos/${repositorio}/issues`, {
          params: {
            state: filters.find((filter) => filter.active).state,
            per_page: 5,
          },
        }),
      ]);
      setRepo(repositoriosData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [repositorio, filters]);

  useEffect(() => {
    async function loadIssue() {
      const response = await api.get(`repos/${repositorio}/issues`, {
        params: {
          state: filters[filterIndex].state,
          per_page: 5,
          page,
        },
      });
      setIssues(response.data);
    }
    loadIssue();
  }, [page, repositorio, filterIndex, filters]);

  function handlePage(action) {
    if (action === "back") {
      setPage(page - 1);
    } else if (action === "next") {
      setPage(page + 1);
    }
  }

  function handleFilter(index) {
    setFilterIndex(index);
  }

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
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          Acessar Repositório
        </a>
      </Owner>

      <FilterList active={filterIndex}>
        {filters.map((filter, index) => (
          <button
            key={filter.label}
            type="button"
            onClick={() => handleFilter(index)}
          >
            {filter.label}
          </button>
        ))}
      </FilterList>

      <IssuesList>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url} alt={issue.title}>
                  {issue.title}{" "}
                </a>

                {issue.labels.map((label) => (
                  <span
                    key={String(label.id)}
                    style={{ backgroundColor: label.color }}
                  >
                    {label.name}
                  </span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <PageActions>
        <button
          type="button"
          onClick={() => handlePage("back")}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button type="button" onClick={() => handlePage("next")}>
          Proxima
        </button>
      </PageActions>
    </Container>
  );
}
