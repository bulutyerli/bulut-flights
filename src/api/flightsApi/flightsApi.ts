import axios from "axios";

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export async function getNearbyAirports(lat: string, lng: string) {
  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getNearByAirports",
    params: {
      lat,
      lng,
      locale: "en-US",
    },
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": HOST,
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function searchAirports(query: string) {
  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
    params: {
      query,
      locale: "en-US",
    },
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getFlights({
  originSkyId,
  destinationSkyId,
  adults,
  originEntityId,
  destinationEntityId,
  date,
}: {
  originSkyId: string;
  destinationSkyId: string;
  adults: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
}) {
  const options = {
    method: "GET",
    url: "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights",
    params: {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      cabinClass: "economy",
      adults,
      sortBy: "best",
      currency: "USD",
      market: "en-US",
      countryCode: "US",
    },
    headers: {
      "x-rapidapi-key": RAPIDAPI_KEY,
      "x-rapidapi-host": HOST,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
