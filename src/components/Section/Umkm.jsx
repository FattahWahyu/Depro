import CardUmkm from "../Elements/CardUmkm";
import Section from "./Index";

const Umkm = ({ umkm }) => {
  return (
    <Section title="UMKM Partner">
      <div className="flex gap-6 flex-wrap mt-4">
        {
          umkm.length > 0
            ? (
              umkm.map((umkm, index) => (
                <CardUmkm id={umkm.id} key={index} name={umkm.name} image={umkm.logo} />
              ))
            )
            : (<p className="menu-list__empty">Not Found</p>)
        }
      </div>
    </Section>
  );
};

export default Umkm;