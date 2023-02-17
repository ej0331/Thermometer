function colorSheet(isDark: Boolean) {
    return {
        fontColor: isDark ? '#e8e8e8' : '#181818',
        backgroundColor: isDark ? '#181818' : '#f8f8f8',
        primaryColor: isDark ? '#648FF2' : '#495057',
        navigationColor: isDark ? '#A8A8A8' : '#ced4da',
        navigationFocusedColor: isDark ? '#648FF2' : '#495057',
        buttonColor: '#e8e8e8',
        selectButtonColor: isDark ? '#495057' : '#0175E8',
        buttonText: '#181818',
        buttonSelectedText: '#f8f8f8',
        temperatureLineColor: isDark ? '#87323E' : 'orange',
        humidityLineColor: isDark ? '#D2D9EB' : 'skyblue',
        temperatureDotColor: isDark ? '#F6465D' : 'red',
        humidityDotColor: isDark ? '#677DE3' : 'blue',
        chartLineColor: isDark ? '#30363C' : 'lightgray'
    }
}
export default colorSheet