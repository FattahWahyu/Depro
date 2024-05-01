import Section from "./Index";
import Map from "../Elements/Map";
import MapDetail from "../Elements/MapDetail";

const Location = ({data}) => {
    return (
        <Section title="Alamat">
            <div className="flex gap-3 mt-4 flex-col">
               <Map lat={data.lat} lng={data.lng} />
               <MapDetail name={data.name} />
            </div>
        </Section>       
    )
}

export default Location;