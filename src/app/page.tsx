import { GridColumn, GridLayout } from "@/components/grid-layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <GridLayout name="test-layout" scrollable height="calc(100vh - 8rem)">
      <GridColumn
        title="Collection"
        tabs={<div className="text-sm">Tabs</div>}
        actions={
          <Button variant="outline" size="small">
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
      <GridColumn className="bg-neutral-50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nemo ratione distinctio
        ipsum saepe culpa aperiam minima nobis reiciendis quibusdam, consectetur quasi officiis
        quaerat, pariatur et accusantium soluta totam mollitia?
      </GridColumn>
      <GridColumn title="History" showToggler>
        <p className="text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas alias asperiores quam
          deleniti dolore dicta maiores eaque molestiae dolorum odio quod veritatis explicabo quis,
          vel fugit labore! Expedita, rem aliquid.
        </p>
      </GridColumn>
    </GridLayout>
  );
}
