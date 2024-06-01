"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TransactionTable } from "./transaction";
import { useState, useEffect } from "react";

export default function Transactions() {
  const [activeTab, setActiveTab] = useState("sent");

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-4">
        <TabsTrigger value="sent">Sent</TabsTrigger>
        <TabsTrigger value="received">Received</TabsTrigger>
      </TabsList>
      <TabsContent value="sent">
        <h3>Sent</h3>
        <TransactionTable activeTab={activeTab} />
      </TabsContent>
      <TabsContent value="received">
        <h3>Received</h3>
        <TransactionTable activeTab={activeTab} />
      </TabsContent>
    </Tabs>
  );
}
