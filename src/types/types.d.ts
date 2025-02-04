export interface AirportsListType {
  presentation: {
    title: string;
    suggestionTitle: string;
  };
}

export interface SearchBarType {
  from: string;
  onSearchChange: (key: "from" | "to", value: string) => void;
  fromAirports: AirportsListType[];
  toAirports: AirportsListType[];
}
