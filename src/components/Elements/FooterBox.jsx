import logo from "../../assets/img/tr-logo.png";

const FooterBox = () => {
  return (
    <>
      <div className="m-auto flex justify-center items-center pt-[70px]">
        <img src={logo} alt="" className="w-11 mr-1" />
        <h1 className="text-3xl text-white">TrackMate</h1>
      </div>
      <div className="text-white text-center my-2">
        <p>Copyright &copy; TrackMate 2023</p>
      </div>
      <div className="text-left sm:mt-8 sm:mb-4 text-white font-inter grid grid-cols-3 max-w-2xl mx-auto gap-y-2 sm:translate-x-16 p-8 sm:p-0 text-xs sm:text-sm">
        <h3 className="mr-16 font-bold">
          <a href="">Product</a>
        </h3>
        <h3 className="mr-16 font-bold">
          <a href="">UMKM Partner</a>
        </h3>
        <h3 className="mr-16 font-bold">
          <a href="">Contact</a>
        </h3>
        <ul className="text-left text-white font-light ">
          <li>Sambal Baby Cumi</li>
          <li>Sambal Teri Medan</li>
          <li>Nasi Jagung Instan</li>
          <li>Mutiara Beras</li>
          <li>ZAKET</li>
        </ul>
        <ul className="text-left text-white font-light ">
          <li>Sambal Mamone</li>
          <li>Dapur Porang Prima</li>
          <li>Putra Alfaro Sejahtera</li>
          <li>Gubug Eva</li>
        </ul>
        <ul className="text-left text-white font-light ">
          <li>Siwi Budi Utami</li>
          <li> Rizky Wantoro</li>
          <li>Noel Marcell Jonathan Wongkar</li>
          <li>I Gusti Ngurah Agung Kade D A</li>
          <li>Abdullah Fikri Handi Saputra</li>
          <li>Alfi Syahrin</li>
          <li>Abid Muhsin</li>
          <li>Fattahillah Wahyu Nur Rozaaq</li>
        </ul>
      </div>
      <div className="flex max-w-xl text-s"></div>
    </>
  );
};

export default FooterBox;
