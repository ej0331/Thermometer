import { LineChart } from "react-native-gifted-charts"
import { useState, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { darkModeContext } from "../context/isDark";
import historyChartStyle from "../assets/styles/HistoryChartStyles";
import colorSheet from "../assets/styles/color";


const HistoryLineChart = ({ data, type }) => {
    const { isDark, toggleIsDark } = useContext(darkModeContext)
    const [chartData, setChartData] = useState([])

    const color = colorSheet(isDark)
    const style = historyChartStyle(isDark)

    useEffect(() => {
        setChartData(data)
    }, [data])

    return (
        <View style={{
        }}>
            <LineChart
                data={chartData}
                scrollToEnd
                showVerticalLines
                color={color[`${type}LineColor`]}
                dataPointsColor={color[`${type}DotColor`]}
                textFontSize={15}
                textShiftY={-5}
                maxValue={100}
            />
        </View>
    );
};

export default HistoryLineChart