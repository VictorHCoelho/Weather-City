import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StatusBar, TouchableOpacity, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { API_URL, API_KEY } from '@env'
import WeatherInfo from '../components/WeatherInfo';
import { MaterialIcons } from '@expo/vector-icons'
import styles from './Styles'
import imageClear from '../assets/clear.png'
import imageCloudy from '../assets/cloudy.png'
import imageOvercast from '../assets/overcast.png'


interface IWeather {
    message: string;
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
    weather: object[];
}

const initialWeather = {
    message: "",
    name: "",
    main: {
        temp: "",
        feels_like: "",
        temp_min: "",
        temp_max: "",
        humidity: 0,
    },
    sys: {
        country: "",
    },
    clouds: {
        all: 0,
    },
    wind: {
        speed: 0,
    },
    weather: []
}

export function Home() {
    const [weather, setWeather] = useState<IWeather>(initialWeather)
    const [city, setCity] = useState('Rio de Janeiro')
    const [search, setSearch] = useState('')
    const [updateWeather, setUpdateWeather] = useState(false)
    const [loading, setLoading] = useState(true)
    const [bgImage, setBgImage] = useState(imageClear)


    async function getWeatherInfo() {
        try {
            const response = await fetch(`${API_URL}q=${city}&lang=pt_br&appid=${API_KEY}&units=metric`)
            const data = await response.json()
            setWeather(data)
            setLoading(false)

            // Change Background Image
            if (data.clouds.all <= 30) {
                setBgImage(imageClear)
            } else if (data.clouds.all <= 60) {
                setBgImage(imageCloudy)
            } else {
                setBgImage(imageOvercast)
            }

        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar as informações.')
            console.log(error);
        }
    }


    const onPressSearchCity = () => {
        setLoading(true)
        if (search) {
            setCity(search.toLowerCase())
            setSearch('')
        }
    }

    const onPressUpdateWeather = () => {
        setLoading(true)
        if (updateWeather === false) {
            setUpdateWeather(true)
        } else {
            setUpdateWeather(false)
        }
    }

    useEffect(() => {
        getWeatherInfo()
    }, [city, updateWeather])
    


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={bgImage}
                resizeMode='cover'
                style={[styles.container, { paddingTop: StatusBar.currentHeight && StatusBar.currentHeight + 30 }]}

            >
                <Text style={{ color: '#FFF', fontSize: 35, marginBottom: 20 }}>Clima</Text>

                <View style={styles.searchInput}>
                    <TextInput
                        style={{ color: '#fff', width: 290 }}
                        onChangeText={setSearch}
                        value={search}
                        placeholder='Informe uma cidade'
                        placeholderTextColor='#FFF'
                        onSubmitEditing={onPressSearchCity}
                    />
                    <TouchableOpacity>
                        <MaterialIcons
                            name='send'
                            color='#FFF'
                            onPress={onPressSearchCity}
                            size={25}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.infoBox}>
                    {
                        loading ? <ActivityIndicator size='large' color="#FFF" /> :
                            weather.message ? <Text style={{ fontSize: 25, color: '#fff' }}>{city}: não encontrada</Text>
                                : <WeatherInfo data={weather} updateInfo={onPressUpdateWeather} />
                    }
                </View>

                <StatusBar translucent backgroundColor='transparent' />
            </ImageBackground>
        </SafeAreaView>
    );
}
