import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList,
  Animated,
  ViewToken,
} from "react-native";
import React, { useState, useRef } from "react";
import { router } from "expo-router";
import { BlurView } from "expo-blur";

const { width, height } = Dimensions.get("window");

interface OnboardingItem {
  title: string;
  description: string;
  image: any;
}

const onboardingData: OnboardingItem[] = [
  {
    title: "Track Your Expenses",
    description:
      "Easily manage and track your daily expenses with our intuitive interface",
    image: require("@/assets/images/onboarding-1.png"),
  },
  {
    title: "Set Financial Goals",
    description:
      "Create and monitor your financial goals to achieve better money management",
    image: require("@/assets/images/onboarding-2.png"),
  },
  {
    title: "Smart Analytics",
    description:
      "Get insights into your spending habits with detailed analytics and reports",
    image: require("@/assets/images/onboarding-3.png"),
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<OnboardingItem>>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        });
      }
    } else {
      router.replace("/(root)/(auth)/sign-in");
    }
  };

  const handleSkip = () => {
    router.replace("/(root)/(auth)/sign-in");
  };

  const renderItem = ({ item }: { item: OnboardingItem }) => (
    <View style={{ width, height }}>
      <Image
        source={item.image}
        style={{ width: "100%", height: "60%", resizeMode: "contain" }}
      />
      <BlurView intensity={20} tint="dark" style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 24, paddingTop: 24 }}>
          <Text
            style={{
              fontSize: 28,
              fontFamily: "Rubik-Bold",
              color: "white",
              marginBottom: 16,
            }}
          >
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Rubik-Medium",
              color: "#D1D5DB",
              lineHeight: 24,
            }}
          >
            {item.description}
          </Text>
        </View>
      </BlurView>
    </View>
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  return (
    <View className="flex-1 bg-[#081657]">
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />

      <View className="flex-row justify-center my-4">
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.6, 1, 0.6],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={{
                height: 6,
                width: 6,
                borderRadius: 3,
                backgroundColor: "#3B82F6",
                marginHorizontal: 4,
                transform: [{ scale }],
                opacity,
              }}
            />
          );
        })}
      </View>

      <View className="flex-row justify-between items-center px-6 pb-8">
        <TouchableOpacity onPress={handleSkip} className="px-6 py-3">
          <Text className="text-primary-brighterBlue font-rubik-medium text-base">
            Skip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNext}
          className="bg-primary-brighterBlue px-8 py-3 rounded-full"
        >
          <Text className="text-white font-medium transition-all duration-300 ease-in-out text-base">
            {currentIndex === onboardingData.length - 1
              ? "Get Started"
              : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
