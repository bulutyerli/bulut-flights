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
    id: string;
    entityId: string;
  };
  to: {
    name: string;
    id: string;
    entityId: string;
  };
  fromDate?: string | null;
  toDate?: string | null;
}

interface DatePickType {
  depDate: Dayjs | null;
  returnDate: Dayjs | null;
  onDateChange: (key: "departure" | "return", date: Dayjs | null) => void;
}
