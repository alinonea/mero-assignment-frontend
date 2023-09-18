import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {Text, View, StyleSheet, TextInput, Button, ScrollView} from 'react-native';
import { getData } from './storage';
import axios from 'axios';
import baseUrl from '../constants/Constants'
import { Card } from '@rneui/themed';
import { Salon } from '../interfaces/interfaces';
import { Link, router } from 'expo-router';



const SalonPage = () => {
  const [user, setUser] = useState({
      id: 0,
      full_name: '',
      username: ''
  })
  const [salons, setSalons] = useState<Salon[]>([])

  const readUserFromStorage = async () => {
    const user = await getData('user');
    setUser(user);
  };

  const getSalons = () => {
    axios.get(`${baseUrl.baseUrl}/salons/`)
                .then((response) => {
                    setSalons(response.data)
            }).catch((err) => {
                console.log(`Error: ${err.message}`)
            });
}

  useEffect(() => {
    readUserFromStorage();
    getSalons();
  }, []);


  return (
    <ScrollView
      style={{
        flex: 1
      }}>
      <Text style={styles.header}>Hello {user.full_name}, leave a review for one of our salons: </Text>
      {salons.map((salon) => {
        return (
          <Card key={salon.id}>
          <Card.Title>{salon.name}</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri: salon.image_link,
            }}
          />
          <Link
              href={`/rating/${salon.id}`}>
        
          </Link>
          <Button
            title="Rate it"
            onPress={() => {
              router.push(`/rating/${salon.id}`)
            }}
          />
        </Card>
        )
      })
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 12,
        fontWeight: 'bold',
        margin: 10,
    },
    usernameLabel: {
        fontSize: 20,
        marginBottom: 3,
    },
    usernameInput: {
        height: 40,
        width:120,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
      },
  });

export default SalonPage;