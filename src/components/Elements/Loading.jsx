import logo from '../../assets/img/tr-logo.png'

const loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <img src={logo} className="animate-bounce h-20 w-20"></img>
    </div>
  );
};

export default loading;