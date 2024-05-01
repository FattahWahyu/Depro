

const Main = ({ children, nodiv = false }) => {

  return (
    <main className={`w-full min-h-screen ${(!nodiv) ? 'bg-[#bbb]' : 'bg-fff'} `}>
      {children}
    </main>
  );
};

export default Main;