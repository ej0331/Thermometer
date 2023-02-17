import React, { useMemo, useEffect, useState } from 'react';
import {
    View,
    Animated,
    StyleSheet,
    Easing,
} from 'react-native';
import Svg, {
    G,
    Path,
} from 'react-native-svg';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

/**
 * ---------+------------------------+
 * <-- P -->|<--    T    -->|        |______
 *          |   /\          |   /\   |  ^
 *          |  /  \         |  /  \  |  A
 *          | /    \        | /    \ |  |
 *          |/      \       |/      \|__V___
 *          |        \      /        |  ^
 *          |         \    /         |  |
 *          |          \  /          |  |
 *          |           \/           |  H
 *          |                        |  |
 *          |                        |  |
 * ---------+------------------------+__V___
 */

/**
 * @class Wave
 *
 * @prop {Number} H water level
 * @prop {Array} waveParams list of params: {A, T, fill}
 * @prop {bool} animated
 */

let _animValues = [];
let _animations = [];

function Wave(props) {
    const [Height, setHight] = useState(props.H)
    const [waveParams, setWaveParams] = useState(props.waveParams)
    let style = props.style
    let _animated = props.animated || false;
    let waves = [];

    for (let i = 0; i < waveParams.length; i++) {
        _animValues.push(new Animated.Value(0));
    }

    const startAnim = () => {
        stopAnim();

        const {
          speed = 5000,
          speedIncreasePerWave = 1000,
          easing = 'linear'
        } = props
        
        for (let i = 0; i < _animValues.length; i++) {
            let anim = Animated.loop(Animated.timing(_animValues[i], {
                toValue: 1,
                duration: speed + i * speedIncreasePerWave,
                easing: Easing[easing],
                useNativeDriver: true,
            }));
            _animations.push(anim);
            anim.start();
        }
        _animated = true;


    }

    const stopAnim = () => {
        for (let _anim of _animations) {
            _anim.stop();
            _anim = null;
        }
        _animations = [];
        _animated = false;

    }

    // componentDidMount
    useEffect(() => {
        startAnim()
    }, [])
    
    useMemo(() => {
        setHight(props.H)
        startAnim

    } , [props.H])

    useEffect(() => {

    }, [props.H])
    
    for (let i = 0; i < waveParams.length; i++) {
        let {A, T, fill} = waveParams[i];
        let translateX = _animValues[i].interpolate({
            inputRange: [0, 1],
            outputRange: [0, -2 * T],
        });
        let wave = (
            <AnimatedSvg
                key={i}
                style={{
                    width: 3 * T,
                    height: A + Height,
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    transform: [{ translateX }],
                }}
                preserveAspectRatio="xMinYMin meet"
                viewBox={`0 0 ${3 * T} ${A + Height}`}
            >
                <Path
                    d={`M 0 0 Q ${T / 4} ${-A} ${T / 2} 0 T ${T} 0 T ${3 * T / 2} 0 T ${2 * T} 0 T ${5 * T / 2} 0 T ${3 * T} 0 V ${Height} H 0 Z`}
                    fill={fill}
                    transform={`translate(0, ${A})`}
                />
            </AnimatedSvg>
        );
        waves.push(wave);
    }
    
    return (
        <View style={style} >
            {waves}
        </View>
    )

}

export default Wave;
