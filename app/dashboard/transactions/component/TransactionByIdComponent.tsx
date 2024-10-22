"use client";
import React, { useState } from "react";
import axios from "axios";

const TransactionByIdComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactionById = async () => {
    setLoading(true);
    setError(null);

    const query = `
    mutation Login {
      login(email: "test1@gmail.com", password: "test1234") {
          token
          role
      }
  }
    `;

    try {
      const response = await axios.post("http://localhost:8080/graphql", {
        query,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchTransactionById}
        className="px-4 py-2 bg-greenr text-white rounded hover:bg-greensecondary">
        Fetch Transaction
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {data && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <p>
            <strong>ini responsenya: </strong> {data}
          </p>
        </div>
      )}
    </div>
  );
};

export default TransactionByIdComponent;
