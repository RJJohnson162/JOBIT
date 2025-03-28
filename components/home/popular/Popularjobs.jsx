import { useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./popularjobs.style";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import useFetch from "../../../hook/useFetch";

const Popularjobs = () => {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const { data, isLoading, error, refetch } = useFetch("search", {
    query: "React developer",
    num_pages: "1",
    page: "1",
  });

  const displayedJobs = showAll ? data : (data || []).slice(0, 5);
  const hasPagination = (data?.length || 0) > 5;
  const isRateLimited = error?.response?.status === 429;

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
        <View style={styles.headerRight}>
          {hasPagination && !isRateLimited && (
            <TouchableOpacity onPress={() => setShowAll((prev) => !prev)}>
              <Text style={styles.headerBtn}>
                {showAll ? "Show Less" : "Show All"}
              </Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={refetch}
            style={styles.refreshButton}
            disabled={isLoading || isRateLimited}
          >
            <Text
              style={[
                styles.headerBtn,
                (isLoading || isRateLimited) && styles.disabledBtn,
              ]}
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : isRateLimited ? (
          <View style={styles.rateLimitContainer}>
            <Text style={styles.rateLimitText}>
              API limit reached. Please wait a minute before retrying.
            </Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error.message.includes("Network Error")
                ? "Network error. Check your connection."
                : error.message}
            </Text>
            <TouchableOpacity onPress={refetch} style={styles.retryButton}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : !data?.length ? (
          <Text style={styles.noJobsText}>No jobs found</Text>
        ) : (
          <FlatList
            data={displayedJobs}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={handleCardPress}
              />
            )}
            keyExtractor={(item) => `popular-job-${item.job_id}`}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
