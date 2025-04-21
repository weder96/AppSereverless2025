import "leaflet/dist/leaflet.css";
import "../../src/style/App.css";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';

import React, { useEffect, useState } from "react";
import { MapContainer, LayersControl, LayerGroup } from "react-leaflet";
import { Marker, TileLayer, GeoJSON } from "react-leaflet";

import Leaflet from "leaflet";

import { inject, observer } from "mobx-react";
import mapPackage from "../../src/imagens/package.svg";
import urnaPackage from "../../src/imagens/urna.svg";
import CustomPopup from "./component/popup";
import BoxVotes from "./component/boxVotes";

import ClearAllIcon from '@material-ui/icons/ClearAll';
import Button from '@material-ui/core/Button';

import { withTranslation } from 'react-i18next';

import geo from "../geojson/geojs-52-mun.json";

import { MapsStore } from "../store";


const initialPosition = { lat: -16.3287, lng: -48.9534 };

const mapPackageIcon = Leaflet.icon({
  iconUrl: mapPackage,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const mapUrnaPackageIcon = Leaflet.icon({
  iconUrl: urnaPackage,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const Maps: React.FC = ({...props}) => {

  const [id, setId] = useState(0);
  const [location,] = useState(initialPosition);

  const modifierDelivery = (id: number) => {
    console.log(id);
    setId(id);
    mapsStore.clearLocationZone();
    mapsStore.obterLocationZone(id);
  }

  const deletarDelivery = (id: number) => {
    console.log(id);
  }

  const [mapsStore] = useState(() => new MapsStore());
  console.log(mapsStore.locationVotes);
  console.log(mapsStore.locationZone);
  
  useEffect(() => {
    function fetchBusinesses(){
      mapsStore.obterLocationVotes();
      mapsStore.obterLocationVotesByNrVotavel(22022);
    }
    fetchBusinesses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);
  

  const classes = useStyles();

  return (
    <div id="page-map">
      <div id="box-page">
      {mapsStore.locationZone.length > 0 &&
        <Button variant="contained"
                className={"clear-button"}
                startIcon={<ClearAllIcon />} 
                onClick={() => mapsStore.clearLocationZone()} >Limpar Seção Votação</Button>
      }
       <GridList className={classes.gridList}>
        {mapsStore.locationZone.length > 0 && mapsStore.locationZone.map((localZone:any) => (  
          <BoxVotes votes={localZone.votes} localVote={localZone}/>
        ))}
        </GridList>
      </div>
      <MapContainer
        center={location}
        zoom={12}
        style={{ width: "100%", height: "100%" }}
      >
      <LayersControl position="topright">
      <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer checked name="OpenStreetMap">
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> 
        </LayersControl.BaseLayer>

        <LayersControl.BaseLayer name="MapBox">
        <TileLayer
          url='https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoid2VkZXI5NiIsImEiOiJja2lnb2ZwdmQwYTdhMnNwbnI5NTg0bGl5In0.UG9GTf4vHExDjgxwLR8q0g'
        />
        </LayersControl.BaseLayer>
        
        <LayersControl.Overlay name="Locais de Votação">
          <LayerGroup>
              {mapsStore.locationVotes !== undefined && mapsStore.locationVotes.map((localVote:any) => (
                  <Marker
                    key={localVote.id}
                    icon={mapPackageIcon}
                    position={[localVote.latitude,localVote.longitude]}
                  >
                  <CustomPopup
                    delivery={localVote}
                    modifierDelivery={(id) => modifierDelivery(id)}
                    deletarDelivery={(id) => deletarDelivery(id)}
                  />
                  </Marker>
              ))}
            </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Locais de Votação Rodolfo">
          <LayerGroup>
              {mapsStore.locationVotesByNrVotavel !== undefined && mapsStore.locationVotesByNrVotavel.map((localVote:any) => (
                  <Marker
                    key={localVote.id}
                    icon={mapUrnaPackageIcon}
                    position={[localVote.latitude,localVote.longitude]}
                  >
                  <CustomPopup
                    delivery={localVote}
                    modifierDelivery={(id) => modifierDelivery(id)}
                    deletarDelivery={(id) => deletarDelivery(id)}
                  />
                  </Marker>
              ))}
            </LayerGroup>
        </LayersControl.Overlay>
        </LayersControl>

        {geo !== undefined &&
          <GeoJSON data={JSON.parse(JSON.stringify(geo))}
            style={() => {
              return {
                fillColor: 'blue'
              }
            }}></GeoJSON>}

      </MapContainer>
    </div>
  );
}

export default withTranslation()(inject("mapsStore")(observer(Maps)));
