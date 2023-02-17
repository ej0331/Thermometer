import { darkModeContext } from "../context/isDark"
import { Switch } from "react-native-elements"

function DarkSwitch() {

    return (
        <darkModeContext.Consumer>
            {({ isDark, toggleIsDark }) => {
                return (
                    <Switch
                        trackColor={{ false: '#767577', true: '#e8e8e8' }}
                        thumbColor={isDark ? '#648FF2' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleIsDark}
                        value={isDark}
                    />
                )

            }}
        </darkModeContext.Consumer>
    )
}
export default DarkSwitch