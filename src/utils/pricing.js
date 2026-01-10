const BASE_PRICE_PER_USER = 100;

const PARTNER_TYPE_MULTIPLIER = {
  0: 1,   // DEFAULT
  1: 1.2, // HRMS
  2: 1.5, // ATS
  3: 1.8, // BOTH
  4: 1.3, // TICKETING
  5: 1.4, // BOOKING
};

export const calculatePricing = ({
  totalUsersAllowed = 0,
  partnerType,
  candidatePool,
  internPool,
  assessmentGenerator,
}) => {
  if (!totalUsersAllowed || partnerType === undefined) return "";

  let amount =
    totalUsersAllowed *
    BASE_PRICE_PER_USER *
    (PARTNER_TYPE_MULTIPLIER[partnerType] || 1);

  if (candidatePool === "Yes") amount += 2000;
  if (internPool === "Yes") amount += 1000;
  if (assessmentGenerator === "Yes") amount += 3000;

  return Math.round(amount);
};
