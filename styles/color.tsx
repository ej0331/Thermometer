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
        buttonSelectedText: '#f8f8f8'

    }
}
export default colorSheet