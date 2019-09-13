import styled from "styled-components";
import tamagotchi from '../resources/tamagotchi.png';

export const TamagotchiDiv = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${tamagotchi});
    background-position: ${props => `${props.position[0]}px ${props.position[1]}px`};
    margin: 0 auto;
`;