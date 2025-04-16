import React, { useState } from "react";
import { TouchableOpacity, Animated, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import VoiceModal from "./VoiceModal";

const VoiceButton: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View className="absolute bottom-24 right-8 z-50">
        <Animated.View
          className="w-14 h-14 rounded-full shadow-lg"
          style={{
            transform: [{ scale: scaleAnim }],
            backgroundColor: "#6BBFFF",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={() => setModalVisible(true)}
            className="w-full h-full justify-center items-center"
          >
            <MaterialIcons name="mic" size={24} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <VoiceModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default VoiceButton;
