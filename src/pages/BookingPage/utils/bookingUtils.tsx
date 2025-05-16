
import { format } from "date-fns";
import { SuiteProps } from "@/utils/calculateRoomSelection";

export const handleBookNow = (
  selectedSuite: SuiteProps | null,
  startDate: Date | undefined,
  endDate: Date | undefined,
  adults: string,
  children: string
) => {
  const propertyCode = "Od3X7u";
  const baseUrl = `https://hotels.cloudbeds.com/reservation/${propertyCode}`;
  const params = new URLSearchParams();

  if (startDate) params.append("start_date", format(startDate, "yyyy-MM-dd"));
  if (endDate) params.append("end_date", format(endDate, "yyyy-MM-dd"));
  if (selectedSuite) params.append("room_id", selectedSuite.id);
  if (adults) params.append("adults", adults);
  if (children) params.append("children", children);

  params.append("lang", "en");
  const url = `${baseUrl}?${params.toString()}`;
  window.open(url, "_blank", "noopener");
};
