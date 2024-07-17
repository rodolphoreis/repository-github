import { useParams } from "react-router-dom";

export default function Repositorio() {
  const { repositorio } = useParams();
  return (
    <>
      <div>
        <h1 style={{ color: "white" }}>Repositorio {repositorio}</h1>
      </div>
    </>
  );
}
