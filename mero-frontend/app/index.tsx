import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {Text, View, StyleSheet, TextInput, Button} from 'react-native';
import { Link, router } from 'expo-router';
import axios from 'axios';
import baseUrl from '../constants/Constants'
import { storeData } from './storage';



const Login = () => {
    const [username, setUsername] = useState('')

    const getUser = () => {
        axios.get(`${baseUrl.baseUrl}/users/${username}`)
                    .then((response) => {
                        storeData('user',response.data)
                }).catch((err) => {
                    console.log(`Error: ${err.message}`)
                });
    }

    return (
        <View
            style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text style={styles.loginText}>Login</Text>
            <Text style={styles.usernameLabel}>Username:</Text>
            <TextInput style={styles.usernameInput}
                onChangeText={setUsername}></TextInput>
            <Button title="Login"
                onPress={() => {
                getUser()
                router.push(`/salons`)}}/>
        <StatusBar style='dark'/>
        </View>
    );
};

const styles = StyleSheet.create({
    loginText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 3,
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

export default Login;