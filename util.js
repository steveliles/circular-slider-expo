export const cartesianToPolar = (point, origin) => {
  let d = { x: point.x - origin.x, y: point.y - origin.y };
  return { x: Math.atan2(d.y, d.x), y: distance(origin, point) };
};

export const polarToCartesian = (coord, origin) => {
  return {
    x: origin.x + (coord.distance * Math.cos(coord.angle)),
    y: origin.y + (coord.distance * Math.sin(coord.angle))
  };
};