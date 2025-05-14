import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./nearbyjobs.style";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
  const router = useRouter();
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "Software Developer OR Engineer OR Programmer",
    num_pages: "6",
    page: "1",
    country: "KE",
    location: "Kenya",
  });

  const kenyaJobs = (data || []).filter((job) => {
    const isKenya =
      job.job_country?.toLowerCase().includes("kenya") ||
      job.job_location?.toLowerCase().includes("kenya") ||
      job.job_country_code === "KE";

    const isTechJob =
      job.job_title &&
      /software|developer|engineer|programmer|tech|IT/i.test(job.job_title);

    return isKenya && isTechJob;
  });

  const displayedJobs = showAll ? kenyaJobs : kenyaJobs.slice(0, 5);
  const canShowAll = kenyaJobs.length > 5;

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Kenya Tech Jobs ({kenyaJobs.length})
        </Text>
        <TouchableOpacity onPress={refetch} disabled={isLoading}>
          <Text style={[styles.headerBtn, isLoading && styles.disabledBtn]}>
            {isLoading ? "Refreshing..." : "Refresh"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error.message.includes("Invalid API")
                ? "Server returned unexpected data"
                : error.message}
            </Text>
            <TouchableOpacity onPress={refetch} style={styles.retryButton}>
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : kenyaJobs.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No tech jobs found in Kenya</Text>
            <Text style={styles.subText}>
              Try adjusting your search criteria
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={displayedJobs}
              renderItem={({ item }) => (
                <NearbyJobCard
                  job={item}
                  handleNavigate={() => handleCardPress(item)}
                />
              )}
              keyExtractor={(item) => item.job_id || Math.random().toString()} // Fallback for missing IDs
              contentContainerStyle={{ rowGap: SIZES.medium }}
              showsVerticalScrollIndicator={false}
            />
            {canShowAll && (
              <TouchableOpacity
                onPress={() => setShowAll(!showAll)}
                style={styles.showAllButton}
              >
                <Text style={styles.showAllText}>
                  {showAll ? "Show Less" : `Show All ${kenyaJobs.length} Jobs`}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
