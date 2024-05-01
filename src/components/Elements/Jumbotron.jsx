import { Carousel } from "react-responsive-carousel";
import Search from "./Search";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bg1 from '../../assets/img/bg/bg-1.jpg'
import bg2 from '../../assets/img/bg/bg-2.jpg'
import bg3 from '../../assets/img/bg/bg-3.jpg'
import bg4 from '../../assets/img/bg/bg-4.png'

const Jumbotron = ({ jumbotronRef, showSearch }) => {

  return (
    <div ref={jumbotronRef} className="h-[520px] bg-slate-500 overflow-hidden relative">
      <Carousel
        className="z-10"
        autoPlay
        infiniteLoop showArrows={false} showThumbs={false} showStatus={false}>
        <div>
          <img src={bg4} className="h-[520px] object-cover" />
        </div>
        <div>
          <img src={bg1} className="h-[520px] object-cover" />
        </div>
        <div>
          <img src={bg2} className="h-[520px] object-cover" />
        </div>
        <div>
          <img src={bg3} className="h-[520px] object-cover" />
        </div>
      </Carousel>
      {showSearch && <Search />}
    </div>
  );
};

export default Jumbotron;
