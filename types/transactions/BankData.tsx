interface PaymentStep {
  title: string;
  steps: string[];
}

interface BankData {
  items: PaymentStep[];
}

export const bankData: Record<string, BankData> = {
  bca: {
    items: [
      {
        title: "How to Pay via ATM BCA",
        steps: [
          "On the main menu, choose Other Transaction",
          "Choose Transfer",
          "Choose BCA Virtual Account",
          "Enter your payment code and press Correct",
          "Your payment details will appear on the payment confirmation page. If the information is correct press Yes",
        ],
      },
      {
        title: "How to pay via Klik BCA",
        steps: [
          "Choose menu Fund Transfer",
          "Choose Transfer to BCA Virtual Account",
          "Input BCA Virtual Account Number",
          "Input KeyBCA APPLI 1 shown on BCA Token, and then click Send",
          "Your transaction is done.",
        ],
      },
      {
        title: "How to pay via m-BCA",
        steps: [
          "Choose m-Transfer",
          "Choose Transfer",
          "Choose BCA Virtual Account",
          "Input BCA Virtual Account number",
          "BCA Virtual Account Number and your account information will appear on the payment confirmation page",
          "Click OK on the payment confirmation page",
          "Input your BCA PIN to authorize payment",
          "Your transaction is done.",
        ],
      },
    ],
  },
  bri: {
    items: [
      {
        title: "How to pay via ATM BRI",
        steps: [
          "On the main menu, choose Other Transaction",
          "Choose Payment",
          "Choose Other",
          "Choose BRIVA",
          "Enter your BRIVA Number and press Correct",
          "Amount to be paid, payment code, and merchant name will appear on the payment confirmation page. If the information is correct, press Yes",
          "Payment is finished. Save your payment receipt",
        ],
      },
      {
        title: "How to pay via Internet Banking BRI",
        steps: [
          "Log in to your Internet Banking BRI",
          "Choose Payment and Purchase",
          "Choose sub menu BRIVA",
          "Input BRIVA number 169334142464358150",
          "Amount to be paid, payment code, and merchant name will appear on the payment confirmation page. If the information is correct, choose Send",
          "Input password and mToken, choose Send",
          "Payment is finished, choose Print to have payment receipt",
        ],
      },
    ],
  },
  bni: {
    items: [
      {
        title: "How to pay via ATM BNI",
        steps: [
          "Select others on the main menu.",
          "Select transfer.",
          "Select to BNI account.",
          "Insert the payment account number.",
          "Insert the payable amount, then confirm.",
          "Payment completed.",
        ],
      },
      {
        title: "How to pay via Internet Banking BNI",
        steps: [
          "Select transaction, then transfer administration info.",
          "Select set destination account.",
          "Insert account info, then Confirm.",
          "Select transfer, then transfer to BNI account.",
          "Insert payment details, then confirm.",
          "Payment completed.",
        ],
      },
      {
        title: "How to pay via Mobile Banking BNI",
        steps: [
          "Select transfer.",
          "Select virtual account billing.",
          "Select the debit account you want to use.",
          "Insert the virtual account number, then confirm.",
          "Payment completed.",
        ],
      },
    ],
  },
};
