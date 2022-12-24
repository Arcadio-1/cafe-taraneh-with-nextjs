import React, { useEffect, useRef, useState } from "react";
import Modal from "../../../Module/Modal";
import Logo from "../Logo";
import CloseIcon from "../../../../ui/Icons/CloseIcon";
import CategoryList from "./components/CategoryList";
import Link from "next/link";
import LoadingSpiner from "../../../../ui/LoadingSpiner/loadingSpiner";
import ArrowIcon from "../../../../ui/Icons/arrowsIcon";
import useToggleMenu from "../../../../../Hook/UseToggoleMenu";
import { useDispatch } from "react-redux";
import { uiAction } from "../../../../../store/ui/uiSlice";

const SideMenu = (props) => {
  const dispatchSideMenu = useDispatch();
  const categoryListRef = useRef();
  const [categoryNavLinks, setCategoryNavLinks] = useState();
  const [ctegoryNavLinksStatus, setCategoryNavLinksStatus] =
    useState("loading");
  const [categoryHeight, setCategoryHeight] = useState(0);

  const { isShowMenu, menuRef, showMenuHandler } = useToggleMenu();
  useEffect(() => {
    const getNavLinks = async () => {
      const categoryNavLinksJson = await fetch("api/helperAPI/getNavLinks", {
        method: "GET",
      });
      const result = await categoryNavLinksJson.json();
      if (!result || result.status === "error") {
        setCategoryNavLinksStatus((prev) => (prev = "error"));
      }
      setCategoryNavLinks((prev) => (prev = result));
      setCategoryNavLinksStatus((prev) => (prev = "success"));
    };
    getNavLinks();
  }, []);
  const showCategoryHandler = () => {
    showMenuHandler();
    const listHeight = categoryListRef.current.clientHeight;
    setCategoryHeight(`${listHeight + 120}px`);
  };
  const closeSideMenuHandler = () => {
    dispatchSideMenu(uiAction.closeModal());
  };
  return (
    <Modal>
      <div
        className="sideMenu"
        style={{ right: `${props.isShowMenu ? "0" : "-40rem"}` }}
      >
        <div ref={menuRef} className="sideMenu-container">
          <div className="sideMenu-header">
            <div className="sideMenu-header-logo">
              <Logo />
            </div>
            <div
              onClick={closeSideMenuHandler}
              className="sideMenu-header-closeBtn"
            >
              <CloseIcon />
            </div>
          </div>
          <div className="sideMenu-body">
            <div className="sideMenu-category">
              <div
                onClick={showCategoryHandler}
                className="sideMenu-category-btn"
              >
                <span>دسته بندی محصولات</span>
                <ArrowIcon type="down" />
              </div>
              {ctegoryNavLinksStatus === "loading" && (
                <LoadingSpiner text={"بارگذاری دسته بندی ها"} />
              )}
              <div
                className={`sideMenu-category-container ${
                  isShowMenu && "border-b-2 border-gray-400 border-opacity-50"
                }`}
                style={
                  isShowMenu
                    ? {
                        height: categoryHeight,
                        padding: "1em 1em",
                        overflowY: "scroll",
                      }
                    : { height: 0 }
                }
              >
                <div ref={categoryListRef} className="sideMenu-Category-Wraper">
                  {ctegoryNavLinksStatus === "success" && (
                    <CategoryList
                      links={categoryNavLinks}
                      status={ctegoryNavLinksStatus}
                    />
                  )}
                </div>
              </div>
            </div>
            <ul className="sideMenu-list">
              <li className="sideMenu-item">
                <Link href={"/"}>
                  <span className="sideMenu-title">صفحه نخست</span>
                </Link>
              </li>
              <li className="sideMenu-item">
                <Link href={"/products"}>
                  <span className="sideMenu-title">محصولات</span>
                </Link>
              </li>
              <li className="sideMenu-item">
                <Link href={"/blog"}>
                  <span className="sideMenu-title">اخبار و آموزش</span>
                </Link>
              </li>
              <li className="sideMenu-item">
                <Link href={"/repair"}>
                  <span className="sideMenu-title">تعمیر ابزار</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SideMenu;