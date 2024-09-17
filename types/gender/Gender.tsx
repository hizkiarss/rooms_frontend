export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export const formatGender = (gender?: Gender): string => {
    if (!gender) return 'Not Provided'; // Handle undefined or null

    return gender === Gender.MALE ? 'Male' :
        gender === Gender.FEMALE ? 'Female' :
            gender === Gender.OTHER ? 'Other' :
                'Unknown'; // Default case if gender does not match any known value
};