import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getUserTransaction } from "@/app/api";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TransactionTable({ activeTab }: { activeTab: string }) {
  const { address } = useAccount(); // Ensure to extract 'address' correctly.
  const [transactions, setTransactions] = useState<{
    received: any[];
    sent: any[];
  }>({ received: [], sent: [] });

  const [totalReceived, setTotalReceived] = useState<number>(0);
  const [totalSent, setTotalSent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      const fetchTransactions = async () => {
        setLoading(true);
        try {
          const response = await getUserTransaction(address);
          if (response && response.data) {
            setTransactions({
              received: response.data.received.transfers,
              sent: response.data.sent.transfers,
            });

            // calculate total
            const totalReceived = response.data.received.transfers.reduce(
              (acc: number, curr: any) => acc + curr.value,
              0
            );
            const totalSent = response.data.sent.transfers.reduce(
              (acc: number, curr: any) => acc + curr.value,
              0
            );
            console.log("Total Received", totalReceived);
            console.log("Total Sent", totalSent);

            setTotalReceived(totalReceived);
            setTotalSent(totalSent);
          }
        } catch (err) {
          console.error("Failed to fetch transactions:", err);
          setError("Failed to fetch transactions");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [address]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const displayedInvoices =
    activeTab === "sent" ? transactions.sent : transactions.received;

  return (
    <Table>
      <TableCaption>A list of your recent {activeTab} invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">BlockNum</TableHead>
          <TableHead>Asset</TableHead>
          <TableHead>Category</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayedInvoices.map((invoice, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{invoice.blockNum}</TableCell>
            <TableCell>{invoice.asset}</TableCell>
            <TableCell>{invoice.category}</TableCell>
            <TableCell className="text-right">{invoice.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">
            {activeTab === "sent" ? totalSent : totalReceived}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
