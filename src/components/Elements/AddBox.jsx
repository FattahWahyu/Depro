import { MdAdd } from "react-icons/md";
import Icon from "../Elements/Icon";

const AddBox = ({openModal}) => {
  return (
    <div className="border-dashed border-[#bbb] min-h-[250px] min-w-[100px]  group rounded-3xl  border-4 flex justify-center items-center hover:rounded-xl" onClick={openModal}>
      <div className="group-hover:scale-150">
        <Icon nonactive><MdAdd /></Icon>
      </div>
    </div>
  );
};

export default AddBox;