import logo from '../../assets/img/tr-logo.png'
import Icon from './Icon';

const Brand = () => {
  return (
    <div className='flex items-center gap-2'>
      <Icon>
        <img src={logo} alt="" />
      </Icon>
      <h1 className='text-h1 font-bold font-inter hidden sm:inline'>Depro</h1>
    </div>
  );
};

export default Brand;