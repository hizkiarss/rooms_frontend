import { gql } from "./gql-tag";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
      users {
        id
        email
        username
        profilePicture
        mobileNumber
      }
      tax
      adult
      children
    }
  }
`;

// export const GET_TRANSACTIONS_BY_PROPERTY_ID = gql`
//   query TransactionsByPropertyId($propertyId: ID!) {
//     transactionsByPropertyId(propertyId: $propertyId) {
//       id
//       finalPrice
//       status
//       paymentMethod
//       firstName
//       lastName
//       mobileNumber
//       users {
//         id
//         email
//         username
//         profilePicture
//         mobileNumber
//       }
//       tax
//       adult
//       children
//     }
//   }
// `;

export const GET_TRANSACTIONS_BY_PROPERTY_ID = gql`
  query TransactionsByPropertyId(
    $propertyId: ID!
    $startDate: String
    $endDate: String
  ) {
    transactionsByPropertyId(
      propertyId: $propertyId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
      createdAt
      bookingCode
      users {
        id
        email
        username
        profilePicture
        mobileNumber
      }
      tax
      adult
      children
    }
  }
`;

// export const GET_TRANSACTIONS_BY_USER_ID = gql`
//   query TransactionsByUsersId {
//     transactionsByUsersId {
//       id
//       bookingCode
//       finalPrice
//       status
//       paymentMethod
//       firstName
//       lastName
//       mobileNumber
//       properties {
//         id
//         name
//       }
//       paymentProofs {
//         id
//         imgUrl
//       }
//       transactionDetails {
//         id
//         startDate
//         endDate
//         rooms {
//           id
//           name
//         }
//       }
//       reviews {
//         id
//         feedback
//         rating
//         reply
//       }
//       createdAt
//     }
//   }
// `;

// export const GET_TRANSACTIONS_BY_USER_ID = gql`
//   query TransactionsByUsersId($page: Int!, $size: Int!) {
//     transactionsByUsersId(page: $page, size: $size) {
//       content {
//         id
//         bookingCode
//         finalPrice
//         status
//         paymentMethod
//         firstName
//         lastName
//         mobileNumber
//         properties {
//           id
//           name
//         }
//         paymentProofs {
//           id
//           imgUrl
//         }
//         transactionDetails {
//           id
//           startDate
//           endDate
//           rooms {
//             id
//             name
//           }
//         }
//         reviews {
//           id
//           feedback
//           rating
//           reply
//         }
//         createdAt
//       }
//       pageNumber
//       pageSize
//       totalElements
//       totalPages
//     }
//   }
// `;

export const GET_TRANSACTIONS_BY_USER_ID = gql`
  query TransactionsByUsersId(
    $page: Int!
    $size: Int!
    $status: String
    $sort: String
  ) {
    transactionsByUsersId(
      page: $page
      size: $size
      status: $status
      sort: $sort
    ) {
      content {
        id
        bookingCode
        finalPrice
        status
        paymentMethod
        firstName
        lastName
        mobileNumber

        paymentProofs {
          id
          imgUrl
        }
        transactionDetails {
          id
          startDate
          endDate
          rooms {
            id
            name
          }
        }
        reviews {
          id
          feedback
          rating
          reply
        }
        createdAt
        tax
        adult
        children
      }
      pageNumber
      pageSize
      totalElements
      totalPages
    }
  }
`;

export const GET_PENDING_PAYMENT_PROOF = gql`
  query PendingPaymentProof {
    pendingPaymentProof {
      id
      imgUrl
      transaction {
        id
        finalPrice
        status
        paymentMethod
      }
    }
  }
`;

export const GET_PENDING_PAYMENT_PROOF_BY_PROPERTY_ID = gql`
  query PendingPaymentProofByPropertyId($propertyId: ID!) {
    pendingPaymentProofByPropertyId(propertyId: $propertyId) {
      id
      imgUrl
      transaction {
        id
        status
        paymentMethod
        finalPrice
      }
      createdAt
    }
  }
`;

export const GET_CHECK_PAYMENT_PROOF_BY_PROPERTY_ID = gql`
  query CheckPaymentProofByPropertyId($propertyId: ID!) {
    checkPaymentProofByPropertyId(propertyId: $propertyId) {
      id
      imgUrl
      transaction {
        id
        status
        paymentMethod
        finalPrice
        firstName
        lastName
      }
      createdAt
    }
  }
`;

