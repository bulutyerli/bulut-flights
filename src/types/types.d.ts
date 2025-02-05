import { Dayjs } from "dayjs";

export interface AirportsListType {
  presentation: {
    title: string;
    suggestionTitle: string;
  };
  id: string;
  entityId: string;
}

export interface SearchBarType {
  from: string;
  to: string;
  fromValue: SearchDataType.from;
  toValue: SearchDataType.to;
  onInputChange: (key: "from" | "to", value: string) => void;
  onSelect: (key: "from" | "to", airport: AirportsListType) => void;
  swap: () => void;
  fromAirports: AirportsListType[];
  toAirports: AirportsListType[];
}

export interface SearchDataType {
  from: {
    name: string;
    skyId: string;
    entityId: string;
  };
  to: {
    name: string;
    skyId: string;
    entityId: string;
  };
  fromDate?: string | null;
  toDate?: string | null;
}

export interface DatePickType {
  depDate: Dayjs | null;
  returnDate: Dayjs | null;
  onDateChange: (key: "departure" | "return", date: Dayjs | null) => void;
  isOneWay: boolean;
}

export interface FlightList {
  id: string;
  price: {
    formatted: string;
  };
  legs: {
    departure: string;
    arrival: string;
    durationInMinutes: number;
    stopCount: number;
    origin: {
      iataCode: string;
    };
    destination: {
      iataCode: string;
    };
    carriers: {
      marketing: {
        name: string;
        logoUrl: string;
      }[];
    };
  }[];
}

export interface FlightData {
  departure: FlightList[];
  return: FlightList[];
}

export interface PassengerCountProps {
  count: number;
  onCountChange: (newCount: number) => void;
}
