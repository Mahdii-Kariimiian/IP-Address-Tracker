import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import fetchData, { fetchLatLon } from "../config/axios";
import InfoCard from "../components/InfoCard ";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Data = {
    [key: string]: string | number | boolean;
    location?: {
        country: string;
        timezone: string;
    };
};

const Hero = () => {
    // states
    const [ip, setIP] = useState<string>("");
    const [data, setData] = useState<Data | null>(null);
    const [latLon, setLatLon] = useState<number[]>([51.505, -0.09]); //

    console.log(ip, data, latLon);

    // Get latitude and longitude from API
    useEffect(() => {
        if (ip) {
            fetchLatLon("", {
                params: {
                    ip: ip,
                },
            })
                .then((res) => {
                    setLatLon([
                        parseFloat(res.data.latitude),
                        parseFloat(res.data.longitude),
                    ]);
                })
                .catch((error) => {
                    console.error("Error fetching lat/lon:", error.message);
                });
        }
    }, [data]);

    // Get IP from API
    const handleClick = async () => {
        try {
            const response = await fetchData("", {
                params: {
                    ipAddress: ip,
                },
            });
            setData(response.data);
        } catch (error: any) {
            console.error("Error fetching data:", error.message);
        }
    };

    const ChangeMapView = ({ center }: { center: number[] }) => {
        const map = useMap();
        map.setView(center, map.getZoom());
        return null;
    };

    return (
        <div className="relative flex flex-col max-h-[100dvh] overflow-hidden">
            {/* IP Address tracker */}
            <section className="z-0 flex flex-col items-center justify-center bg-mobile-bg sm:bg-desktop-bg bg-no-repeat bg-cover pt-5 sm:pt-[40px] pb-[170px] sm:pb-[120px] px-5 space-y-6">
                <h1 className="text-xl sm:text-3xl text-white font-bold uppercase">
                    IP Address Tracker
                </h1>
                <div className="max-w-[500px] w-full rounded-[15px] overflow-hidden">
                    <div className="flex items-stretch">
                        <input
                            onChange={(e) => setIP(e.target.value)}
                            value={ip}
                            className="flex-1 p-2 sm:p-4 outline-none"
                            type="text"
                            placeholder="Enter IP Address"
                        />
                        <button
                            onClick={handleClick}
                            className="bg-black text-3xl text-white p-2 sm:p-4 rounded-r-lg"
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            </section>
            {/* Results */}
            <section className="z-10 absolute top-[140px] p-2 sm:top-[210px] left-1/2 transform -translate-x-1/2 min-w-[350px] text-center flex max-sm:flex-col item-center sm:items-start sm:justify-between sm:gap-5 bg-white px-3 sm:py-6 rounded-[15px]">
                <InfoCard title="IP Address" info={data?.ip} />
                <InfoCard title="Location" info={data?.location?.country} />
                <InfoCard title="Timezone" info={data?.location?.timezone} />
                <InfoCard title="ISP" info={data?.isp} />
            </section>
            {/* Map */}
            <section className="z-0">
                <MapContainer
                    center={latLon}
                    zoom={13}
                    className="w-full h-[600px]"
                    zoomControl={false}
                >
                    <ChangeMapView center={latLon} />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={latLon}>
                        <Popup>IP Address Location</Popup>
                    </Marker>
                </MapContainer>
            </section>
        </div>
    );
};

export default Hero;
