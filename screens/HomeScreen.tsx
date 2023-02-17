/* #region  import modules */
import { Text, View, Switch, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
/* #endregion */

/* #region  import styles */
import waveStyles from "../assets/styles/LiquidCircleStyle";
import thermometerStyles from "../assets/styles/ThermometerStyle";
import homeStyles from "../assets/styles/HomeStyle";
import historyChartStyle from "../assets/styles/HistoryChartStyles";
/* #endregion */

/* #region  import components */
import Wave from "../components/LiquidCircle";
import Thermometer from "../components/Thermometer";
import HistoryLineChart from "../components/HistoryLineChart";
import { darkModeContext } from "../context/isDark";

/* #endregion */

const HomeScreen = () => {
    const date = new Date()
    const time = date.toLocaleTimeString('zh-TW', { hour12: false })
    const [labels, setLabels] = useState([time])
    const [tempDatas, setTempDatas] = useState([24])
    const [humiDatas, setHumiDatas] = useState([16])
    const { isDark, toggleIsDark } = useContext(darkModeContext)
    const waveStyle = waveStyles(isDark)
    const thermometerStyle = thermometerStyles(isDark)
    useEffect(() => {
        const timer = setInterval(() => {
            axios.get('http://192.168.168.155:3000/api/data')
                .then(res => {
                    const data = res.data
                    const date = new Date(data.timestamp)
                    const time = date.toLocaleTimeString('zh-TW', { hour12: false })
                    const currentLabels = labels.concat()
                    const currentTempDatas = tempDatas.concat()
                    const currentHumiDatas = humiDatas.concat()
                    if (labels.length > 5) {
                        currentLabels.splice(0, 1)
                        currentTempDatas.splice(0, 1)
                        currentHumiDatas.splice(0, 1)
                    }
                    currentHumiDatas.push(data.humidity)
                    currentLabels.push(time)
                    currentTempDatas.push(data.temperature)
                    setHumiDatas(currentHumiDatas)
                    setTempDatas(currentTempDatas)
                    setLabels(currentLabels)
                })
                .catch(e => console.log(e))
        }, 5000)

        return () => {
            clearInterval(timer)
        }
    }, [labels])

    return (
        <View style={homeStyles.container}>

            <View style={waveStyle.container}>
                <View style={waveStyle.waveTitle}>
                    <Text style={waveStyle.waveValue}>目前濕度</Text>
                    <Text style={waveStyle.waveValue}>{humiDatas[humiDatas.length - 1]}%</Text>
                </View>
                <Wave
                    height={500}
                    style={waveStyle.waveBall}
                    H={humiDatas[humiDatas.length - 1]}
                    waveParams={[
                        { A: 10, T: 200, fill: '#62c2ff' },
                        { A: 15, T: 180, fill: '#0087dc' },
                        { A: 20, T: 160, fill: '#1aa7ff' },
                    ]}
                    animated={true}
                />
            </View>
            <View style={thermometerStyle.container}>
                <Thermometer
                    temperature={tempDatas[tempDatas.length - 1]}
                />
                <Text style={thermometerStyle.title}>目前溫度{tempDatas[tempDatas.length - 1]}°C</Text>
            </View>
            {/* <View>
                <Text style={historyChartStyle.font}>
                    temprature: {tempDatas[tempDatas.length - 1]}
                </Text>
                <HistoryLineChart labels={labels} datas={tempDatas} />
            </View>
            <View>
                <Text style={historyChartStyle.font}>
                    humidity: {humiDatas[humiDatas.length - 1]}
                </Text>
                <HistoryLineChart labels={labels} datas={humiDatas} />
            </View> */}
        </View>
    )
}

export default HomeScreen