import { VaNumbersType } from "./VaNumbersType";

export type PaymentResponseType = {
  status_code: string;
  status_message: string;
  transaction_id: string;
  order_id: string;
  merchant_id: string;
  gross_amount: string;
  currency: string;
  payment_type: string;
  transaction_time: string;
  transaction_status: string;
  fraud_status: string;
  expiry_time: string;
  va_numbers: VaNumbersType;
};
