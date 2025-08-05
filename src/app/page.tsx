"use client";

import { useState } from "react";

import { GridColumn, GridLayout } from "@/components/grid-layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <GridLayout name="test-layout" scrollable height="calc(100vh - 8rem)">
        <GridColumn
          title="Collection"
          actions={
            <Button variant="outline" size="sm">
              Add new collection
            </Button>
          }
          showToggler
        >
          <div className="space-y-3">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam recusandae suscipit
              omnis delectus placeat, accusamus, doloribus totam dolorem atque nemo fuga praesentium
              dicta, alias ipsum reprehenderit qui commodi deserunt fugit.
            </p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus error accusantium
              animi, earum at dolorem distinctio quidem assumenda corporis explicabo in enim nemo,
              dolorum, quis possimus doloribus! Quasi, placeat at!
            </p>
          </div>
        </GridColumn>
        <GridColumn
          className="bg-neutral-50"
          tabs={
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
          }
        >
          <TabsContent value="chat">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nemo ratione
              distinctio ipsum saepe culpa aperiam minima nobis reiciendis quibusdam, consectetur
              quasi officiis quaerat, pariatur et accusantium soluta totam mollitia?
            </p>
          </TabsContent>
          <TabsContent value="content">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum corrupti modi dicta,
              rem in maxime, beatae, explicabo id tenetur molestiae ducimus fuga accusantium porro.
              Debitis, porro nostrum. Dolor, omnis rerum.
            </p>
          </TabsContent>
        </GridColumn>
        <GridColumn
          title={activeTab === "chat" ? "History" : "Content"}
          actions={
            activeTab === "chat" ? null : (
              <Button variant="outline" size="sm">
                Check content
              </Button>
            )
          }
          showToggler
        >
          <TabsContent value="chat">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nemo ratione
              distinctio ipsum saepe culpa aperiam minima nobis reiciendis quibusdam, consectetur
              quasi officiis quaerat, pariatur et accusantium soluta totam mollitia?
            </p>
          </TabsContent>
          <TabsContent value="content">
            <p className="text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum corrupti modi dicta,
              rem in maxime, beatae, explicabo id tenetur molestiae ducimus fuga accusantium porro.
              Debitis, porro nostrum. Dolor, omnis rerum.
            </p>
          </TabsContent>
        </GridColumn>
      </GridLayout>
    </Tabs>
  );
}
