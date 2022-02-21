import React from 'react'
import s from './MultiRangeSlider.module.css'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

type MultiRangeSliderPropsType = {
    onChangeRange: (value: number[]) => void
    value: [number, number]
    min: number
    max: number
}

const {createSliderWithTooltip} = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const {Handle} = Slider;

const MultiRangeSlider: React.FC<MultiRangeSliderPropsType> = (
    {
        onChangeRange, value, min, max
    }
) => {

    const handleChange = (e: number[]) => {
        onChangeRange && onChangeRange(e)
    }

    return (
        <div className={s.slider_wrapper}>
            <Range
                min={min}
                max={max}
                defaultValue={[min, max]}
                value={value}
                tipFormatter={value => `${value}`}
                onChange={handleChange}
                trackStyle={[{backgroundColor: '#21268F'}]}
                handleStyle={[{border: '3px solid #21268F'}, {border: '3px solid #21268F'}]}
                railStyle={{backgroundColor: '#9A91C8'}}
                activeDotStyle={{boxShadow: '0 0 0 5px #9A91C8'}}
                dotStyle={{boxShadow: '0 0 0 5px #9A91C8'}}
            />
        </div>
    )
}

export default MultiRangeSlider