import React from 'react';
import styled from 'styled-components/native';
const ButtonContainer = styled.TouchableOpacity`
  margin-vertical: 5px;
  width: 120px;
  height: auto;
  padding: 12px;
  border-radius: 10px;
  background-color: ${props => props.bgColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 3px;
`;
const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: ${props => props.color};
`;
const PressableButton = ({ onPress, bgColor = "white", color = "black", borderColor = "black", title }) => (
  <ButtonContainer onPress={onPress} bgColor={bgColor} borderColor={borderColor}>
    <ButtonText color={color}>{title}</ButtonText>
  </ButtonContainer>
);
export default PressableButton;