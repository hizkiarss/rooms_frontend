import CreateTransactionComponent from "./component/CreateTransactionComponent";
import TestKirim from "./component/TestKirim";
import TransactionForm from "./component/TransactionForm";
import TransactionTable from "./component/TransactionTable";

const page = () => {
  return (
    <div className="px-5">
      <TransactionTable />
      {/* <TransactionForm />
      <TestKirim /> */}
    </div>
  );
};

export default page;
