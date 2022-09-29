


function degrees_to_radians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function pFromC(cx, cy, angle, r) {
    let a = degrees_to_radians(angle)

    let X = cx + (r * Math.cos(a))  
    let Y = cy + (r * Math.sin(a))

    return {x:X, y:Y}
}