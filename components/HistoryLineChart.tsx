import { LineChart } from "react-native-gifted-charts"
import { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { darkModeContext } from "../context/isDark";
import historyChartStyle from "../styles/HistoryChartStyles";
import colorSheet from "../styles/color";


const HistoryLineChart = ({ temperatureData, humidityData }) => {
    const { isDark, toggleIsDark } = useContext(darkModeContext)
    const [temperatureChartData, setTemperatureChartData] = useState([])
    const [humidityDataChartData, setHumidityDataChartData] = useState([])

    const color = colorSheet(isDark)
    const style = historyChartStyle(isDark)

    


    useEffect(() => {
        setTemperatureChartData(temperatureData)
    }, [temperatureData])

    useEffect(() => {
        setHumidityDataChartData(humidityData)
    }, [humidityData])

    return (
        <View style={{
        }}>
            <LineChart
                data={temperatureChartData}
                data2={humidityDataChartData}
                scrollToEnd
                showVerticalLines
                color1="orange"
                color2="skyblue"
                dataPointsColor1="red"
                dataPointsColor2="blue"
                textFontSize={15}
                textShiftY={-5}
            />
        </View>
    );
};

export default HistoryLineChart