import { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Modal, ScrollView} from 'react-native';
import { getData } from '../storage';
import axios from 'axios';
import baseUrl from '../../constants/Constants'
import { Rating } from 'react-native-ratings';
import { RatingInterface, UserRating } from '../../interfaces/interfaces';
import { router, useLocalSearchParams } from 'expo-router';
import { Divider, Input, Button } from '@rneui/themed';
import StarRating from 'react-native-star-rating-widget';



const RatingPage = () => {
    const local = useLocalSearchParams();

  const [user, setUser] = useState({
      id: 0,
      full_name: '',
      username: ''
  })
  const [ratingStars, setRatingStars] = useState('0')
  const [ratingText, setRatingText] = useState('')
  const [ratings, setRatings] = useState<RatingInterface[]>([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setState = async () => {
    const user = await getData('user');
    setUser(user);
    axios.get(`${baseUrl.baseUrl}/salons/${local.salonId}/review`, 
        {headers:{'userId': user.id}})
        .then((response) => {
            setRatingStars(response.data.stars)
            setRatingText(response.data.text)
        }).catch((err) => {
            console.log(err)
        })
    axios.get(`${baseUrl.baseUrl}/salons/${local.salonId}/reviews`)
        .then((response) => {
            setRatings(response.data)
    }).catch((err) => {
        console.log(`Error: ${err.message}`)
    });    
  };

  const onClickSave = () => {
    axios.post(`${baseUrl.baseUrl}/salons/${local.salonId}/reviews`, {
        stars: ratingStars,
        text: ratingText
    }, {headers:{'userId': user.id}})
        .then((response) => {
            setModalContent(response.data.message)
            toggleModal();
        }).catch((err) => {
            setModalContent(err.data.message)
            toggleModal();
        })
    
    
  }

  const onClickBack = () => {
    router.back()
  }

  useEffect(() => {
    setState()
  }, []);

  return (
    <View
      style={{
        flex: 1
      }}>
      <Modal animationType="slide"
        transparent={true}
        visible={isModalVisible}>
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <Button title="Okay" onPress={toggleModal}/>
          </View>
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Button style={styles.backButton}  title="Back" type="outline"
        onPress={onClickBack}></Button>
        <Button style={styles.saveButton} title="Save" type="outline"
        onPress={onClickSave}></Button>
      </View>
      <Text style={styles.header}>Rate and review</Text>
      <Text style={styles.underLabel}>Share your experience to help others</Text>
      <StarRating 
      rating={parseInt(ratingStars)}
      onChange={(rating: number) => {
        setRatingStars(rating.toString())
      }}
      enableHalfStar={false}
      style={styles.rating}
      />
      <Input
      placeholder='Add more details on your experience'
      value={ratingText}
      onChangeText={setRatingText}/>
      <Divider inset={true} insetType="middle" width={2}/>
      <Text style={styles.header}>Latest reviews</Text>
      <ScrollView>
      {ratings.map((rating) => {
        return (
          <View key={rating.id}>
          <Divider style={{marginTop: 10}}/>
          <Text style={styles.ratingsName}>{rating.user.full_name}</Text>
          <StarRating rating={parseInt(rating.stars)} onChange={() => {}}
          starSize={20} style={styles.ratingsStars}/>
          <Text style={styles.ratingsText}>{rating.text}</Text>
          </View>
        )
      })
      }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10
    },
    underLabel: {
        fontSize: 13,
        color: '#708090',
        marginLeft: 10
    },
    rating: {
        marginRight:50
    },
    ratingsName: {
        marginTop:10,
        marginLeft:10,
        fontSize: 15,
        fontWeight: '400'
    },
    ratingsStars: {
        marginLeft:5,
    },
    ratingsText: {
        fontSize:13,
        marginLeft:10,
        fontWeight: '300'
    },
    saveButton: {
        width: 60, 
        // alignSelf: 'flex-end',
        marginRight: 1,
        height: 35
    },
    backButton: {
        width: 60,
        merginLeft: 1,
        height: 35,
        // alignSelf: 'flex-start'
    },
    headerContainer: {
        justifyContent: 'space-between',
        padding: 8,
        flexDirection:'row'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
  });

export default RatingPage;