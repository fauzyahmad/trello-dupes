import NavBar from "../components/molecules/NavBar";
import Modal from "../components/organisms/Modal";
import BgScreen from "../components/templates/BgScreen";
import DragAndDrop from "../components/templates/DragAndDrop";

const Home = () => {

  return (
    <BgScreen>
      <NavBar />
      <DragAndDrop />
      <Modal />
    </BgScreen>
  );
};

export default Home;
