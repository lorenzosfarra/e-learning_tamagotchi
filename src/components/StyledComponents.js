import styled from "styled-components";
import tamagotchi from '../resources/tamagotchi.png';

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