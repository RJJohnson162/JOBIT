import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const softwareJobTypes = [
  // Core Development Roles
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full-stack Developer",
  "Mobile Developer",

  // Specialized Roles
  "DevOps Engineer",
  "QA Engineer",
  "Security Engineer",
  "Cloud Engineer",

  // Data & AI
  "Data Engineer",
  "ML Engineer",

  // Technologies
  "React Developer",
  "Node.js Developer",
  "Python Developer",
  "Java Developer",

  // Work Arrangements
  "Remote Developer",
  "Hybrid Developer",
];

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Software Engineer");

  const handleSoftwareFilter = (item) => {
    setActiveJobType(item);

    // Generate search terms based on job type
    let searchTerms = [item];

    // Add related terms for better filtering
    if (item.includes("Frontend")) {
      searchTerms.push("JavaScript", "React", "Angular", "Vue");
    } else if (item.includes("Backend")) {
      searchTerms.push("API", "Server", "Database");
    } else if (item.includes("Mobile")) {
      searchTerms.push("iOS", "Android", "Flutter", "React Native");
    }

    handleClick(searchTerms.join(" "));
    router.push(`/search/${encodeURIComponent(item.toLowerCase())}`);
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Developer</Text>
        <Text style={styles.welcomeMessage}>
          Find your perfect software role
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder="Search software jobs..."
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={styles.searchBtn}
          onPress={() => handleSoftwareFilter(activeJobType)}
        >
          <Image
            source={icons.search}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={softwareJobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => handleSoftwareFilter(item)}
            >
              <Text
                style={styles.tabText(activeJobType, item)}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Welcome;
