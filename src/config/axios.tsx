import axios from "axios";

const fetchData = axios.create({
    // geo.ipify.org API for getting IP
    baseURL: "https://geo.ipify.org/api/v2/country",
    params: {
        apiKey: "at_wxRsfs8j26xwm9MflJveh3UCtg6KH",
    },
});

const fetchLatLon = axios.create({
    // ipgeolocation API for getting latitude and longitude
    baseURL:
        "https://api.ipgeolocation.io/ipgeo?apiKey=94f6e5f48c94481891116ef37cd4cefb",
});

export default fetchData;
export { fetchLatLon };
