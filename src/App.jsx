import { useContext, useEffect, useState } from "react";
import { Card, CardBody, Switch, Button } from "@nextui-org/react";
import Slider from "./components/slider";
import useMqttPub from "./hooks/useMqttPub";
import { MqttContext } from "./hooks/MqttProvider";
import useMqttSub from "./hooks/useMqttSub";


const joints = [
  {
    name: 'base',
    startAngle: 0,
    endAngle: 180,
    initialAngle: 90

  },
  {
    name: 'shoulder',
    startAngle: 0,
    endAngle: 180,
    initialAngle: 45

  },
  {
    name: 'elbow',
    startAngle: 39,
    endAngle: 180,
    initialAngle: 90

  },
  {
    name: 'gripper',
    state: 0,

  }
]


function App() {
  const [isGripperOpen, setIsGripperOpen] = useState(false);
  const [message, setMessage] = useState(null)
  const [topic, setTopic] = useState('doffy/#')
  const { client } = useContext(MqttContext)
  const publish = useMqttPub();
  const subscribe = useMqttSub();
  useEffect(() => {
    if (client) {
      subscribe({ topic: 'doffy/#' })
    }
  }, [client, subscribe])

  useEffect(() => {
    if (client) {
      client.on('message', (topic, message) => {

        setMessage(message.toString())
        setTopic(topic.toString())
      })
    }
  }, [client])


  const toggleGripper = () => {
    publish(isGripperOpen ? '0' : '1', 'doffy/gripper');
    setIsGripperOpen(!isGripperOpen)
  }
  return (
    <>
      <h1 className="text-4xl py-8 font-bold text-center ">
        Doffy
      </h1>

      <section className="container mx-auto px-2 ">
        <h2 className="text-2xl font-bold capitalize mb-8">
          Direct Controls
        </h2>
        <div className="grid grid-cols-12 gap-4">
          {
            joints.map(joint => {
              return (
                <Card isBlurred key={joint.name} className="col-span-6 md:col-span-3 dark:bg-default-100/50 ">
                  <CardBody className='flex flex-col gap-y-4'>
                    <h2 className="text-lg font-bold capitalize ">{joint.name}</h2>
                    {joint.name != 'gripper' ? <Slider initialValue={joint.initialAngle} joint={joint.name} minValue={joint.startAngle} maxValue={joint.endAngle} /> : <Switch
                      className="mt-2"

                      isSelected={isGripperOpen} onClick={toggleGripper} color="secondary">{isGripperOpen ? "Opened" : "Closed"}</Switch>}
                  </CardBody>
                </Card>
              )
            })
          }

        </div>
        <div className="my-8">
          <h2>Test segment</h2>
          <Button onClick={() => publish('80', 'doffy/joints/base')}>publish message</Button>
          <p>Message: {message}</p>
        </div>
      </section>

    </>
  )
}

export default App
