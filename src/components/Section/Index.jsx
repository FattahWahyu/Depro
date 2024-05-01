import TitleSection from "../Elements/TitleSection";

const Section = ({ title = '...', children, nomb = false, titlecenter=false }) => {
  return (
    <div className={`pt-6 pb-12 xl:px-0 p-4 bg-white w-full ${(!nomb) ? 'mb-1' : ''} `}>
      <div className={`max-w-[1240px] mx-auto ${titlecenter && 'text-center'} relative `}>
        <TitleSection>{title}</TitleSection>
        {children}
      </div>
    </div>
  );
};

export default Section;