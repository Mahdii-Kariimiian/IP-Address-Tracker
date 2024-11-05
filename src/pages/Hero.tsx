import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import InfoCard from "../components/InfoCard ";
import fetchData, { fetchLatLng } from "../config/axios";

// types
type Data = {
    ip?: string;
    isp?: string;
    location?: {
        country: string;
        timezone: string;
    };
};

const Hero = () => {
    // states
    const [ip, setIP] = useState<string>("");
    const [data, setData] = useState<Data | null>(null);
    const [latLng, setLatLng] = useState<number[]>([51.505, -0.09]);
    const [error, setError] = useState<string>("");
    const latLngTuple: LatLngTuple = [latLng[0], latLng[1]];

    // Get latitude and longitude from API
    useEffect(() => {
        if (ip) {
            fetchLatLng("", {
                params: {
                    ip: ip,
                },
            })
                .then((res) => {
                    setLatLng([
                        parseFloat(res.data.latitude),
                        parseFloat(res.data.longitude),
                    ]);
                    setError("");
                })
                .catch((error) => {
                    console.error("Error fetching lat/lon:", error.message);
                    setError("This IP doesn't exist");
                });
        }
    }, [ip]);

    // Get IP from API
    const handleClick = async () => {
        try {
            const response = await fetchData("", {
                params: {
                    ipAddress: ip,
                },
            });
            console.log(response.data);
            setData(response.data);
            setError("");
        } catch (error: any) {
            console.error("Error fetching data:", error.message);
            setError("This IP doesn't exist");
            setData(null);
        }
    };

    // change map view
    const ChangeMapView = ({ center }: { center: LatLngTuple }) => {
        const map = useMap();
        map.setView(center, map.getZoom());
        return null;
    };

    return (
        <div className="relative flex flex-col max-h-[100dvh] overflow-hidden">
            {/* IP Address tracker */}
            <section className="z-0 flex flex-col items-center justify-center bg-mobile-bg sm:bg-desktop-bg bg-no-repeat bg-cover pt-5 sm:pt-[40px] pb-[170px] sm:pb-[105px] px-5 space-y-6">
                <h1 className="text-xl sm:text-3xl text-white font-bold uppercase whitespace-nowrap">
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
            <section className="flex flex-col justify-between z-10 absolute min-w-[250px] min-h-44 top-[140px] p-2 sm:top-[210px] left-1/2 transform -translate-x-1/2 text-center bg-white sm:py-6 rounded-[15px]">
                <div>
                    {error && (
                        <div className="text-red-500 font-semibold">
                            {error}
                        </div>
                    )}
                </div>
                <div className="flex max-sm:flex-col item-center sm:items-start sm:justify-between">
                    <InfoCard title="IP Address" info={data?.ip} />
                    <InfoCard title="Location" info={data?.location?.country} />
                    <InfoCard
                        title="Timezone"
                        info={data?.location?.timezone}
                    />
                    <InfoCard title="ISP" info={data?.isp} />
                </div>
            </section>
            {/* Map */}
            <section className="z-0">
                <MapContainer
                    center={latLngTuple}
                    zoom={13}
                    className="w-full h-[600px]"
                    zoomControl={false}
                >
                    <ChangeMapView center={latLngTuple} />
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={latLngTuple}></Marker>
                </MapContainer>
            </section>
        </div>
    );
};

export default Hero;
