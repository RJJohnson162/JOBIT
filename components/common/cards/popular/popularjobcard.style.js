import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../../constants";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
    margin: "5px",
  }),
  logoContainer: (selectedJob, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: SIZES.large,
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  // nearbyjobs.style.js and popularjobs.style.js should include:
  headerRight: {
    flexDirection: "row",
    gap: SIZES.medium,
  },
  refreshButton: {
    paddingHorizontal: SIZES.small,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.medium,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SIZES.small,
  },
  retryButton: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  noJobsText: {
    color: COLORS.gray,
    textAlign: "center",
    marginTop: SIZES.medium,
  },
});

export default styles;
