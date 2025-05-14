import { useState, useEffect } from "react";
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
    query: "Software Developer",
    num_pages: "1",
    page: "1",
    country: "US",
    employment_types: "FULLTIME",
  });

  const filteredJobs = (data || []).filter(
    (job) => job.job_title && /software|developer|engineer/i.test(job.job_title)
  );

  const displayedJobs = showAll ? filteredJobs : filteredJobs.slice(0, 5);
  const canShowMore = filteredJobs.length > 5;

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular US Jobs</Text>
        <TouchableOpacity onPress={refetch} disabled={isLoading}>
          <Text style={[styles.headerBtn, isLoading && styles.disabledBtn]}>
            {isLoading ? "Refreshing..." : "Refresh"}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading && !data?.length ? (
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
        ) : filteredJobs.length === 0 ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No matching jobs found</Text>
            <Text style={styles.subText}>Try different search criteria</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={displayedJobs}
              renderItem={({ item }) => (
                <PopularJobCard
                  item={item}
                  selectedJob={selectedJob}
                  handleCardPress={handleCardPress}
                />
              )}
              keyExtractor={(item) => item.job_id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
            {canShowMore && (
              <TouchableOpacity
                onPress={() => setShowAll(!showAll)}
                style={styles.showMoreBtn}
              >
                <Text style={styles.headerBtn}>
                  {showAll ? "Show Less" : `Show All (${filteredJobs.length})`}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
