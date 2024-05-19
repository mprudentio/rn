import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
  
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setData(data);
        setError('');
      } catch (e) {
        setError(e.message);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
    const generateRandomUnsplashUrl = (id) => {
        const keywords = ['person', 'face', 'portrait', 'headshot','people','manusia','man','woman',"bapak","madre"];
        const keyword = keywords[id-1]
        return `https://source.unsplash.com/random/300x300/?${keyword}`;
      };

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        {error && <View><Text>{error}</Text></View>}
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Detail', { user: item })}>
                <View style={styles.itemContainer}>
                    <View>
                        <Image source={{uri: generateRandomUnsplashUrl(item.id)}} style={styles.image}/>
                        <View style={styles.nameContainer}>
                            <Text style={styles.name}>#{item.id} {item.name}</Text>
                            <Text style={styles.email}>{item.email} ({item.username})</Text>
                        </View>
                    </View>
                    <View style={styles.addressContainer}>
                        <View><Entypo name="home" size={24} color="white" style={{paddingLeft:20}} /></View>
                        <View  style={{paddingLeft:10}}>
                            <Text style={styles.address}>{item.address.street}, {item.address.city} City</Text>
                            <Text style={styles.address}>ZIP: {item.address.zipcode}</Text>
                            <Text style={styles.coordinate}>Coordinate: {item.address.geo.lng} , {item.address.geo.lat}</Text>
                        </View>
                    </View>
                </View>    
            </TouchableOpacity>
            
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F0F3E8',
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemContainer:{
        borderRadius:8,
        marginBottom:10, 
        marginTop:5
    },
    image:{
        width:300, 
        height:219,
        borderTopLeftRadius:8, 
        borderTopRightRadius:8
    },
    nameContainer:{
        borderWidth: 2, 
        borderLeftColor:"#6A9C59", 
        borderRightColor: "#6A9C59",
        borderTopColor:"#F0F3E8" ,
        borderBottomColor:"#6A9C59", 
    },
    name: {
      fontSize: 18,
      fontWeight:"bold",
      paddingLeft: 20,
      paddingTop:5,
    },
    email:{
        fontSize: 15,
        paddingLeft: 20,
        paddingBottom:5
    },
    addressContainer:{
        display:"flex", 
        flexDirection: "row",
        paddingTop:10, 
        backgroundColor: "#6A9C59", 
        borderBottomRightRadius: 8, 
        borderBottomLeftRadius:8
    },
    address:{
        color:"white"
    },
    coordinate:{
        color:"white",
        marginBottom:10
    }
  });