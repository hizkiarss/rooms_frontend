import React from 'react';

const Top = () => {
    return (
        <div className="">
            <div className={"flex flex-col items-center justify-center"}>
                <h2 className={"font-semibold text-4xl"}>Add Photos</h2>
                <p className={"mt-2 text-gray-400 mb-8 ml-[2px]"}>Share some pictures so the world can see those rooms.
                    </p>
            </div>
            <div className={"grid grid-cols-5 gap-2 items-center mb-10 "}>
                <div className={"flex items-center justify-center"}>
                    <div className={"flex items-center gap-2 max-w-fit "}>
                        <p className={"border-4 font-semibold border-gray-400 text-black  rounded-full w-10 h-10 flex items-center justify-center  "}>1</p>
                        <p className={"font-semibold text-slate-400"}>General Details</p>
                    </div>
                </div>

                <div className={"h-[3px] w-full bg-gray-400 rounded-full"}></div>

                <div className={"flex items-center justify-center"}>
                    <div className={"flex items-center gap-2 max-w-fit "}>
                        <p className={"border-4 font-semibold border-gray-400 text-black  rounded-full w-10 h-10 flex items-center justify-center  "}>2</p>


                        <p className={"font-semibold text-slate-400"}>Facilities List</p>
                    </div>
                </div>

                <div className={"h-[3px] w-full bg-gray-400 rounded-full"}></div>

                <div className={"flex items-center justify-center"}>
                    <div className={"flex items-center gap-2 max-w-fit "}>
                        <p className={"border-4 font-semibold border-greenr text-greenr  rounded-full w-10 h-10 flex items-center justify-center pr-[1px]"}>3</p>
                        <p className={"font-semibold text-greenr"}>Add Photos</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Top;