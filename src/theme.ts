import {extendTheme} from 'native-base';
import { Appearance } from 'react-native';

const systemColorScheme = Appearance.getColorScheme()
const config = {
    useSystemColorMode : false,
    initialColorMode: systemColorScheme,    
}

const colors = {
    primary: {
        50: '#EEF2F6',
        100: '#CFD9E7',
        200: '#B1C1D8',
        300: '#92A9C9',
        400: '#7491B9',
        500: '#5578AA',
        600: '#446088',
        700: '#334866',
        800: '#223040',
        900: '#111822'
    }
}

export default extendTheme({ config, colors })