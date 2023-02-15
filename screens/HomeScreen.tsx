import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Button } from "react-native";
import styles from "../styles/ShareStyles";
import { liquidStyles } from "../styles/LiquidCircleStyle";
import LineChartScreen from "../components/HistoryLineChart";
import axios from 'axios'
import { useEffect, useState } from "react";
import Wave from "../components/LiquidCircle";
// import Speedometer, {
//     Indicator,
//     Progress,
//     Arc
// } from 'react-native-cool-Speedometer'
// import Circular from "../components/Thermometer";

const HomeScreen = () => {
    // const [thermometer, setThermometer] = useState([{ temp: 0, humi: 0, timestamp: 0 }])
    const date = new Date()
    const time = date.toLocaleTimeString('zh-TW', { hour12: false })
    const [labels, setLabels] = useState([time])
    const [tempDatas, setTempDatas] = useState([24])
    const [humiDatas, setHumiDatas] = useState([16])
    
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
        <View>
            <Wave
                height={500}
                style={liquidStyles.waveBall}
                H={humiDatas[humiDatas.length - 1]}
                waveParams={[
                    {A: 10, T: 180, fill: '#62c2ff'},
                    {A: 15, T: 140, fill: '#0087dc'},
                    {A: 20, T: 100, fill: '#1aa7ff'},
                ]}
                animated={true}
            />
            {/* <Circular/> */}
            {/* <View>
                <Text style={styles.font}>
                    temprature: {tempDatas[tempDatas.length - 1]}
                </Text>
                <LineChartScreen labels={labels} datas={tempDatas} />
            </View>
            <View>
                <Text style={styles.font}>
                    humidity: {humiDatas[humiDatas.length - 1]}
                </Text>
                <LineChartScreen labels={labels} datas={humiDatas} />
            </View> */}
        </View>
    )
}

export default HomeScreen