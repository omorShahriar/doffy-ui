import { useState } from "react";
import { Slider as NextSlider } from "@nextui-org/react";
import PropTypes from "prop-types";
import useMqttPub from "../hooks/useMqttPub";


export default function Slider({ minValue = 0, maxValue = 180, joint, initialValue }) {
    const publish = useMqttPub();
    const [value, setValue] = useState(initialValue);

    const updateAngle = (value) => {
        if (joint == 'base') {
            publish(value.toString(), 'doffy/joints/base')
            setValue(value)
        }
        if (joint == 'shoulder') {
            publish(value.toString(), 'doffy/joints/shoulder')
            setValue(value)
        }
        if (joint == 'elbow') {
            publish(value.toString(), 'doffy/joints/elbow')
            setValue(value)
        }
    }
    return (
        <div className="flex flex-col gap-2 w-full h-full max-w-md items-start justify-center">
            <NextSlider
                size="md"
                showTooltip={true}
                hideValue={true}
                defaultValue={initialValue}
                onChangeEnd={updateAngle}
                minValue={minValue}
                maxValue={maxValue}
                tooltipProps={{
                    showArrow: false,
                    color: "secondary",
                }}
                classNames={{

                    base: "max-w-md gap-3",
                    track: "border-s-secondary-100",
                    filler: "bg-gradient-to-r from-secondary-100 to-secondary-500"
                }}
                renderThumb={(props) => (
                    <div
                        {...props}
                        className="group p-1 top-1/2 bg-background border-small border-default-200 dark:border-default-400/50 shadow-medium rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                    >
                        <span className="transition-transform bg-gradient-to-br shadow-small from-secondary-100 to-secondary-500 rounded-full w-5 h-5 block group-data-[dragging=true]:scale-80" />
                    </div>
                )}
            />
            <p className="text-default-500 font-medium text-small">Current angle: {value}</p>
        </div>

    );
}


Slider.propTypes = {
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    joint: PropTypes.string,
    initialValue: PropTypes.number

};