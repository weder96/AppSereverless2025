import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../utils/colors";
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MapIcon from '@material-ui/icons/Map';
import GamesIcon from '@material-ui/icons/Games';
import Tooltip from '@material-ui/core/Tooltip';

const Container = styled.header`
  width: 4%;  
  height: 100vh;
  background-color: ${colors.blue};
  box-sizing: border-box;
  align-items: center;
  float: left;
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  align-items: center;
  li {
    margin-top: 60px;
  }
`;


const Item = styled(Link)`
  padding: 42px 30px 30px 16px;
  color: ${colors.gray};
  cursor: pointer;
  text-decoration: none;
  align-items: center;
  :hover {
    color: #FFFFFF;
    background-color: #5B60F3
  }
`;

export class Header extends React.Component<{}, {}> {
  public render() {
    return (
      <div className="menu-div">
      <Container>
          <li>
            <Item to="/">
                <GamesIcon style={{ fontSize: 40 }} /> 
            </Item>
          </li>
        <Menu>
        <Tooltip title="Página Principal" aria-label="Página Principal">
          <li>
            <Item to="/">
                <HomeIcon style={{ fontSize: 40 }} /> 
            </Item>
          </li>
          </Tooltip>
          <Tooltip title="Sobre" aria-label="Sobre"> 
          <li>
            <Item to="/about">
                <InfoIcon style={{ fontSize: 40 }}/>
            </Item>
          </li>
          </Tooltip>
          <Tooltip title="Mapas" aria-label="Mapas">
          <li>
            <Item to="/maps">
                <MapIcon style={{ fontSize: 40 }}/>
            </Item>
          </li>
          </Tooltip>  
        </Menu>
      </Container>
      </div>
    );
  }
}
