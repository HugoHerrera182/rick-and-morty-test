import { Routes, Route } from 'react-router-dom';

import { CharacterList, CharacterDetail } from '../views';

import navigationRoutes from './routes';

const RootRouter = () => (
	<Routes>
		<Route path={navigationRoutes.characterList} element={<CharacterList />} />
		<Route path={navigationRoutes.characterDetail} element={<CharacterDetail />} />
		<Route path='/' element={<CharacterList />} />
		<Route path='/list' element={<CharacterList />} />
	</Routes>
);

export default RootRouter;
