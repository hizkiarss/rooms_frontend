import React from 'react';
import {Star, Flower} from 'lucide-react';


interface Props {
    rating: number;
    type: string;
}

const PropertyRatingDisplay: React.FC<Props> = ({rating, type}) => {
    // Ensure the rating is a number and between 0 and 5
    const ratingCount = Math.min(Math.max(0, Number(rating)), 5);

    const Icon = type.toLowerCase() === 'hotel' ? Star : Flower;

    return (
        <div className="flex">
            {[...Array(ratingCount)].map((_, index) => (
                <Icon
                    key={index}
                    className={`w-3 h-3 md:w-5 m:h-5 ${type.toLowerCase() === 'hotel' ? 'text-yellow-400 fill-yellow-400' : 'text-pink-400 '}`}
                    // fill="currentColor"
                />
            ))}
        </div>
    );
};

export default PropertyRatingDisplay;