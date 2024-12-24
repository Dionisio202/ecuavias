import React from "react";
import Header from "../shared/Header";
import SideBar from "../shared/SideBar";
import Preloaded from "../shared/Preloaded";
import User06 from "../assets/user-06.png";
import Cover from "../assets/cover-01.png";

const Profile: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* ===== Preloader Component ===== */}
      <Preloaded />

      {/* ===== Sidebar Component ===== */}
      <SideBar />

      {/* ===== Content Area ===== */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* ===== Header Component ===== */}
        <Header />

        {/* ===== Main Content ===== */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mx-auto max-w-242.5">
              {/* Profile Section */}
              <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {/* Profile Cover */}
                <div className="relative z-10 h-35 md:h-65">
                  <img
                    src={Cover}
                    alt="profile cover"
                    className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                  />
                  {/* Profile Image */}
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                    <div className="h-30 w-30 rounded-full bg-white p-1 shadow-lg sm:h-44 sm:w-44 sm:p-2">
                      <img
                        src={User06}
                        alt="profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5 pt-8">
                  <div className="mt-20"> {/* Ajusta el margen según sea necesario */}
                    <h3 className="mb-1.5 text-2xl font-medium text-black dark:text-black">
                      Edison Ortiz
                    </h3>
                    <p className="font-medium">Admin</p>
                  </div>
                </div>
              </div>
              {/* Profile Section End */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
