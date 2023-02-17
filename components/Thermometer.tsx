import React, { Component, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    TextInput
} from 'react-native';
import RNSpeedometer from 'react-native-speedometer'
import { darkModeContext } from '../context/isDark';
import colorSheet from '../styles/color';


const Thermometer = (props) => {
    const [temperature, setTemperature] = useState(props.temperature)

    useEffect(() => {
        setTemperature(props.temperature)
    }, [props.temperature])
    // 3DC3E1
    return (
        <darkModeContext.Consumer>
            {({ isDark, toggleIsDark }) => {
                const color = colorSheet(isDark)
                const labelsColor = function (isDark) {
                    return {
                        patheticallyWeak: isDark ? '#56C7E1' : '#60CDE6',
                        veryWeak: isDark ? '#81CFE4' : '#8DD0E2',
                        soso: isDark ? '#A0DD7A' : '#A5DA84',
                        fair: isDark ? '#DBE42F' : '#D8E13A',
                        strong: isDark ? '#F59A08' : '#F49F17',
                        unbeliveablystrong: isDark ? '#F16A09' : '#F1741B'
                    }
                }(isDark)
                return (
                    <RNSpeedometer
                        value={temperature}
                        defaultValue={0}
                        maxValue={50}
                        size={200}
                        labelWrapperStyle={{ height: 0, width: 0 }}
                        innerCircleStyle={{ backgroundColor: color.backgroundColor }}
                        labels={[{
                            name: 'Pathetically weak',
                            labelColor: labelsColor.patheticallyWeak,
                            activeBarColor: labelsColor.patheticallyWeak
                        }, {
                            name: 'Very weak',
                            labelColor: labelsColor.veryWeak,
                            activeBarColor: labelsColor.veryWeak
                        }, {
                            name: 'So-so',
                            labelColor: labelsColor.soso,
                            activeBarColor: labelsColor.soso
                        }, {
                            name: 'Fair',
                            labelColor: labelsColor.fair,
                            activeBarColor: labelsColor.fair
                        }, {
                            name: 'Strong',
                            labelColor: labelsColor.strong,
                            activeBarColor: labelsColor.strong
                        }, {
                            name: 'Unbelievably strong',
                            labelColor: labelsColor.unbeliveablystrong,
                            activeBarColor: labelsColor.unbeliveablystrong
                        }]}
                    />
                )
            }}
        </darkModeContext.Consumer>
    )
}

export default Thermometer