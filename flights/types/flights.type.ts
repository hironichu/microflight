import { Seat } from "./seats.type.ts";

export type Flight = {
    id: string;
    flightNumber: string;
    origin: string;
    destination: string;
    date: string;
    sieges: Seat[];
    informationAeroplane: {
      modele: string;
      company: string;
    };
  };