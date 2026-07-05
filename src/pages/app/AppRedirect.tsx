import { Navigate } from "react-router-dom";

// Demo: sempre manda pro painel do aluno
const AppRedirect = () => <Navigate to="/app/aluno" replace />;

export default AppRedirect;