import React, {useMemo} from 'react';
import {PanResponder} from 'react-native';
import Svg, {Path, Circle, G, Text} from 'react-native-svg';

const cartesianToPolar = (x, y, cx, cy) => {
  return Math.round(
    Math.atan((y - cy) / (x - cx)) / (Math.PI / 180) + (x > cx ? 270 : 90),
  );
};

const polarToCartesian = (angle, cx, cy, r) => {
  const a = ((angle - 270) * Math.PI) / 180.0,
    x = cx + r * Math.cos(a),
    y = cy + r * Math.sin(a);

  return {x, y};
};

const CircularSlider = ({
  width,
  height,
  meterColor,
  textColor,
  value,
  onValueChange,
}) => {
  const smallestSide = useMemo(() => Math.min(width, height), [width, height]);
  const cx = useMemo(() => width / 2, [width]);
  const cy = useMemo(() => height / 2, [height]);
  const r = useMemo(() => (smallestSide / 2) * 0.85, [smallestSide]);

  const startCoord = useMemo(() => polarToCartesian(0, cx, cy, r), [cx, cy, r]);

  const endCoord = useMemo(
    () => polarToCartesian(value, cx, cy, r),
    [cx, cy, r, value],
  );

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: ({nativeEvent: {locationX, locationY}}) => {
      onValueChange(cartesianToPolar(locationX, locationY, cx, cy));
    },
  });

  return (
    <Svg width={width} height={height} {..._panResponder.panHandlers}>
      <Circle cx={cx} cy={cy} r={r} stroke="#eee" strokeWidth={2} fill="none" />
      <Path
        stroke={meterColor}
        strokeWidth={10}
        fill="none"
        d={`M${startCoord.x} ${startCoord.y} A ${r} ${r} 0 ${
          value > 180 ? 1 : 0
        } 1 ${endCoord.x} ${endCoord.y}`}
      />
      <G x={endCoord.x - 7.5} y={endCoord.y - 7.5}>
        <Circle cx={7.5} cy={7.5} r={20} fill={meterColor} />
        <Text
          key={value + ''}
          x={7.5}
          y={12}
          fontSize={14}
          fill={textColor}
          textAnchor="middle">
          {value + ''}
        </Text>
      </G>
    </Svg>
  );
};

export default CircularSlider;
