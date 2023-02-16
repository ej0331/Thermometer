import React, { Component, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput
} from 'react-native';
import RNSpeedometer from 'react-native-speedometer'

const Thermometer = (props) => {
    const [temperature, setTemperature] = useState(props.temperature)
    
    useEffect(() => {
        setTemperature(props.temperature)
    }, [props.temperature])

    return (
        <RNSpeedometer 
            value={temperature} 
            size={200} 
            labelWrapperStyle={{ height: 0, width: 0}}
            innerCircleStyle={{backgroundColor: "#f0f0f0"}}
        />
    )
}

export default Thermometer