export const GET_TRANSACTIONS_BY_BOOKING_CODE = gql`
  query TransactionsByBookingCode($bookingCode: String!) {
    transactionsByBookingCode(bookingCode: $bookingCode) {
      id
      bookingCode
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
      createdAt
      tax
      adult
      children
      users {
        id
        email
        username
        mobileNumber
      }
      properties {
        id
        name
        description
        checkInTime
        checkOutTime
        address
        slug
        averageRating
        totalReview
        propertyFacilities {
          id
          facilities {
            id
            name
            logoUrl
          }
        }
        propertyPictures {
          id
          imgUrl
        }
      }
      transactionDetails {
        id
        price
        startDate
        endDate
        rooms {
          id
          name
          description
          roomNumber
          price
          includeBreakfast
          roomArea
          bedTypes {
            id
            name
          }
        }
      }
    }
  }
`;
// query TransactionsByBookingCode($bookingCode: String!) {
//   transactionsByBookingCode(bookingCode: $bookingCode) {
//     id
//     bookingCode
//     finalPrice
//     status
//     paymentMethod
//     firstName
//     lastName
//     mobileNumber
//     properties {
//       id
//       name
//     }
//     transactionDetails {
//       id
//       price
//       startDate
//       endDate
//     }
//     users {
//       id
//       email
//       username
//       profilePicture
//       mobileNumber
//     }
//     createdAt
//   }
// }

export const GET_PAYMENT_BY_BOOKING_CODE = gql`
  query PaymentByBookingCode($bookingCode: String!) {
    paymentByBookingCode(bookingCode: $bookingCode) {
      id
      bookingCode
      transactionStatus
      bank
      vaNumber
      grossAmount
    }
  }
`;

export const FIND_CITY_BY_NAME = gql`
  query FindCityByName($name: String!) {
    findCityByName(name: $name) {
      id
      name
    }
  }
`;

export const GET_UNREAD_REVIEW_BY_PROPERTY_ID = gql`
  query UnReadReviewByPropertyId($propertyId: ID!) {
    unReadReviewByPropertyId(propertyId: $propertyId) {
      id
      feedback
      rating
      reply
      isRead
      properties {
        id
        name
      }
      users {
        username
      }
    }
  }
`;

// export const REVIEW_BY_PROPERTY_ID = gql`
//   query ReviewByPropertyId($propertyId: ID!) {
//     reviewByPropertyId(propertyId: $propertyId) {
//       id
//       feedback
//       rating
//       reply
//       users {
//         username
//       }
//       createdAt
//     }
//   }
// `;
export const REVIEW_BY_PROPERTY_ID = gql`
  query ReviewByPropertyId(
    $propertyId: ID!
    $page: Int!
    $size: Int!
    $sortBy: String!
  ) {
    reviewByPropertyId(
      propertyId: $propertyId
      page: $page
      size: $size
      sortBy: $sortBy
    ) {
      totalPages
      totalItems
      content {
        id
        feedback
        rating
        reply
        users {
          username
        }
        createdAt
      }
    }
  }
`;

export const FIND_USER_BY_EMAIL = gql`
  query FindUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      id
      email
      username
      profilePicture
      role
      mobileNumber
      gender
      dateOfBirth
      properties {
        id
        name
      }
    }
  }
`;

export const REVENUE_BY_PROPERTY = gql`
  query RevenueByProperty($propertyId: ID!, $startDate: Date, $endDate: Date) {
    revenueByProperty(
      propertyId: $propertyId
      startDate: $startDate
      endDate: $endDate
    )
  }
`;

export const TAX_BY_PROPERTY = gql`
  query TaxByProperty($propertyId: ID!, $startDate: Date, $endDate: Date) {
    taxByProperty(
      propertyId: $propertyId
      startDate: $startDate
      endDate: $endDate
    )
  }
`;

export const REVENUE_WITH_TAX_BY_PROPERTY = gql`
  query RevenueWithTaxByProperty(
    $propertyId: ID!
    $startDate: Date
    $endDate: Date
  ) {
    revenueWithTaxByProperty(
      propertyId: $propertyId
      startDate: $startDate
      endDate: $endDate
    )
  }
`;

export const TOTAL_ROOMS_BY_PROPERTY = gql`
  query TotalRoom($propertyId: ID!) {
    totalRoom(propertyId: $propertyId)
  }
`;

export const CURRENTLY_OCCUPIED_ROOM_BY_PROPERTY_ID = gql`
  query OccupiedRooms($propertyId: ID!) {
    occupiedRooms(propertyId: $propertyId)
  }
`;

