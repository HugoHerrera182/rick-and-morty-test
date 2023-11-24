import { useEffect, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { navigationRoutes } from '../../navigation';
import { apiRoutes } from '../../api';
import type { CharacterType, InfoResponseType } from '../../types';
import { Table } from '../../components';
import { useCharacter } from '../../hooks';
import './CharacterList.styles.scss';

const CharacterList = () => {

  const [tableData, setTableData] = useState<CharacterType[]>();
  const [tableInfo, setTableInfo] = useState<InfoResponseType>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('');
  const [isTopFiveActive, setIstopFiveActive] = useState<boolean>(false);
  const tableHeader = ['Name', 'Status', 'Species', 'Location'];
  const params = useParams();
  const { setCharacter} = useCharacter();
  const navigate = useNavigate();

  const getData = (name?: string) => {
    let url = apiRoutes.GET_CHARACTERS.replace(':page', String(params.page));
    url = name && name !== '' ? `${url}&name=${name}` : url;
    axios.get(url)
      .then((response: AxiosResponse) => {
        setIsloading(false);
        if (response?.data?.results) {
          setTableData(response.data.results as CharacterType[]);
          setTableInfo(response.data.info as InfoResponseType);
        }
      }).catch((error: AxiosError) => {
        console.warn(error.message);
      });
  }

  useEffect(() => {
    setIsloading(true);
    if (params?.page) {
      getData(filterValue);
    } else {
      navigate(navigationRoutes.characterList.replace(':page', '1'));
    }
  }, [params, filterValue]);

  const onSelectPageChange = (newPage: string) => {
    navigate(navigationRoutes.characterList.replace(':page', newPage));
  }

  const addNewCharacterTopFive = (character: CharacterType) => {
    let isNewCharacter = true;
    const actualTopFive = JSON.parse(
      localStorage.getItem('topFive') || '[]'
    ) as CharacterType[];
    if (actualTopFive.length > 0) {
      actualTopFive.forEach((topCharacter: CharacterType) => {
        if (topCharacter.id === character.id) {
          isNewCharacter = false;
        }
      });
      if (isNewCharacter && actualTopFive.length === 5) {
        actualTopFive.shift();
      }
    }
    if (isNewCharacter) {
      actualTopFive.push(character);
    }
    localStorage.setItem("topFive", JSON.stringify(actualTopFive));
  };

  const handleTableClick = (character: CharacterType) => {
    setCharacter(character);
    addNewCharacterTopFive(character);
    navigate(navigationRoutes.characterDetail);
  }

  const tableContentMarkup = () => {
    return <tbody>
      {tableData?.map((character: CharacterType, i:number) => (
        <tr key={`${character.name}-${i}`} onClick={() => handleTableClick(character)}>
          <td>{character.name}</td>
          <td>{character.status}</td>
          <td>{character.species}</td>
          <td>{character.location?.name}</td>
        </tr>
      ))}
    </tbody>
  }

  const topFiceContentMArkup = () => {
    const actualTopFive = JSON.parse(
      localStorage.getItem("topFive") || "[]"
    ) as CharacterType[];
    return (
      <tbody>
        {actualTopFive &&
          actualTopFive?.map((character: CharacterType, i: number) => (
            <tr
              key={`${character.name}-${i}`}
              onClick={() => handleTableClick(character)}
            >
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
              <td>{character.location?.name}</td>
            </tr>
          ))}
      </tbody>
    );
  };

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFilterValue(event.currentTarget.value);
    navigate(navigationRoutes.characterList.replace(':page', '1'));
  };

  const onClickNext = () => {
    if (params?.page) {
      const newPage = parseInt(params.page) + 1;
      navigate(navigationRoutes.characterList.replace(':page', `${newPage}`));
    }
  }

  const onClickPrevious = () => {
    if (params?.page) {
      const newPage = parseInt(params.page) - 1;
      navigate(navigationRoutes.characterList.replace(':page', `${newPage}`));
    }
  }

  return (
    <div className="CharacterList">
      <div className="CharacterList__filter">
        {!isTopFiveActive ? (
          <div className="CharacterList__filter__input">
            <label>Filer by name</label>
            <input type="text" onChange={handleInputChange} />
          </div>
        ) : (
          <div />
        )}
        <div>
          <button onClick={() => setIstopFiveActive(!isTopFiveActive)}>
            {isTopFiveActive ? "Show all" : "Show top 5"}
          </button>
        </div>
      </div>
      <div className="CharacterList__table">
        <Table
          tableHeader={tableHeader}
          totalPages={tableInfo?.pages}
          actualPage={parseInt(params.page ? params.page : "1")}
          hasNext={tableInfo?.next !== null}
          hasPrevious={tableInfo?.prev !== null}
          isLoading={isLoading}
          onSelectPageChange={onSelectPageChange}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          showPagination={!isTopFiveActive}
        >
          {isTopFiveActive ? topFiceContentMArkup() : tableContentMarkup()}
        </Table>
      </div>
    </div>
  );
};

export default CharacterList;
