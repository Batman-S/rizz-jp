import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Animated,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const scaleAnim = new Animated.Value(1);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9, // Slightly reduce size
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Return to original size
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={["#E0F7FF", "#FFFFFF"]} // Subtle gradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 0 }} // Blue fades into white sooner
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Animated.View
          style={[styles.button, { transform: [{ scale: scaleAnim }] }]}
        >
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={pickImage}
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.buttonText}>Upload</Text>
          </Pressable>
        </Animated.View>
        {image && (
          <>
            <Image source={{ uri: image }} style={styles.image} />
            <Pressable
              onPress={() => router.push("/responses")}
              style={[styles.button, styles.navigateButton]}
            >
              <Text style={styles.buttonText}>Go to Responses</Text>
            </Pressable>
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: 200, // Increased size
    height: 200,
    backgroundColor: "#ADD8E6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30, // Rounded corners
    marginBottom: 20,
    shadowColor: "#000", // Shadow effect
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10, // For Android shadow
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
    borderRadius: 10,
  },
  navigateButton: {
    width: 200,
    height: 50,
    backgroundColor: "#ADD8E6",
    borderRadius: 10,
  },
});
