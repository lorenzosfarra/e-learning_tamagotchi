import styled from "styled-components";
import tamagotchi from '../resources/tamagotchi.png';
import {Button, Container, Row} from "reactstrap";
import config from "../config";

export const TamagotchiDiv = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${tamagotchi});
    background-position: ${props => `${props.position[0]}px ${props.position[1]}px`};
    margin: 20px auto;
    animation-duration: 3s;
    animation-name: infinite-spinning;
    animation-iteration-count: infinite;
    animation-direction: alternate;
`;

export const FullWidthRow = styled(Row)`
    width: 100%;
`;

export const MainContainer = styled(Container)`
    background-image: ${props => props.status ? config.Status.BG_GRADIENT[props.status] : 'none'}
`;

export const ActionButton = styled(Button)`
    background-color: #ffc543 !important;
    color: #000000 !important;
    font-weight: bold !important;
    border: 3px solid #000000 !important;
    outline: none;
    margin: 10px;
`;

export const FormButton = styled(ActionButton)`
    background-color: #6600cc !important;
    color: #FFFFFF !important;
    border: 3px solid #FFFFFF !important;
`;

export const LoadingComponent = styled.div`
    min-height: 100vh;
`;

export const Name = styled.p`
    text-transform: uppercase;
    background-color: #e7e5e4;
    font-weight: bold;
    padding: 5px 20px;
    border: 3px solid #000000 !important;
    border-radius: 8px;
`;