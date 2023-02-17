import { LineChart } from "react-native-gifted-charts"
import { useState, useEffect } from "react";
import { View, Text } from "react-native";


const HistoryLineChart = ({ temperatureData, humidityData }) => {
    const customDataPoint = () => {
        return (
            <View
                style={{
                    width: 5,
                    height: 5,
                    backgroundColor: 'white',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderColor: '#07BAD1',
                }}
            />
        );
    };

    const customLabel = (val) => {
        return (
            <View style={{ width: 70, marginLeft: 7 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>{val}</Text>
            </View>
        );
    };

    const data = [
        {
            value: 100,
            labelComponent: () => customLabel('22 Nov'),
            customDataPoint: customDataPoint,
        },
        {
            value: 140,
            hideDataPoint: true,
        },
        {
            value: 250,
            customDataPoint: customDataPoint,
        },
        {
            value: 290,
            hideDataPoint: true,
        },
        {
            value: 410,
            labelComponent: () => customLabel('24 Nov'),
            customDataPoint: customDataPoint,
            showStrip: true,
            stripHeight: 190,
            stripColor: 'black',
            dataPointLabelComponent: () => {
                return (
                    <View
                        style={{
                            backgroundColor: 'black',
                            paddingHorizontal: 8,
                            paddingVertical: 5,
                            borderRadius: 4,
                        }}>
                        <Text style={{ color: 'white' }}>410</Text>
                    </View>
                );
            },
            dataPointLabelShiftY: -70,
            dataPointLabelShiftX: -4,
        },
        {
            value: 440,
            hideDataPoint: true,
        },
        {
            value: 300,
            customDataPoint: customDataPoint,
        },
        {
            value: 280,
            hideDataPoint: true,
        },
        {
            value: 180,
            labelComponent: () => customLabel('26 Nov'),
            customDataPoint: customDataPoint,
        },
        {
            value: 150,
            hideDataPoint: true,
        },
        {
            value: 150,
            customDataPoint: customDataPoint,
        },
    ];
    const [temperatureChartData, setTemperatureChartData] = useState(data)
    const [humidityDataChartData, setHumidityDataChartData] = useState(data)
    
    useEffect(() => {
        setTemperatureChartData(temperatureData)
    }, [temperatureData])

    useEffect(() => {
        setHumidityDataChartData(humidityData)
    }, [humidityData])

    return (
        <View style={{
            // marginTop: 100,
            // paddingVertical: 50,
            // backgroundColor: '#414141',
        }}>
            <LineChart
                data={temperatureChartData}
                data2={humidityDataChartData}
                // isAnimated={true}
                scrollToEnd
                showVerticalLines
                color1="orange"
                color2="skyblue"
                dataPointsColor1="red"
                dataPointsColor2="blue"
                textFontSize={13}
            />
        </View>
    );
};

export default HistoryLineChart