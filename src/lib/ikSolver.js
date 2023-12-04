


const z0 = 8;
const a = 10.6;
const b = 18;

export default function ikSolver({ x, y, z }) {
    const yFinal = parseFloat(y) + 7.6;
    const theta0 = Math.atan2(yFinal, x) * (180 / Math.PI);
    const l = Math.sqrt(x * x + yFinal * yFinal);
    const phi1 = Math.atan2((z - z0), l);
    const h = Math.sqrt((z - z0) * (z - z0) + l * l);
    const phi2 = Math.acos((a * a + h * h - b * b) / (2 * a * h));
    const theta1 = (phi1 + phi2) * (180 / Math.PI);
    const theta2 = (Math.acos((a * a + b * b - h * h) / (2 * a * b))) * (180 / Math.PI);
    // return `${Math.ceil(theta0)},${Math.ceil(theta1)},${Math.ceil(theta2)}`
    return [Math.ceil(theta0), Math.ceil(theta1), Math.ceil(theta2)]

}