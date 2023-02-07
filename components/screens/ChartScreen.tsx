import { Text, Image, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Button, Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import * as color from "../../assets/styles/color";

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
        data: [ 20, 45, 28, 80, 99, 43 ]
    }]
}

const chartConfig = {
    backgroundGradientFrom: color.chartBackgroundColor,
    backgroundGradientTo: color.chartBackgroundColor,
    color: color.chartDataColor,
}

const MyLineChart = () => {
    return (
        <View>
        <LineChart
            data={data}
            width={Dimensions.get('window').width -16}
            height={250}
            chartConfig={chartConfig}
            style={{
                paddingTop: 25,
                alignItems: "center",
                borderRadius: 16,
            }}
            bezier //線條變圓潤
            />        
        </View>
    )
}

const ChartScreen = () => {
    return (
        <View>
            <MyLineChart/>
        </View>
    )
}

export default ChartScreen