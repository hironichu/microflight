export const SeatStatus = {
  AVAILABLE: "Available",
  OCCUPIED: "Occupied",
} as const;

export type Seat = {
  name: string;
  status: typeof SeatStatus[keyof typeof SeatStatus];
};
