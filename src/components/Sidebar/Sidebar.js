/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";
import "./Sidebar.css";

export default function Sidebar({onClick}) {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-p2b-4 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link
            className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            to="/admin/settings"
          >
            <img
              alt="..."
              src={require("assets/img/logo 4k shadow.png").default}
              className="mx-auto max-w-250-px"
            />
          </Link>
          {/* User */}
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full bg-p2b-4 md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap bg-p2b-4">
                <div className="w-6/12 bg-p2b-4">
                  <Link
                    className="md:block text-left md:pb-2 text-p2b-3 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    to="/"
                  >
                    Price2Be
                  </Link>
                </div>
                <div className="w-6/12 flex bg-p2b-4 justify-end">
                  <button
                    type="button"
                    className="cursor-pointer bg-p2b-4 text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />

            {/* Navigation */}


            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                  <Link
                    className={
                      "text-xl uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/settings") !== -1
                        ? "text-white hover:text-white"
                        : "text-p2b-2 hover:text-p2b-1")
                    }
                    to="/admin/settings"
                  >
                    <i
                      className={
                        "fas fa-align-center mr-2 text-xl " +
                        (window.location.href.indexOf("/admin/settings") !== -1
                          ? "text-white"
                          : "opacity-100")
                      }
                    ></i>{" "}
                    Paso 1
                  </Link>
              </li>
              <li className="items-center">
                <Link
                  className={
                    "text-xl uppercase py-3 font-bold block " +
                    (window.location.href.indexOf("/admin/dashboard") !== -1
                    ? "text-white hover:text-white"
                        : "text-p2b-2 hover:text-p2b-1")
                  }
                  to="/admin/dashboard"
                >
                  <i
                    className={
                      "fas fa-tag mr-2 text-xl " +
                      (window.location.href.indexOf("/admin/dashboard") !== -1
                      ? "text-white"
                      : "opacity-100")
                    }
                  ></i>{" "}
                  Paso 2
                </Link>
              </li>

              <li className="items-center">
                  <Link
                    className={
                      "text-xl uppercase py-3 font-bold block " +
                      (window.location.href.indexOf("/admin/maps") !== -1
                      ? "text-white hover:text-white"
                        : "text-p2b-2 hover:text-p2b-1")
                    }
                    to="/admin/maps"
                  >
                    <i
                      className={
                        "fas fa-clipboard-check mr-2 text-xl " +
                        (window.location.href.indexOf("/admin/maps") !== -1
                        ? "text-white"
                        : "opacity-100")
                      }
                    ></i>{" "}
                    Paso 3
                  </Link>
              </li>

            
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              <li className="items-center">
                    <Link
                      className={
                        "text-xl uppercase py-3 font-bold block " +
                        (window.location.href.indexOf("/admin/history") !== -1
                          ? "text-white hover:text-white"
                          : "text-p2b-2 hover:text-p2b-1")
                      }
                      to="/admin/history"
                    >
                      <i
                        className={
                          "fas fa-history mr-2 text-xl " +
                          (window.location.href.indexOf("/admin/history") !== -1
                            ? "text-white"
                            : "opacity-100")
                        }
                      ></i>{" "}
                  Publicaciones
                    </Link>
              </li>
              <hr className="my-4 md:min-w-full" />
              <li className="items-center ">
                    <button onClick={() => onClick()}
                      className={
                        "text-xl uppercase py-3 font-bold block text-p2b-2 hover:text-p2b-1"
                      }   
                    >
                      <i
                        className={
                          "fas fa-sign-out-alt fa-flip-vertical mr-2 text-xl "
                        }
                      ></i>{" "}
                  Cerrar sesión
                    </button>
                </li>
              
              



            </ul>
            

            
          </div>
        </div>
        
      </nav>
    </>
  );
}
