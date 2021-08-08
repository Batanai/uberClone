import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import {selectTravelTimeInformation} from '../slices/navSlice';

const data = [
  {
    id: 'uber-x-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'uber-xl-456',
    title: 'Uber XL',
    multiplier: 1.25,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'uber-lux-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation = useSelector(selectTravelTimeInformation);

  const SURGE_CHARGE_RATE = 12;

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('navigateCard')}
          style={tw`absolute top-3 left-5 z-50 p-3 rounded-full`}>
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, multiplier, image}, item}) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-10 h-20
            ${id === selected?.id && 'bg-gray-200'}`}>
            <Image
              style={{height: 100, width: 100, resizeMode: 'contain'}}
              source={{uri: image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text} travel time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-gb', {
                style: 'currency',
                currency: 'ZAR',
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100,
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-200'}`}>
          <Text
            style={tw`text-center text-xl ${
              !selected ? 'text-black' : 'text-white'
            }`}>
            {selected?.title} Let's go
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});
