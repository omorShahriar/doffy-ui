
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import ikSolver from "../lib/ikSolver";
import useMqttPub from "../hooks/useMqttPub";
const InverseKinematics = () => {
    const [xSValue, setXSValue] = useState(null);
    const [ySValue, setYSValue] = useState(null);
    const [zSValue, setZSValue] = useState(10);
    const [xEValue, setXEValue] = useState(null);
    const [yEValue, setYEValue] = useState(null);
    const [zEValue, setZEValue] = useState(10);
    const publish = useMqttPub();
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    const solveIk = async () => {
        if (!xSValue || !ySValue || !zSValue || !xEValue || !yEValue || !zEValue) {
            console.error('Please enter all values')
            return;
        }
        const startAngles = ikSolver({ x: xSValue, y: ySValue, z: zSValue })
        // const startAngles = ikSolver({ x: 10, y: , z: 10 })
        const endAngles = ikSolver({ x: xEValue, y: yEValue, z: zEValue })

        publish(startAngles[0].toString(), 'doffy/joints/base')
        await sleep(500);
        publish(startAngles[2].toString(), 'doffy/joints/elbow')
        await sleep(500);
        publish(startAngles[1].toString(), 'doffy/joints/shoulder')
        await sleep(500);
        publish('1', 'doffy/gripper');
        await sleep(500);
        publish('0', 'doffy/gripper');
        await sleep(500);
        publish("80", 'doffy/joints/shoulder')
        await sleep(500);
        publish("90", 'doffy/joints/base')
        await sleep(500);
        publish(endAngles[0].toString(), 'doffy/joints/base')
        await sleep(300);
        publish(endAngles[2].toString(), 'doffy/joints/elbow')
        await sleep(300);
        publish(endAngles[1].toString(), 'doffy/joints/shoulder')
        await sleep(1000);
        publish('1', 'doffy/gripper');
        console.log(startAngles)
        console.log(endAngles)
    }
    return (
        <div className="my-8">
            <h2 className="text-2xl font-bold capitalize mb-8">
                Inverse Kinematics
            </h2>
            <div className="my-2">
                <h3 className="text-lg font-medium my-4">Start Position</h3>
                <div className="flex justify-between gap-4 flex-col md:flex-row">
                    <Input
                        type="number"
                        label="x cordinate"
                        placeholder="10 cm"
                        labelPlacement="outside"
                        size="lg"
                        value={xSValue}
                        onValueChange={setXSValue}
                    />
                    <Input
                        type="number"
                        label="y cordinate"
                        placeholder="25 cm"
                        labelPlacement="outside"
                        size="lg"
                        value={ySValue}
                        onValueChange={setYSValue}
                    />
                    <Input
                        type="number"
                        label="z cordinate"

                        placeholder="8 cm"
                        labelPlacement="outside"
                        size="lg"
                        value={zSValue}
                        onValueChange={setZSValue}
                    />
                </div>


            </div>
            <div className="my-2">
                <h3 className="text-lg font-medium my-4">End Position</h3>
                <div className="flex justify-between gap-4 flex-col md:flex-row">
                    <Input
                        type="number"
                        label="x cordinate"
                        placeholder="10 cm"
                        labelPlacement="outside"
                        size="lg"
                        value={xEValue}
                        onValueChange={setXEValue}
                    />
                    <Input
                        type="number"
                        label="y cordinate"
                        placeholder="25 cm"
                        labelPlacement="outside"
                        size="lg"
                        value={yEValue}
                        onValueChange={setYEValue}
                    />
                    <Input
                        type="number"
                        label="z cordinate"

                        placeholder="8 cm"
                        labelPlacement="outside"
                        size="lg"
                        value={zEValue}
                        onValueChange={setZEValue}
                    />
                </div>


            </div>
            <div className="my-4">
                <Button color="secondary" size="lg" onClick={solveIk}>Send Data</Button>
            </div>
        </div>
    )
}

export default InverseKinematics