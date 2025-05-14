import { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
            height: 80, // Increased header height
          },
          headerShadowVisible: false,
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>
                <Text style={styles.jobText}>JOB</Text>
                <Text style={styles.itText}>IT</Text>
              </Text>
              <View style={styles.underline} />
            </View>
          ),
          headerTitleAlign: "center",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  jobText: {
    color: COLORS.primary,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  itText: {
    color: "#Ffa500",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  underline: {
    height: 4,
    width: "80%",
    backgroundColor: COLORS.orange,
    borderRadius: 2,
    marginTop: 5,
    opacity: 0.7,
  },
  container: {
    flex: 1,
    padding: SIZES.medium,
  },
};

export default Home;
