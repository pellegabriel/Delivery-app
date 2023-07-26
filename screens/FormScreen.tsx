import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../android/app/src/types/types';
import Geocoder from 'react-native-geocoding'; 
import {GOOGLE_MAPS_APIKEY} from '@env'

Geocoder.init(GOOGLE_MAPS_APIKEY); 

const FormScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Form'>) => {
  const handlePress = () => {
    navigation.navigate('Map');
  }

  

  
  return (
    <View style={styles.container1}>
    <View style={styles.containerImage}>
    <Image source={require('../icons/Teiki.png')} style={styles.imageRegister}/>
    </View >

    <View style={styles.container2}>
    <ImageBackground source={require('../icons/Fondo.png')} 
    style={styles.image}
    resizeMode="contain"
    >

    <View style={styles.container3}>


      <View >
      <Text style={styles.text}>Elige cómo quieres ingresar</Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Continuar con Google</Text>
        </TouchableOpacity>
        
      </View>

        <View style={styles.separatorContainer}>
      <View style={styles.separatorLine} />
      <Text style={styles.separatorText}>o</Text>
      <View style={styles.separatorLine} />
    </View>
    <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Continuar con Facebook</Text>
        </TouchableOpacity>
        </View>

    </ImageBackground>
    </View>

    </View>


  );
};

const styles = StyleSheet.create({
  imageRegister: {    
    position: 'absolute', // Posición absoluta
    top: 50, 
    left: 100,
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1, 
   },
  imageCompany: {
    marginLeft: 100,
    marginBottom: 50
  },
  containerImage: {
    marginTop: 50,
    marginBottom:100
  },
  text: {
    color: 'white',
    fontSize: 25, 
    padding: 10,
    marginBottom: 20

  },
  separatorContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  separatorText: {
    width: 20,
    textAlign: 'center',
    color: 'white',
  },
  container3: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',

    marginBottom: 100
  },  
  container2: {
    flex: 1,
    padding: 0,

    
  },
  container1: {
    flex: 1,


  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: 700,
    marginTop:120

  },
  input: {
    height: 40,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 10,
    color: 'black',
    backgroundColor: 'white'
  },
  button: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15
  },
  buttonAcount: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  buttonTextAcount: {
    color: 'white',
    fontSize: 16,
  },
});


export default FormScreen;
