import { GridColumn, GridLayout } from "@/components/grid-layout";

export default function Home() {
  return (
    <GridLayout name="test-layout" scrollable height="calc(100vh - 80px)">
      <GridColumn title="Collection" hasToggler>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam recusandae suscipit omnis
        delectus placeat, accusamus, doloribus totam dolorem atque nemo fuga praesentium dicta,
        alias ipsum reprehenderit qui commodi deserunt fugit.
      </GridColumn>
      <GridColumn>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nemo ratione distinctio
        ipsum saepe culpa aperiam minima nobis reiciendis quibusdam, consectetur quasi officiis
        quaerat, pariatur et accusantium soluta totam mollitia?
      </GridColumn>
      <GridColumn title="History" hasToggler>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas alias asperiores quam
        deleniti dolore dicta maiores eaque molestiae dolorum odio quod veritatis explicabo quis,
        vel fugit labore! Expedita, rem aliquid.
      </GridColumn>
    </GridLayout>
  );
}
