import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import NavOptions from '../components/NavOptions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAP_APIKEY} from '@env';
import {useDispatch} from 'react-redux';
import {setDestination, setOrigin} from '../slices/navSlice';
import NavFavorites from '../components/NavFavorites';

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{height: 100, width: 100, resizeMode: 'contain'}}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
      </View>

      <GooglePlacesAutocomplete
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            fontSize: 18,
          },
        }}
        onPress={(data, details = null) => {
          dispatch(
            setOrigin({
              location: details?.geometry.location,
              description: data.description,
            }),
          );

          dispatch(setDestination(null));
        }}
        fetchDetails={true}
        returnKeyType={'search'}
        enablePoweredByContainer={false}
        debounce={400}
        placeholder="Where from?"
        nearbyPlacesAPI="GooglePlacesSearch"
        minLength={2}
        query={{
          language: 'en',
          key: GOOGLE_MAP_APIKEY,
        }}
      />

      <NavOptions />
      <NavFavorites />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  autoCompleteContainer: {
    flex: 0,
  },
  autoCompleteText: {
    fontSize: 18,
  },
});
