import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigationRoutes } from '../../navigation';
import './CharacterDetail.styles.scss';

const CharacterDetail = () => {

  const navigate = useNavigate();
  const handleOnDetailSpace = (id: string) => {
    navigate(navigationRoutes.characterDetail.replace(':spaceId', id));
  };


  return (
    <h1>Este es el detalle</h1>
  );
};

export default CharacterDetail;
