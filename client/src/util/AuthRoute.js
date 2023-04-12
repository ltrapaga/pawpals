import { Navigate, Route } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/auth';

function AuthRoute({ path, element }) {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" replace /> : <Route path={path} element={element} />;
}

export default AuthRoute;