export const TOTAL_TRANSACTIONS_BY_PROPERTY_ID = gql`
  query TotalTransactionsByPropertyId(
    $propertyId: ID!
    $startDate: Date
    $endDate: Date
  ) {
    totalTransactionsByPropertyId(
      propertyId: $propertyId
      startDate: $startDate
      endDate: $endDate
    )
  }
`;

// export const REPORT_ROOMS_BY_PROPERTY = gql`
//   query GetRoomsByPropertiesId($propertyId: ID!) {
//     getRoomsByPropertiesId(id: $propertyId) {
//       id
//       name
//       roomNumber
//       bookings {
//         id
//         startDate
//         endDate
//         users {
//           username
//           email
//           mobileNumber
//         }
//       }
//     }
//   }
// `;
export const REPORT_ROOMS_BY_PROPERTY = gql`
  query GetRoomsByPropertiesId($propertyId: ID!) {
    getRoomsByPropertiesId(id: $propertyId) {
      id
      name
      description
      capacity
      isAvailable
      roomNumber
      price
      includeBreakfast
      roomArea
      slug
      bookings {
        id
        startDate
        endDate
        users {
          username
          email
          mobileNumber
        }
      }
    }
  }
`;

export const MONTHLY_TRANSACTIONS_BY_PROPERTY_ID = gql`
  query MonthlyTransactionsByPropertyId($propertyId: ID!) {
    monthlyTransactionsByPropertyId(propertyId: $propertyId) {
      month
      totalTransactions
    }
  }
`;

export const LATEST_TRANSACTIONS_BY_PROPERTY_ID = gql`
  query LatestTransactionsByPropertyId($propertyId: ID!) {
    latestTransactionsByPropertyId(propertyId: $propertyId) {
      id
      finalPrice
      lastName
      mobileNumber
      firstName
      users {
        email
      }
    }
  }
`;

export const UPCOMING_BOOKINGS_BY_PROPERTY_ID = gql`
  query UpcomingBookings($propertyId: ID!) {
    upcomingBookings(propertyId: $propertyId) {
      room {
        id
        name
        roomNumber
      }
      users {
        id
        email
      }
      transactionDetail {
        id
        transaction {
          bookingCode
          lastName
          firstName
        }
      }
      startDate
      endDate
    }
  }
`;

export const MOST_BOOKED_ROOMS = gql`
  query MostBookedRoomNames($propertyId: ID!) {
    mostBookedRoomNames(propertyId: $propertyId)
  }
`;

export const GET_FILTERED_PROPERTIES = gql`
  query GetFilteredProperties(
    $city: String!
    $page: Int!
    $category: String!
    $rating: Float
    $startPrice: Float
    $endPrice: Float
    $sortBy: String
  ) {
    getFilteredProperties(
      city: $city
      page: $page
      category: $category
      rating: $rating
      startPrice: $startPrice
      endPrice: $endPrice
      sortBy: $sortBy
    ) {
      totalElements
      totalPages
      pageSize
      properties {
        price
        isBreakfast
        property {
          id
          name
          description
          checkInTime
          checkOutTime
          address
          totalReview
          averageRating
          slug
          propertyCategories {
            id
            name
          }
          propertyFacilities {
            id
            facilities {
              id
              name
            }
          }
          propertyPictures {
            id
            imgUrl
          }
        }
      }
    }
  }
`;

export const GET_PROPERTIES_BY_SLUG = gql`
  query GetPropertiesBySlug($slug: String!) {
    getPropertiesBySlug(slug: $slug) {
      id
      name
      description
      checkInTime
      checkOutTime
      address
      totalReview
      averageRating
      phoneNumber
      star
      averageRating
      propertyFacilities {
        id
        facilities {
          id
          name
          logoUrl
        }
      }
      propertyPictures {
        id
        imgUrl
      }
      propertyCategories {
        id
        name
      }
      city {
        id
        name
      }
    }
  }
`;

export const GET_AVAILABLE_ROOMS = gql`
  query GetAvailableRooms(
    $checkinDate: Date!
    $checkOutDate: Date!
    $propertyId: ID!
  ) {
    getAvailableRooms(
      checkinDate: $checkinDate
      checkOutDate: $checkOutDate
      propertyId: $propertyId
    ) {
      id
      name
      description
      capacity
      isAvailable
      roomNumber
      price
      includeBreakfast
      roomArea
      slug
      bedTypes {
        id
        name
      }
      roomPictures {
        id
        imgUrl
      }
    }
  }
`;


