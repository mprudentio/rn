import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import MapView, { Marker,Callout } from 'react-native-maps';

export default function DetailScreen({ route }) {
  const { user } = route.params;
  const lat = parseFloat(user.address.geo.lat)
  const long = parseFloat(user.address.geo.lng)

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        region={{
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }}>
        <Marker coordinate={{latitude:lat, longitude:long}} >
            <Callout>
                <Text>{user.name}</Text>
            </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },  
});
