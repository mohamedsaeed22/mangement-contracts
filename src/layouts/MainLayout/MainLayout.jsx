import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <div>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