export const GET_ROOM_BY_SLUG = gql`
  query RoomBySlug($slug: String!) {
    roomBySlug(slug: $slug) {
      id
      name
      description
      capacity
      isAvailable
      roomNumber
      price
      includeBreakfast
      roomArea
      slug
      bedTypes {
        id
        name
      }
      roomPictures {
        id
        imgUrl
      }
    }
  }
`;

export const GET_ROOM_PRICE = gql`
  query RoomPrice($slug: String!, $propertyId: ID!, $checkInDate: Date!) {
    roomPrice(slug: $slug, propertyId: $propertyId, checkInDate: $checkInDate)
  }
`;



export const GET_CALENDAR_PRICE = gql`
  query GetCalendarPrice($year: Int!, $month: Int!, $propertyId: ID!) {
    getCalendarPrice(year: $year, month: $month, propertyId: $propertyId) {
      date
      price
    }
  }
`;



export const GET_PROPERTIES_BY_OWNER_EMAIL = gql`
  query GetPropertiesByOwnerEmail($email: String!) {
    getPropertiesByOwnerEmail(email: $email) {
      id
      name
      description
      checkInTime
      checkOutTime
      address
      totalReview
      averageRating
      slug
      propertyFacilities {
        id
        facilities {
          id
          name
        }
      }
      propertyPictures {
        id
        imgUrl
      }
      city {
        id
        name
      }
      propertyCategories {
        id
        name
      }
      users {
        id
        email
      }
    }
  }
`;


export const GET_FILTERED_ROOMS_BY_PROPERTY_ID = gql`
  query GetFilteredRoomsByPropertyId(
    $propertyId: ID!
    $isAvailable: Boolean
    $roomName: String
    $pageSize: Int!
    $pageNumber: Int!
  ) {
    getFilteredRoomsByPropertyId(
      propertyId: $propertyId
      isAvailable: $isAvailable
      roomName: $roomName
      pageSize: $pageSize
      pageNumber: $pageNumber
    ) {
       totalElements
        totalPages
        currentPage
        pageSize
        rooms {
            id
            name
            description
            capacity
            isAvailable
            roomNumber
            price
            includeBreakfast
            roomArea
            slug
            bedTypes {
                id
                name
            }
            roomPictures {
                id
                imgUrl
            }
        }
    }
}
`;

export const GET_ROOMS_TYPES_BY_PROPERTY_ID = gql`
  query GetRoomsTypesByPropertyId($propertyId: ID!) {
    getRoomsTypesByPropertyId(propertyId: $propertyId)
  }
`;


export const GET_ROOM_BY_ID = gql`
  query GetRoomsById($id: ID!) {
    getRoomsById(id: $id) {
      id
      name
      description
      capacity
      isAvailable
      roomNumber
      price
      includeBreakfast
      roomArea
      slug
      bedTypes {
        id
        name
      }
      roomPictures {
        id
        imgUrl
      }
    }
  }
`;


export const GET_PROPERTIES_BY_ID = gql`
  query GetPropertiesById($id: ID!) {
    getPropertiesById(id: $id) {
      id
      name
      description
      checkInTime
      checkOutTime
      address
      totalReview
      averageRating
      slug
      phoneNumber
      star
      propertyFacilities {
        id
        facilities {
          id
          name
          logoUrl
        }
      }
      propertyPictures {
        id
        imgUrl
      }
      city {
        id
        name
      }
      propertyCategories {
        id
        name
      }
      users {
        id
        email
        username
      }
    }
  }
`;


export const GET_PEAK_SEASONS_BY_PROPERTY_ID = gql`
    query GetPeakSeasonsByPropertyId($propertyId: ID!) {
        getPeakSeasonsByPropertyId(propertyId: $propertyId) {
            name
            id
            startDate
            endDate
            markUpPercentage
        }
    }
`;


export const GET_10_RANDOM_AVAILABLE_ROOMS = `
  query Get10RandomAvailableRooms {
    get10RandomAvailableRooms {
      id
      name
      description
      capacity
      isAvailable
      roomNumber
      price
      includeBreakfast
      roomArea
      slug
      properties {
        id
        name
        description
        checkInTime
        checkOutTime
        address
        totalReview
        averageRating
        slug
        phoneNumber
        star
        propertyFacilities {
          id
        }
        propertyPictures {
          id
          imgUrl
        }
        city {
          id
          name
        }
      }
    }
  }
`;



