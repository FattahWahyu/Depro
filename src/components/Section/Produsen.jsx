import ProdusenBox from "../Elements/ProdusenBox";
import Section from "./Index";

const Produsen = ({data}) => {
    return (
        <Section title="Produsen" nomb>
            {
                (data)
                    ? (
                        <ProdusenBox id= {data.id} key={data.id} src={data.logo} name={data.name} employe={data.employe} location={data.location.name} lat={data.location.lat} lng={data.location.lng} />
                    )
                    : (<p className="menu-list__empty">Nout Found</p>)
            }
        </Section>
    )
}

export default Produsen;