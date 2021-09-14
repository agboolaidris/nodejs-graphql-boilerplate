import Barchart from "../components/charts/bar";
import PieChart from "../components/charts/pie";
import Layout from "../layout/layout";
import { Wrapper } from "../styles/dashboard";

export default function Home() {
  return (
    <Layout>
      <Wrapper>
        <div className="col-8">
          <Barchart />
        </div>
        <div className="col-4">
          <PieChart />
        </div>
      </Wrapper>
    </Layout>
  );
}
