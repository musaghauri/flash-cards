import React, { useState, useEffect } from 'react';
import _forOwn from 'lodash/forOwn'
import { Text, SafeAreaView } from 'react-native';
import PressableButton from './PressableButton';
import { getDeck } from '../utils/api';


function DetailsScreen({ route, navigation }) {
  const [deck, setDeck] = useState({});
  const { id } = route.params
  const loadDeck = async () => {
    let fetchedDeck = await getDeck(id);
    setDeck(fetchedDeck);
  }

  useEffect(() => {
    loadDeck();
  }, []);

  useEffect(() => {
    // Interval to update count

    // Subscribe for the focus Listener
    const unsubscribe = navigation.addListener('focus', () => {
      loadDeck();
    });

    return () => {
      // Unsubscribe for the focus Listener
      unsubscribe;
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{deck.title}</Text>
      <Text>{deck?.questions?.length} Cards</Text>
      <PressableButton
        onPress={() => navigation.navigate("AddCard", { title: deck.title })}
        title='Add Card'
      />
      <PressableButton
        disabled={!deck?.questions?.length}
        onPress={() => navigation.navigate("StartQuiz", { title: deck.title })}
        title='Start Quiz'
        bgColor="black"
        color="white"
      />
    </SafeAreaView>
  );
}

export default DetailsScreen;