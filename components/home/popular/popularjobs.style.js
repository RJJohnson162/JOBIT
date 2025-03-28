import { StyleSheet } from "react-native";

import { FONT, SIZES, COLORS } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: SIZES.xLarge,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
  // nearbyjobs.style.js and popularjobs.style.js
  rateLimitContainer: {
    backgroundColor: COLORS.lightWhite,
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    alignItems: "center",
  },
  rateLimitText: {
    color: COLORS.warning,
    textAlign: "center",
  },
  disabledBtn: {
    opacity: 0.5,
  },
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.medium,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SIZES.small,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  noJobsText: {
    color: COLORS.gray,
    textAlign: "center",
    marginTop: SIZES.medium,
  },
});

export default styles;
