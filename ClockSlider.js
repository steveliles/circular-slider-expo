import React,{Component} from 'react'
import {PanResponder} from 'react-native'
import Svg,{Path,Circle,G,Text} from 'react-native-svg'

class ClockSlider extends Component {
  constructor(props){
    super(props);
    const {width,height} = props
    const smallestSide = (Math.min(width,height))
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: this.handlePanResponderMove
    })
    this.origin = { x: width/2, y: height/2 };
    this.radius = (smallestSide/2)*0.85;
  }
  handlePanResponderMove = ({nativeEvent:{locationX,locationY}}) => {
    this.props.onValueChange(cartesianToPolar({ x: locationX, y: locationY }, this.origin));
  }
  render(){
    const {width,height,value,meterColor,textColor} = this.props
    const startCoord = polarToCartesian({ angle: 0, distance: this.radius }, this.origin)
    const endCoord = polarToCartesian({ angle: value, distance: this.radius }, this.origin)
    return (
      <Svg onLayout={this.onLayout} width={width} height={height} {...this.panResponder.panHandlers}>
        <Circle cx={this.origin.x} cy={this.origin.y} r={this.radius} stroke='#eee' strokeWidth={2} fill='none'/>
        <Path stroke={meterColor} strokeWidth={10} fill='none'
          d={`M${startCoord.x} ${startCoord.y} A ${this.radius} ${this.radius} 0 ${value>180?1:0} 1 ${endCoord.x} ${endCoord.y}`}/>
        <G x={endCoord.x-7.5} y={endCoord.y-7.5}>
          <Circle cx={7.5} cy={7.5} r={20} fill={meterColor} />
          <Text key={value+''} x={7.5} y={12} fontSize={14} fill={textColor} textAnchor="middle">{value+''}</Text>
        </G>
      </Svg>
    )
  }
}

const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));


const cartesianToPolar = (point, origin) => {
  let d = { x: point.x - origin.x, y: point.y - origin.y };
  return { x: Math.atan2(d.y, d.x), y: distance(origin, point) };
};

const polarToCartesian = (coord, origin) => {
  return {
    x: origin.x + (coord.distance * Math.cos(coord.angle)),
    y: origin.y + (coord.distance * Math.sin(coord.angle))
  };
};

export default ClockSlider