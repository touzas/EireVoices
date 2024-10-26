import { View, Text, TextInput, StyleSheet,TouchableOpacity,Dimensions } from 'react-native'
import Keyboard from './components/keyboard'
import React from 'react';
import * as Speech from 'expo-speech';
import UkFlag from './assets/UkFlag'
import SpainFlag from './assets/SpainFlag'

export default function App() {
  const [log, SetAppLog] = React.useState();
  const [name, SetName] = React.useState();
  const [text, SetText] = React.useState('');
  const [currentLanguage, SetCurrentLanguage] = React.useState('es');
  const [isUppercase, SetUppercase] = React.useState(true);

  const [isPortrait, setOrientation] = React.useState(
    Dimensions.get('window').height > Dimensions.get('window').width
      ? true
      : false
  );

  const handleLayoutChange = () => {
    const { height, width } = Dimensions.get('window');
    setOrientation(height > width ? true : false);
  };
  React.useEffect(() => {
    async function fetchAllVoices() {
      const voices = await Speech.getAvailableVoicesAsync();
      console.log("List of available voices");
      if (voices.length > 0){
        voices.map(voice => {
          SetAppLog(voice.name);
        });
      }
      
    }
    fetchAllVoices();
  }, []); 

  const writeText = (val) => {
    if (val == '<<'){
      SetText(text.slice(0, -1));
    }
    else if (val === 'Mayúsculas' || val === 'May'){
      SetUppercase(!isUppercase);
    }
    else if (val == 'Clear'){
      SetText('');
    }
    else{
      const keyPressed = (isUppercase) ? val.toLocaleUpperCase() : val.toLocaleLowerCase();
      SetText(text + keyPressed);
    }
  }

  const playAudio = (language) => {
    let options = {
      language: language,
      pich: 1.5,
      rate: 1
    };
    SetAppLog(language + ' Play:' + text);
    Speech.speak(text, options);
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <TextInput 
          multiline={true}
          underlineColorAndroid='transparent'
          onLayout={handleLayoutChange}
          style={isPortrait ? styles.inputContainer : styles.inputContainerLandScape}
          placeholder='Escribe lo que quieras decir, en inglés o en castellano'
          placeholderTextColor="gray"         
          numberOfLines={isPortrait ? 8 : 2 }
          value={text}
          showSoftInputOnFocus={false}
        />
      </View>
      <View style={styles.keyboard}>
        <Keyboard onPress={text => writeText(text)} isUppercase={isUppercase} isPortrait={isPortrait} />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.buttonPlay}
          onPress={() => playAudio('es-ES')}
        >
          <SpainFlag width={18} height={18}/>
          <Text style={{color: 'white'}}>Castellano</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.buttonPlay}
          onPress={() => playAudio('en-US')}
        >
          <UkFlag width={18} height={18}/>
          <Text style={{color: 'white'}}>English</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 25,
    flexDirection: 'col'
  },
  inputContainer: {
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    fontSize: 50,
    marginRight: 10,
    marginLeft: 10,
  },
  inputContainerLandScape: {
    borderRadius: 5,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    padding: 3,
    fontSize: 30,
    margin:1
  },
  keyboard: {
    flex:5,
    margin: 1,
  },
  buttons:{
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonPlay: {
    flex: 1,
    flexDirection: 'row',
    color: 'white',
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 1.5,
    padding: 10,
    borderColor: 'black',
    borderWidth: 2
  },
});
