import React, { useState } from 'react';
import _forOwn from 'lodash/forOwn'
import { View, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';

import styled from "styled-components/native";
import PressableButton from './PressableButton';
import { saveDeckTitle } from '../utils/api';

const Title = styled.Text`
  font-size: 18px
`;
  
const TextField = styled.TextInput`
  height: 40px;
  border-color: #000000;
  border-width: 1px;
  width: 100%;
  border-radius: 3px;
  margin: 12px 0;
`;

function AddDeckScreen({ navigation }) {
    const [deckName, setDeckName] = useState('');
  
    const addDeck = async () => {
      await saveDeckTitle(deckName);
      setDeckName('');
      navigation.navigate('Details', { id: deckName })
    }
    
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Title>What is the title of your new Deck?</Title>
              <TextField value={deckName} onChangeText={text => setDeckName(text)} placeholder="Deck Title" />
              <View>
                <PressableButton
                  onPress={addDeck}
                  title='Submit'
                  bgColor="black"
                  color="white"
                  disabled={!deckName}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }

  export default AddDeckScreen;