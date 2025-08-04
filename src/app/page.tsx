import { GridColumn, GridLayout } from "@/components/grid-layout";

export default function Home() {
  return (
    <GridLayout name="test-layout" scrollable>
      <GridColumn>Column 1</GridColumn>
      <GridColumn>Column 2</GridColumn>
      <GridColumn>Column 3</GridColumn>
    </GridLayout>
  );
}
