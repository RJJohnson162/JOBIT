import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./popularjobcard.style";

const FALLBACK_LOGO =
  "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";

const PopularJobCard = ({ item, selectedJob, handleCardPress }) => {
  const logoSource = item?.employer_logo
    ? { uri: item.employer_logo }
    : { uri: FALLBACK_LOGO };

  return (
    <TouchableOpacity
      style={styles.container(selectedJob, item)}
      onPress={() => handleCardPress(item)}
      activeOpacity={0.7}
    >
      <TouchableOpacity style={styles.logoContainer(selectedJob, item)}>
        <Image
          source={logoSource}
          resizeMode="contain"
          style={styles.logoImage}
          defaultSource={{ uri: FALLBACK_LOGO }}
        />
      </TouchableOpacity>
      <Text style={styles.companyName} numberOfLines={1}>
        {item.employer_name || "Unknown Company"}
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.jobName(selectedJob, item)} numberOfLines={1}>
          {item.job_title || "Unknown Position"}
        </Text>
        <Text style={styles.location}>
          {item.job_country || "Unknown Location"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
