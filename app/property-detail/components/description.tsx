import React from 'react';
import {RoomType} from "@/types/rooms/RoomsType";
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";

const Description = ({data}: { data: PropertyDetailType }) => {

    const splitIntoSentences = (text :string) => {
        return text.match(/[^.!?]+[.!?]+/g) || [];
    };

    const groupIntoParagraphs = (sentences, sentencesPerParagraph = 3) => {
        const paragraphs = [];
        for (let i = 0; i < sentences.length; i += sentencesPerParagraph) {
            paragraphs.push(sentences.slice(i, i + sentencesPerParagraph).join(' '));
        }
        return paragraphs;
    };

    const sentences = splitIntoSentences(data.description);
    const paragraphs = groupIntoParagraphs(sentences);

    return (
        <div id="description" className=" scroll-mt-20 mb-20 pb-10 ">
            <h2 className={"font-semibold text-2xl"}>About this property</h2>
            {paragraphs.map((paragraph, index) => (
                <p key={index} className="mt-4">
                    {paragraph}
                </p>
            ))}
        </div>
    );
};

export default Description;