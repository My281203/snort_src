import React, { useState } from 'react';
import { KeyboardAvoidingView, Keyboard, View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';

const NewScreen = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmiStatus, setBMIStatus] = useState('');
  const [bmi, setBMI] = useState('');
  const [weightError, setWeightError] = useState(false);
  const [heightError, setHeightError] = useState(false);

  const onCalculate = () => {
    const weightVal = parseFloat(weight);
    const heightVal = parseFloat(height);

    if (isNaN(weightVal) || isNaN(heightVal) || weightVal <= 0 || heightVal <= 0) {
      Alert.alert('Please enter valid weight and height.');
      return;
    }

    const calculatedBMI = (weightVal / ((heightVal / 100) * (heightVal / 100))).toFixed(2);

    setBMI(calculatedBMI);
    setBMIStatus(calculateBMIStatus(parseFloat(calculatedBMI))); // Chuyển đổi calculatedBMI sang kiểu number
    Alert.alert(`Your BMI is: ${calculatedBMI}`);
  }

  const calculateBMIStatus = (bmi:number) => {
    if (bmi > 32) return 'Obese';
    if (bmi > 25) return 'Over Weight';
    if (bmi > 18.5) return 'Normal Weight';
    return 'Under Weight';
  }

  const handleWeightChange = (text:string) => {
    setWeight(text);
    const weightVal = parseFloat(text);
    if (isNaN(weightVal) || weightVal <= 0) {
      setWeightError(true);
    } else {
      setWeightError(false);
    }
  };

  const handleHeightChange = (text:string) => {
    setHeight(text);
    const heightVal = parseFloat(text);
    if (isNaN(heightVal) || heightVal <= 0) {
      setHeightError(true);
    } else {
      setHeightError(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <View style={styles.topView}>
            <Text style={styles.title}>Weight (KG)</Text>
            <TextInput style={[styles.input, weightError && styles.inputError]}
              placeholder="0"
              keyboardType='numeric'
              value={weight}
              onChangeText={handleWeightChange}
            />
            {weightError && <Text style={styles.errorText}>Invalid weight. Please enter a valid weight.</Text>}
          </View>
          <View style={styles.bottomView}>
            <Text style={styles.title}>Height (CM)</Text>
            <TextInput style={[styles.input, heightError && styles.inputError]}
              placeholder="0"
              keyboardType='numeric'
              value={height}
              onChangeText={handleHeightChange}
            />
            {heightError && <Text style={styles.errorText}>Invalid height. Please enter a valid height.</Text>}
          </View>
          <View style={styles.contentView}>
            <Text style={styles.text}>BMI: {bmi}</Text>
            <Text style={styles.text}>Status: {bmiStatus}</Text>
            <TouchableOpacity onPress={onCalculate}>
              <Text style={styles.bottomTextBox}>Compute</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contentView: {
    alignItems: 'center',
  },
  topView: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  bottomView: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    fontSize: 20,
    padding: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  bottomTextBox: {
    backgroundColor: 'lightblue',
    padding: 20,
    fontSize: 30,
    fontWeight: 'bold',
    borderWidth: 1,
  },
});

export default NewScreen;
