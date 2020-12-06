import React, { useState } from 'react';
import _forOwn from 'lodash/forOwn'
import { View, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import styled from "styled-components/native";
import PressableButton from './PressableButton';
import { addCardToDeck } from '../utils/api';

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

function AddCardScreen({ route, navigation }) {
  const { title } = route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const addCard = async () => {
    await addCardToDeck(title, { question, answer });
    navigation.goBack()
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Title>Add Card to {title}</Title>
            <TextField value={question} onChangeText={text => setQuestion(text)} placeholder="Card Question" />
            <TextField value={answer} onChangeText={text => setAnswer(text)} placeholder="Card Answer" />
            <View>
              <PressableButton
                onPress={addCard}
                title='Submit'
                bgColor="black"
                color="white"
                disabled={!question || !answer}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
}

export default AddCardScreen;