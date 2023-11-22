import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { navigationRoutes } from '../../navigation';
import { apiRoutes } from '../../api';
import type { CharacterType, InfoResponseType } from '../../types';
import { Table } from '../../components';
import './CharacterList.styles.scss';

const CharacterList = () => {

  const [tableData, setTableData] = useState<CharacterType[]>();
  const [tableInfo, setTableInfo] = useState<InfoResponseType>();
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>('');
  const tableHeader = ['Name', 'Status', 'Species', 'Location'];
  const params = useParams();

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
      }).catch(error => {
        // setError(error);
      });
  }

  useEffect(() => {
    console.log('params--', params);
    setIsloading(true);
    if (params && params.page) {
      getData(filterValue);
    } else {
      navigate(navigationRoutes.characterList.replace(':page', '1'));
    }
  }, [params, filterValue]);

  const onSelectPageChange = (newPage: string) => {
    navigate(navigationRoutes.characterList.replace(':page', newPage));
  }

  const navigate = useNavigate();
  const handleOnDetailSpace = (id: string) => {
    navigate(navigationRoutes.characterDetail.replace(':spaceId', id));
  };

  const tableContentMarkup = () => {
    return <tbody>
      {tableData?.map((character: CharacterType, i:number) => (
        <tr key={`${character.name}-${i}`}>
          <td>{character.name}</td>
          <td>{character.status}</td>
          <td>{character.species}</td>
          <td>{character.location?.name}</td>
        </tr>
      ))}
    </tbody>
  }

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

  return (<div className='CharacterList'>
    <div className='CharacterList__filter'>
      <label>Filer by name</label>
      <input type='text' onChange={handleInputChange}/>
    </div>
    <div className='CharacterList__table'>
      <Table
        tableHeader={tableHeader}
        totalPages={tableInfo?.pages}
        actualPage={parseInt(params.page ? params.page : '1')}
        hasNext={tableInfo?.next !== null}
        hasPrevious={tableInfo?.prev !== null}
        isLoading={isLoading}
        onSelectPageChange={onSelectPageChange}
        onClickNext={onClickNext}
        onClickPrevious={onClickPrevious}
      >
        {tableContentMarkup()}
      </Table>
    </div>
  </div>
  );
};

export default CharacterList;
