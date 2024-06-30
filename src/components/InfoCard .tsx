// InfoCard.tsx
import React from "react";

type InfoCardProps = {
    title: string;
    info: string | number | boolean | undefined;
};

const InfoCard: React.FC<InfoCardProps> = ({ title, info }) => {
    return (
        <div className="text-center sm:min-w-[100px] md:min-w-[150px] lg:min-w-[200px] xl:min-w-[250px] p-1 pb-2 ">
            <p className="text-gray-500 uppercase">{title}</p>
            <p className="text-2xl font-bold whitespace-nowrap">{info ??  "_"}</p>
        </div>
    );
};

export default InfoCard;
