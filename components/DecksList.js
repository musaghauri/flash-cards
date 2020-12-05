import React, { useState, useEffect } from 'react';
import _forOwn from 'lodash/forOwn'
import { SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styled from "styled-components/native";
import { getDecks } from '../utils/api';


const Container = styled.View`
	background: #fff;
	height: auto;
	width: 100%;
  border-radius: 14px;
  margin: 10px 0px;
  padding: 10px 0px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;


const Content = styled.View`
	flex-direction: column;
	align-items: center;
	height: auto;
`;

const Title = styled.Text`
	color: #3c4560;
	font-size: 20px;
	font-weight: 600;
`;

const PriceCaption = styled.Text`
	color: #b8b3c3;
	font-size: 15px;
	font-weight: 600;
	margin-top: 4px;
`;


const Card = (deck) => {
    const navigation = useNavigation();
    return <TouchableOpacity onPress={() => navigation.navigate('Details', { id: deck.title })}>
      <Container>
        <Content>
          <Title>{deck.title}</Title>
          <PriceCaption>{deck.questions.length} cards</PriceCaption>
        </Content>
      </Container>
    </TouchableOpacity>
  };
  
  
  
  function DecksListScreen({ navigation }) {
    const [decks, setDecks] = useState({});
    const loadDecks = async () => {
      let fetchedDecks = await getDecks();
      fetchedDecks = JSON.parse(fetchedDecks);
      setDecks(fetchedDecks);
    }
  
    useEffect(() => {
      loadDecks();
    }, [])
  
    useEffect(() => {
      // Interval to update count
  
      // Subscribe for the focus Listener
      const unsubscribe = navigation.addListener('focus', () => {
        loadDecks();
      });
  
      return () => {
        // Unsubscribe for the focus Listener
        unsubscribe;
      };
    }, [navigation]);
  
    const DECKS = [];
    _forOwn(decks, (val, key) => {
      DECKS.push(<Card key={`deck_${key}`} {...val} />)
    });
  
    return (
      <SafeAreaView>
        <ScrollView>
          {DECKS}
        </ScrollView>
      </SafeAreaView>
    );
  }

  export default DecksListScreen