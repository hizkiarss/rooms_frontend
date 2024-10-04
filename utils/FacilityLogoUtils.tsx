import {
    Accessibility,
    Baby,
    Bath,
    CircleGauge,
    Dumbbell,
    Headset,
    Heater,
    Martini,
    PlaneLanding,
    Waves
} from "lucide-react";

export const getAmenityLabel = (amenity: string): string | JSX.Element => {
    switch (amenity.toLowerCase()) {
        case "high-speed internet access" || "high-speed wifi":
            return <CircleGauge/>;
        case "fitness center":
            return <Dumbbell/>;
        case "swimming pool":
            return <Waves/>;
        case "spa and wellness":
            return <Heater/>;
        case "airport shuttle":
            return <PlaneLanding/>;
        case "childcare services":
            return <Baby/>;
        case "disability support":
            return <Accessibility/>;
        case "bar/lounge":
            return <Martini/>;
        case "24-hour front desk":
            return <Headset/>;
        case "hot tub":
            return <Bath/>;
        default:
            return "Other";
    }
};
