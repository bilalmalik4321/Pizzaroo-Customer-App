import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";

function modalContent() {
  return (
    <Modal visible={modalVisible} animationType="slide">
      <View>
        <Button
          onPress={() => {
            setModalVisible(false);
          }}
          title="close"
        />
      </View>
    </Modal>
  );
}

export default modalContent;
