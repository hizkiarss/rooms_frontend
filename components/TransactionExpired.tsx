const TransactionExpired = () => {
  return (
    <div className="text-center">
      <p className="text-lg font-semibold text-red-500">
        Sorry, your transaction time has expired. You will need to start the
        process again.
      </p>
      <p className="mt-4 text-sm">
        Unfortunately, the payment window for this transaction has closed, and
        the reserved price is no longer available. Don&apos;t worry, you can easily
        reinitiate your order by going back to the properties page!
      </p>
    </div>
  );
};
export default TransactionExpired;
