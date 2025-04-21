import "leaflet/dist/leaflet.css";

import React from "react";
import { Popup } from "react-leaflet";
import PropTypes from 'prop-types';
import "../../style/App.css";

import { useTranslation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';

function CustomPopup(props: any) {
    const { t } = useTranslation();

    return (
        <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={400}
            className="map-popup"
        >
            <div>
                <h3>{t('main.page.section.languages.subtitle') + props.delivery.descricao}</h3>

                <h4>{'latitude:'}</h4>
                <p>{props.delivery.latitude}</p>
                <h4>{'longitude:'}</h4>
                <p>{props.delivery.longitude}</p>

                <span style={{ color: '#0089A5', lineHeight: '24px', textDecoration: 'none' }}>
                    <a target="_blank" rel="noopener noreferrer" 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${props.delivery.latitude},${props.delivery.longitude}`}>Ver rotas no Google Maps</a>
                </span>
                <br/><br/>
                <Button name='edit' value={props.delivery.id} 
                        variant="contained"
                        className={"clear-button"}
                        startIcon={<VisibilityIcon />}
                        onClick={() => props.modifierDelivery(props.delivery.id)} >
                            Visualizar Seção Votação
                </Button>
            </div>
        </Popup>
    )
}

CustomPopup.propTypes = {
    modifierDelivery: PropTypes.func,
    deletarDelivery: PropTypes.func,
    delivery: PropTypes.shape({
        descricao: PropTypes.string.isRequired,
        complement: PropTypes.string
    })
};

export default  withTranslation()(CustomPopup);