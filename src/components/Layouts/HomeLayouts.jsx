import Header from "../Fragments/Header";
import Main from "../Fragments/Main";
import Footer from "../Fragments/Footer";
import { Helmet } from "react-helmet";


const HomeLayout = ({ children, jumbotron = false, fbBg, nodiv = false, home = false, title = false }) => {
  return (
    <div className="">
      <Helmet>
        <title>Depro</title>
      </Helmet>
      <Header jumbotron={jumbotron} fbBg={fbBg} home={home} />
      <Main nodiv={nodiv} >{children}</Main>
      <Footer />
    </div>
  );
};

export default HomeLayout;