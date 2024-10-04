"use client";
import {gql} from "graphql-request";

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
    }
  }
`;

export const GET_TRANSACTIONS_BY_PROPERTY_ID = gql`
  query TransactionsByPropertyId($propertyId: ID!) {
    transactionsByPropertyId(propertyId: $propertyId) {
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
    }
  }
`;

export const GET_TRANSACTIONS_BY_USER_ID = gql`
  query TransactionsByUsersId($usersId: ID!) {
    transactionsByUsersId(usersId: $usersId) {
      id
      bookingCode
      finalPrice
      status
      paymentMethod
      firstName
      lastName
      mobileNumber
      properties {
        id
        name
      }
      paymentProofs {
        id
        imgUrl
      }
      transactionDetails {
        id
        startDate
        endDate
      }
      reviews {
        id
        feedback
        rating
        reply
      }
      createdAt
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
      properties {
        id
        name
      }
      transactionDetails {
        id
        price
        startDate
        endDate
      }
      users {
        id
        email
        username
        profilePicture
        mobileNumber
      }
      createdAt
    }
  }
`;


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

export const REVIEW_BY_PROPERTY_ID = gql`
  query ReviewByPropertyId($propertyId: ID!) {
    reviewByPropertyId(propertyId: $propertyId) {
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

export const GET_FILTERED_PROPERTIES = gql`
  query GetFilteredProperties( $city: String!, $page: Int!, $category: String!, $rating: Float, $startPrice: Float,
    $endPrice: Float, $sortBy: String) {
    getFilteredProperties( city: $city, page: $page, category: $category, rating: $rating, startPrice: $startPrice, 
    endPrice: $endPrice, sortBy: $sortBy
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
  query GetAvailableRooms($checkinDate: Date!, $checkOutDate: Date!, $propertyId: ID!) {
    getAvailableRooms(checkinDate: $checkinDate, checkOutDate: $checkOutDate, propertyId: $propertyId) {
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



