import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BasicKeys as Keys } from './keys'
import AntDesign from '@expo/vector-icons/AntDesign';

export const Keyboard = ({ onPress, isUppercase }) => {
  const renderKeysByFile = (index) => {
    return Keys.filter((k) => k.line == index).map((k) => {
      let text = (isUppercase) 
        ? k.value.toLocaleUpperCase() 
        : k.value.toLocaleLowerCase();
        
      if (k.hasOwnProperty('specialKey')){
        switch(k.specialKey){
          case 'BackSpace':
            text = <AntDesign name="arrowleft" size={18} color="black" />;
            break;
          case 'CapsLock':
            text = (isUppercase) ? 
              <AntDesign name="caretdown" size={18} color="black" /> 
              : 
              <AntDesign name="caretup" size={18} color="white" />;
            break;
          case 'Clear':
            text = <AntDesign name="closecircleo" size={18} color="black" />;
            break;
        }
      }

      return (
        <TouchableOpacity
          style={[styles.key, k.style && styles[k.style]]}
          onPress={() => onPress(k.value)}
          delayPressOut={0}
          delayPressIn={0}>
          <Text style={k.styleText && styles[k.styleText]}>{text}</Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.keyboardContainer}>
      <View style={styles.keyRow}>{renderKeysByFile(1)}</View>
      <View style={styles.keyRow}>{renderKeysByFile(2)}</View>
      <View style={styles.keyRow}>{renderKeysByFile(3)}</View>
      <View style={styles.keyRow}>{renderKeysByFile(4)}</View>
      <View style={styles.keyRow}>{renderKeysByFile(5)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#eaeaea',
    marginTop: 5,
    padding: 3,
  },
  keyRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  key: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 3,
    padding: 5,
  },
  backspace: {
    flex: 3,
    backgroundColor: 'darkgrey',
  },
  uppercase: {
    flex: 2,
    backgroundColor: 'darkgrey',
  },
  clear: {
    flex: 2,
    backgroundColor: 'darkgrey',
  },
  space: {
    alignSelf: 'stretch',
    flex: 10,
  },
  textWhite: {
    color: 'white',
  },
});

export default Keyboard;
