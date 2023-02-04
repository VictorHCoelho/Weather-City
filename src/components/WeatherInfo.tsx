import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../screens/Styles';

import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons'

interface Props {
    data: {
        name: string;
        main: {
            temp: string;
            feels_like: string;
            temp_min: string;
            temp_max: string;
            humidity: number;
        };
        sys: {
            country: string;
        };
        clouds: {
            all: number;
        };
        wind: {
            speed: number;
        };
        weather: object[]
    };
    updateInfo: () => any;

}

export default function WeatherInfo({ data, updateInfo }: Props) {
    const currentDate = new Date(Date.now()),
        day = currentDate.getDate().toString().padStart(2, '0'),
        month = (currentDate.getMonth() + 1).toString().padStart(2, '0'),
        year = currentDate.getFullYear(),
        hours = currentDate.getHours().toString().padStart(2, '0'),
        minutes = currentDate.getMinutes().toString().padStart(2, '0')
    const totalDate = `${day}/${month}/${year} ${hours}:${minutes}`

    return (
        <View style={styles.componentContainer}>

            <View style={styles.weatherBox}>
                <Text style={[styles.white, { fontSize: 20 }]}>
                    <FontAwesome5 name='map-marker-alt' size={18} />  {data.name}, {data.sys.country}
                </Text>
                <Text style={[styles.white]}>{totalDate}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.white, { fontSize: 50 }]}>{parseInt(data.main.temp)}°</Text>
                    {data && data.weather.map((situation: any) => (
                        <Image
                            key={situation.id}
                            style={{ height: 70, width: 70 }}
                            source={{
                                uri: `http://openweathermap.org/img/wn/${situation.icon}@2x.png`
                            }}
                        />
                    ))}

                </View>

                {data && data.weather.map((situation: any) => (
                    <Text style={[styles.white, { fontSize: 18, marginBottom: 10 }]} key={situation.id}>{situation.description}</Text>
                ))
                }

                <Text style={[styles.white]}>{parseInt(data.main.temp_max)}°/{parseInt(data.main.temp_min)}°</Text>
                <Text style={[styles.white]}>Sensação térmica de {parseInt(data.main.feels_like)}°</Text>

                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity>
                        <MaterialIcons
                            name='refresh'
                            color='#FFF'
                            onPress={updateInfo}
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={[styles.weatherBox, { marginTop: 10 }]}>
                <Text style={[styles.white, {}]}>
                    <Ionicons name='water' color='#FFF' size={20} />  Umidade: {data.main.humidity} %
                </Text>
                <Text style={[styles.white, { marginTop: 20 }]}>
                    <FontAwesome5 name='wind' color='#FFF' size={20} />  Vento: {(data.wind.speed * 3.6).toFixed(1)} km/h
                </Text>
                <Text style={[styles.white, { marginTop: 20 }]}>
                    <FontAwesome5 name='cloud' color='#FFF' size={20} />  Nuvens: {data.clouds.all} %
                </Text>
            </View>
        </View>
    );
}
