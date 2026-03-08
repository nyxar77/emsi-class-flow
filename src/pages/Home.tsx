import { ALink } from "@/layout/ALink";
import { Button } from "@/layout/Button";
import { Input } from "@/layout/Input";
import Main from "@/ui/Main";

export default function Home() {
  return (
    <>
      <hr />
      {/* <Card /> */}
      <Main>
        <Button variant="danger" loading>
          btn?
        </Button>
        <Button variant="primary">btn?</Button>
        <Button variant="secondary">btn?</Button>
        <Input />
        {/* <ALink to="/">link.</ALink> */}
      </Main>
    </>
  );
}
