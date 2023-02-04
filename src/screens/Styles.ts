import { Dimensions, StyleSheet } from "react-native";

const d = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,              
        alignItems: 'center',        
        width: '100%',        
    },

    bgImg: {                
        flex: 1,
        alignItems: 'center',
        width: d.width,  
        height: d.height,                 
    },

    searchInput: {
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 50,
        padding: 10,
        width: 350,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    infoBox: {
        paddingTop: 30,
        alignItems: "center",
        width: '100%',                
    },

    // Component WeatherInfo
    componentContainer: {
        width: '90%',
    },

    weatherBox: {
        backgroundColor: '#44444466',        
        padding: 17,
        borderRadius: 10,
    },  

    white: {
        color: '#FFF',        
    },
})

export default styles