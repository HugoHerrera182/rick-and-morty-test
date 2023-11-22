import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { navigationRoutes, Router } from './navigation';

function App() {
  /* const params = useParams();
  const navigation = useNavigate();
  console.log('paramsAa--', params); */
  /* useEffect(() => {
    navigation(navigationRoutes.characterList);
  }, []); */

  return (
    <Router />
  );
}

export default App;
