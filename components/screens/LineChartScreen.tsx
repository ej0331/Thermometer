import { Dimensions } from "react-native";
import { LineChart } from 'react-native-chart-kit';
import * as color from "../../assets/styles/color";

const LineChartScreen = ({labels , datas}) => {
    
    const data = {
        labels: labels,
        datasets: [{
            data: datas
        }]
    }
    
    const chartConfig = {
        backgroundGradientFrom: color.chartBackgroundColor,
        backgroundGradientTo: color.chartBackgroundColor,
        color: color.chartDataColor,
    }

    return (
        
        <LineChart
            data={data}
            width={Dimensions.get('window').width -16}
            height={250}
            chartConfig={chartConfig}
            withHorizontalLines={false}
            style={{
                alignItems: "center",
                borderRadius: 16,
            }}
            fromZero
            bezier //線條變圓潤
        />
        
    )
}

export default LineChartScreen