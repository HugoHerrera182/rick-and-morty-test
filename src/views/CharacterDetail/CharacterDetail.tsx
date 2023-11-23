import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { navigationRoutes } from '../../navigation';
import { useCharacter } from '../../hooks';
import { Divider } from '../../components';
import type { LocationType } from '../../types';
import './CharacterDetail.styles.scss';

const CharacterDetail = () => {

	const { character } = useCharacter();
	const navigate = useNavigate();
	const [originData, setOriginData] = useState<LocationType>();
	const [locationData, setLocationData] = useState<LocationType>();

	const getLocation = (locationUrl: string, type: 'origin' | 'location') => {
		axios.get(locationUrl)
			.then((response: AxiosResponse) => {
				if (response?.data) {
					if (type === 'location') {
						setLocationData(response.data as LocationType)
					} else {
						setOriginData(response.data as LocationType)
					}
				}
			}).catch(error => {
				// setError(error);
			});
	}

	useEffect(() => {
		if (Object.keys(character).length > 0) {
			getLocation(
				character.location?.url ? character.location?.url : '',
				'location'
			);
			getLocation(
				character.origin?.url ? character.origin?.url : '',
				'origin'
			);
		} else {
			navigate(navigationRoutes.characterList.replace(':page', '1'));
		}
	}, []);


	const personalInformationMarkup = () => {
		return (<div className='CharacterDetail__container'>
			<div className='CharacterDetail__section'>
				<img src={character.image} />
			</div>
			<div>
				<div className='CharacterDetail__section'>
					<label className='CharacterDetail__section__title'>Name:</label>
					<label className='CharacterDetail__section__value'>{character.name}</label>
				</div>
				<div className='CharacterDetail__section'>
					<label className='CharacterDetail__section__title'>State:</label>
					<label className='CharacterDetail__section__value'>{character.status}</label>
				</div>
				<div className='CharacterDetail__section'>
					<label className='CharacterDetail__section__title'>Species:</label>
					<label className='CharacterDetail__section__value'>{character.species}</label>
				</div>
				<div className='CharacterDetail__section'>
					<label className='CharacterDetail__section__title'>Type:</label>
					<label className='CharacterDetail__section__value'>{character.type}</label>
				</div>
				<div className='CharacterDetail__section'>
					<label className='CharacterDetail__section__title'>Gender:</label>
					<label className='CharacterDetail__section__value'>{character.gender}</label>
				</div>
			</div>
		</div>)
	}

	const originMarkup = () => {
		return (<div className='CharacterDetail__container'>
			<div className='CharacterDetail__section'>
				<label className='CharacterDetail__section__title'>Name:</label>
				<label className='CharacterDetail__section__value'>{originData?.name}</label>
			</div>
			<div className='CharacterDetail__section'>
				<label className='CharacterDetail__section__title'>Type:</label>
				<label className='CharacterDetail__section__value'>{originData?.type}</label>
			</div>
			<div className='CharacterDetail__section'>
				<label className='CharacterDetail__section__title'>Dimension:</label>
				<label className='CharacterDetail__section__value'>{originData?.dimension}</label>
			</div>
		</div>)
	}

	const locationMarkup = () => {
		return (<div className='CharacterDetail__container'>
			<div className='CharacterDetail__section'>
				<label className='CharacterDetail__section__title'>Name:</label>
				<label className='CharacterDetail__section__value'>{locationData?.name}</label>
			</div>
			<div className='CharacterDetail__section'>
				<label className='CharacterDetail__section__title'>Type:</label>
				<label className='CharacterDetail__section__value'>{locationData?.type}</label>
			</div>
			<div className='CharacterDetail__section'>
				<label className='CharacterDetail__section__title'>Dimension:</label>
				<label className='CharacterDetail__section__value'>{locationData?.dimension}</label>
			</div>
		</div>)
	}

	return (<div className='CharacterDetail'>
		<Divider title='Personal information'>
			{personalInformationMarkup()}
		</Divider>
		<Divider title='Origin'>
			{originMarkup()}
		</Divider>
		<Divider title='Location'>
			{locationMarkup()}
		</Divider>
	</div>
	);
};

export default CharacterDetail;
