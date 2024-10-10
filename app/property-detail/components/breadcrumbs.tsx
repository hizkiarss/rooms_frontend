import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {PropertyDetailType} from "@/types/properties/PropertiesDetail";

const Breadcrumbs = ({ data }: { data: PropertyDetailType }) => {
    return (
        <Breadcrumb className={"font-semibold mb-2 font-"}>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink className={"hover:none"}> {data.propertyCategories.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink > {data.city.name}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className={"font-semibold"}>{data.name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default Breadcrumbs;