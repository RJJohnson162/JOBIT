import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./nearbyjobcard.style";

const FALLBACK_LOGO =
  "https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg";

const NearbyJobCard = ({ job, handleNavigate }) => {
  const logoSource = job?.employer_logo
    ? { uri: job.employer_logo }
    : { uri: FALLBACK_LOGO };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleNavigate}
      activeOpacity={0.7}
    >
      <TouchableOpacity style={styles.logoContainer}>
        <Image
          source={logoSource}
          resizeMode="contain"
          style={styles.logImage}
          defaultSource={{ uri: FALLBACK_LOGO }}
          onError={() => {
            // Fallback is already handled by defaultSource
          }}
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.jobName} numberOfLines={1}>
          {job?.job_title || "Unknown Position"}
        </Text>
        <Text style={styles.jobType}>
          {job?.job_employment_type || "Unknown Type"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NearbyJobCard;
