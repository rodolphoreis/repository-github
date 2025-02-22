import { FaSpinner, FaGithub, FaPlus, FaBars, FaTrash } from "react-icons/fa";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { useCallback, useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar
  useEffect(() => {
    const repoString = localStorage.getItem("repos");

    if (repoString) {
      setRepositorios(JSON.parse(repoString));
    }
  }, []);

  // Salvar
  useEffect(() => {
    if (repositorios.length > 0) {
      localStorage.setItem("repos", JSON.stringify(repositorios));
    }
  }, [repositorios]);

  const errorHasRepo = () => toast.error("Repositório já existente!");
  const errorWriteRepo = () =>
    toast.info("Você precisa indicar um repositório!");

  const success = () => toast.success("Repositório cadastrado!");

  const notifyDelete = () => toast.warning("Repositório excluido!");

  function handleInputChange(event) {
    setNewRepo(event.target.value);
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const submit = async () => {
        setLoading(true);

        try {
          if (newRepo === "") {
            setLoading(false);
            return errorWriteRepo();
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorios.find((repo) => repo.name === newRepo);

          if (hasRepo) {
            setLoading(false);
            return errorHasRepo();
          }

          const data = {
            name: response.data.full_name,
          };

          setRepositorios([...repositorios, data]);
          setNewRepo("");
          success();
        } catch (error) {
          setNewRepo("");
        } finally {
          setLoading(false);
        }
      };

      submit();
    },
    [newRepo, repositorios]
  );

  const handleDelete = useCallback(
    (repo) => {
      const find = repositorios.filter((r) => r.name !== repo);
      setRepositorios(find);
      notifyDelete();
    },
    [repositorios]
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
        <SubmitButton
          style={{ background: "#0D2636" }}
          loading={loading ? 1 : 0}
        >
          {loading ? (
            <FaSpinner size={14} color="#FFF" />
          ) : (
            <FaPlus size={14} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo) => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(repo.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
      <ToastContainer />
    </Container>
  );
}
