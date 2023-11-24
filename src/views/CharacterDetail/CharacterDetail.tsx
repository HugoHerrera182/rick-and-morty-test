import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
import { navigationRoutes } from "../../navigation";
import { useCharacter } from "../../hooks";
import { Divider } from "../../components";
import type { LocationType } from "../../types";
import "./CharacterDetail.styles.scss";

const CharacterDetail = () => {
  const { character } = useCharacter();
  const navigate = useNavigate();
  const [originData, setOriginData] = useState<LocationType>();
  const [locationData, setLocationData] = useState<LocationType>();
  const defaultLocation: LocationType = {
    name: "unknown",
    type: "unknown",
    dimension: "unknown",
  };

  const getLocation = (locationUrl: string, type: "origin" | "location") => {
    axios
      .get(locationUrl)
      .then((response: AxiosResponse) => {
        if (response?.data) {
          if (type === "location") {
            setLocationData(response.data as LocationType);
          } else {
            setOriginData(response.data as LocationType);
          }
        }
      })
      .catch((error: AxiosError) => {
        console.warn(error.message);
        if (type === "location") {
          setLocationData(defaultLocation);
        } else {
          setOriginData(defaultLocation);
        }
      });
  };

  useEffect(() => {
    if (Object.keys(character).length > 0) {
      getLocation(
        character.location?.url ? character.location?.url : "",
        "location"
      );
      getLocation(
				character.origin?.url ? character.origin?.url : "",
				"origin");
    } else {
      navigate(navigationRoutes.characterList.replace(":page", "1"));
    }
  }, []);

  const personalInformationMarkup = () => {
    const titles = ["Name", "State", "Species", "Type", "Gender"];
    const { name, status, species, type, gender } = { ...character };
    const values = [name, status, species, type, gender];
    return (
      <div className="CharacterDetail__container">
        <div className="CharacterDetail__section">
          <img alt={`${character.name}-img`} src={character.image} />
        </div>
        <div>{renderSectionData(titles, values)}</div>
      </div>
    );
  };

  const locateMarkup = (data: LocationType) => {
    const titles = ["Name", "Type", "Dimension"];
    const { name, type, dimension } = { ...data };
    const values = [name, type, dimension];
    return (
      <div className="CharacterDetail__container">
        {renderSectionData(titles, values)}
      </div>
    );
  };

  const renderSectionData = (
    titles: string[],
    values: (string | undefined)[]
  ) => (
    <Fragment>
      {titles.map((title: string, i: number) => (
        <div key={title} className="CharacterDetail__section">
          <label className="CharacterDetail__section__title">{title}:</label>
          <label className="CharacterDetail__section__value">
            {values[i] ? values[i] : ""}
          </label>
        </div>
      ))}
    </Fragment>
  );

  const handleOnClick = () => {
    navigate(navigationRoutes.characterList.replace(":page", "1"));
  };

  return (
    <div className="CharacterDetail">
      <Divider title="Personal information">
        {personalInformationMarkup()}
      </Divider>
      <Divider title="Origin">{locateMarkup(originData || {})}</Divider>
      <Divider title="Location">{locateMarkup(locationData || {})}</Divider>
      <button onClick={handleOnClick}>Back to list</button>
    </div>
  );
};

export default CharacterDetail;
