import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Image } from 'react-native';
import customMapStyle from './customMapStyle.json';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../android/app/src/types/types';
import { GOOGLE_MAPS_APIKEY } from '@env';

type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;

type Props = {
  route: MapScreenRouteProp;
  navigation: any;
};

type Store = {
  geometry: {
    location: {
      lat: number,
      lng: number,
    },
  },
  name: string,
  rating: number,
};

const MapScreen: React.FC<Props> = ({ navigation }) => {
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [markers, setMarkers] = useState<any[]>([]);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1)); // <-- Changed this line
  const [showOverlay, setShowOverlay] = useState(true); // <-- Added this line

  const mapRef = useRef<MapView>(null);

  const handleGeolocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setLocationLoaded(true);
        fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=25000&type=store&key=${GOOGLE_MAPS_APIKEY}`
        )
          .then(response => response.json())
          .then(data => {
            const stores = data.results.map((store: Store) => ({
              coordinate: {
                latitude: store.geometry.location.lat,
                longitude: store.geometry.location.lng,
              },
              title: store.name,
              rating: store.rating,
            }));
            setMarkers(stores);
          })
          .catch(error => console.log(error));

        mapRef.current?.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }, 1000);
      },
      (error) => {
        console.log(error.code, error.message, 'error');
      }
    );
  };

  useEffect(() => {
    handleGeolocation();
    Animated.timing(
      fadeAnim,
      {
        toValue: 0,
        duration: 5000,
        useNativeDriver: true,
      }
    ).start(() => setShowOverlay(false)); // <-- Added this line
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
            ref={mapRef}
            customMapStyle={customMapStyle}
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={`${marker.title} - ${marker.rating} estrellas`}
              anchor={{ x: 0.5, y: 0.5 }}
              onCalloutPress={() => navigation.navigate('Details', { marker })}
            >
              <Image
                source={require('../icons/placeholder.png')}
                style={{height: 20, width: 50, resizeMode: 'contain'}}
              />
            </Marker>
          ))}
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          >
            <Image
              source={require('../icons/pin-map.png')}
              style={{height: 48, width: 48}}
            />
          </Marker>
        </MapView>
        {showOverlay && (  // <-- Added this line
          <Animated.View style={[styles.overlay, {opacity: fadeAnim}]}>
            <View style={styles.overlay2}>
              <Text style={styles.welcomeText}>¡Hola User! ¿Que te tienta hoy?</Text>
              <Image
                source={require('../icons/panda2.png')}
                style={{height: 500, width: 450}}
              />
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 5,
  },
  map: {
    flex: 1,
  },
  overlay2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay1: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 50,
    padding:40,
    marginTop: 100,
    fontWeight: 'bold'
  },
});

export default MapScreen;
