import React from 'react';
import {StyleSheet, View, Modal, Text, Button} from 'react-native';

const GeofenceModal = ({
  visible,
  children,
  toggleOverlay,
  header,
  subHeader,
  buttonText,
  buttonClick,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={toggleOverlay}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {header ? <Text style={styles.header}>{header}</Text> : null}
          {subHeader ? <Text style={styles.subHeader}>{subHeader}</Text> : null}
          <View style={{paddingVertical: 10}}>{children}</View>

          {buttonText && <Button title={buttonText} onPress={buttonClick} />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  header: {
    fontSize: 20,
    lineHeight: 26,
    fontFamily: '700',
    textAlign: 'center',
  },
  subHeader: {
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default GeofenceModal;
