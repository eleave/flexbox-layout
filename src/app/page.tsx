"use client";

import { useState } from "react";

import {
  GridColumn,
  GridLayout,
  GridColumnTitle,
  GridColumnActions,
  GridTabs,
} from "@ui/components/grid-layout";
import { Button } from "@ui/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/ui/tabs";

export default function Home() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <GridLayout name="test-layout" scrollable height="calc(100vh - 8rem)">
        <GridTabs start={2} end={4} height={48}>
          <TabsList>
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
        </GridTabs>
        <GridColumn showToggler>
          <GridColumnTitle>Collection</GridColumnTitle>
          <GridColumnActions>
            <Button variant="outline" size="sm">
              Add new collection
            </Button>
          </GridColumnActions>
          <div className="space-y-3">
            <p className="text-sm">
              The Sun contains about 99.86% of the mass in our solar system, leaving all the planets
              to share the remaining fraction.
            </p>
            <p className="text-sm">
              Driving a car to the Moon at highway speeds would take roughly six months of non-stop
              travel.
            </p>
          </div>
        </GridColumn>
        <GridColumn className="bg-neutral-50">
          <TabsContent value="chat">
            <p className="text-sm">
              Neutron stars are so dense that a teaspoon of their material would weigh about six
              billion tons on Earth.
            </p>
          </TabsContent>
          <TabsContent value="content">
            <p className="text-sm">
              Jupiter's magnetic field is powerful enough to produce auroras larger than our entire
              planet.
            </p>
          </TabsContent>
        </GridColumn>
        <GridColumn showToggler>
          <TabsContent value="chat">
            <GridColumnTitle>History</GridColumnTitle>
            <p className="text-sm">
              A day on Venus is longer than its year; the planet rotates once every 243 Earth days
              while orbiting the Sun in 225 days.
            </p>
          </TabsContent>
          <TabsContent value="content">
            <GridColumnTitle>Content</GridColumnTitle>
            <GridColumnActions>
              <Button variant="outline" size="sm">
                Check content
              </Button>
            </GridColumnActions>
            <p className="text-sm">
              Earth hosts more trees than the Milky Way has stars, with estimates of around three
              trillion trees worldwide.
            </p>
          </TabsContent>
        </GridColumn>
      </GridLayout>
    </Tabs>
  );
}
