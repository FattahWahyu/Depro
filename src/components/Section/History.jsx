import placeholder from '../../assets/img/placeholder.jpg'
import HistoryBox from "../Elements/HistoryBox";
import Section from "./Index";

const History = ({ data, edited = false }) => {

    let image = placeholder
    let text = '...'
    if (data !== null) {
        image = data.image
        text = data.text
    }
    return (
        <Section title="Sejarah">
            {

                <div className="mt-5">
                    <HistoryBox image={image} text={text} edited={edited} />
                </div>
            }

        </Section>
    )
}

export default History;