import React from 'react';
import Svg, { Path } from "react-native-svg";

export default function BarcodeSvg(props){

    let color = '#4BC188';
    let width = 30;
    let height = 30;

    if(props.color != undefined)
    {
        color = props.color;
    }
    if(props.width != undefined)
    {
        width = props.width;
    }
    if(props.height != undefined)
    {
        height = props.height;
    }

    return (
        <Svg width={width} height={height} fill={color} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <Path d="M24 32C10.7 32 0 42.7 0 56V456c0 13.3 10.7 24 24 24H40c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H24zm88 0c-8.8 0-16 7.2-16 16V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16zm72 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H184zm96 0c-13.3 0-24 10.7-24 24V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H280zM448 56V456c0 13.3 10.7 24 24 24h16c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H472c-13.3 0-24 10.7-24 24zm-64-8V464c0 8.8 7.2 16 16 16s16-7.2 16-16V48c0-8.8-7.2-16-16-16s-16 7.2-16 16z"/>
        </Svg>
    );
}
