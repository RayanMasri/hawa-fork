import clsx from "clsx"
import React, { useEffect, useRef, useState } from "react"
import useDiscloser from "../hooks/useDiscloser"
import { HawaMenu } from "../elements"
import { HiMenu } from "react-icons/hi"
import useBreakpoint from "../hooks/useBreakpoint"
import { FaChevronRight } from "react-icons/fa"
type HawaAppLayoutTypes = {
  drawerItems: {
    label: string
    icon: any
    slug: string
    action: () => void
  }[][]
  currentPage: string
  pageTitle?: string
  logoSymbol?: any
  logoLink?: string
  logoText?: any
  children?: any
  topBar?: boolean
  profileMenuItems?: MenuItems[][]
}
type MenuItems = {
  icon?: JSX.Element
  label: string
  action?: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    item: string
  ) => void
  isButton?: boolean
}
export const HawaAppLayout: React.FunctionComponent<HawaAppLayoutTypes> = (
  props: any
) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [openSubItem, setOpenSubItem] = useState(false)
  const { isOpen, onClose, onOpen } = useDiscloser(false)
  const ref = useRef(null)

  let size
  if (typeof window !== "undefined") {
    size = useBreakpoint()
  } else {
    size = 1200
  }
  const [keepOpen, setKeepOpen] = useState(false)
  console.log("size is ", size)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && !keepOpen) {
        // onClickOutside && onClickOutside()
        setOpenSideMenu(false)
      }
    }
    document.addEventListener("click", handleClickOutside, true)
    return () => {
      document.removeEventListener("click", handleClickOutside, true)
    }
  }, [keepOpen])

  //States of the side menu
  //larger than 600
  //as a bar and expands when hover
  //less than 600
  //as nothing and expands as button is clicked
  return (
    <div className="fixed left-0 h-full bg-green-400">
      {props.topBar && (
        <div
          className={clsx(
            "fixed top-0 z-40 flex h-14 flex-row items-center justify-between bg-secondary-default",
            // size > 600 ? "w-[calc(100%-3rem)] translate-x-[3rem]" : "w-full",
            "w-full",
            "p-2"
            // "pr-5"
          )}
        >
          {size > 600 ? (
            props.pageTitle ? (
              <div
                className={clsx(
                  size > 600 ? "ml-14" : "ml-2",
                  keepOpen ? "ml-40" : ""
                )}
              >
                {props.pageTitle}
              </div>
            ) : null
          ) : (
            <div className="flex items-center justify-center">
              <div
                onClick={() => setOpenSideMenu(true)}
                className=" cursor-pointer rounded-lg p-2 transition-all hover:bg-gray-100"
              >
                <HiMenu size={25} />
              </div>
              {props.pageTitle ? <div>{props.pageTitle}</div> : <div></div>}
            </div>
          )}

          <HawaMenu
            buttonPosition="top-right"
            menuItems={props.profileMenuItems}
            handleClose={onClose}
            handleOpen={onOpen}
            open={isOpen}
          >
            <div className="relative h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
              <svg
                className="absolute -left-1 h-10 w-10 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </HawaMenu>
        </div>
      )}
      <div
        onMouseEnter={() => setOpenSideMenu(true)}
        onMouseLeave={() =>
          keepOpen ? setOpenSideMenu(true) : setOpenSideMenu(false)
        }
        ref={ref}
        className={clsx(
          "fixed top-0 left-0 z-50 flex h-full flex-col justify-between overflow-x-clip bg-secondary-default transition-all  hover:overflow-auto",
          size > 600 ? "w-14 hover:w-40" : "w-0",
          openSideMenu ? "w-40" : "w-14"
        )}
      >
        <div>
          <div className="mb-9 h-12 w-12 p-2">
            <img
              className={clsx(
                "fixed top-2 h-9",
                !openSideMenu ? "invisible" : "visible"
              )}
              height={10}
              src={props.logoLink}
              // src={"https://beta-my.qawaim.app/_next/image?url=%2Fqawaim-logo.svg&w=256&q=75"}
            />

            {size > 600 ? (
              <img
                className={clsx(
                  // " bg-green-500",
                  "fixed top-2 h-9",
                  openSideMenu ? "invisible" : "visible"
                )}
                src={props.logoSymbol}
                // src="https://beta-admin.qawaim.app/_next/image?url=%2Fqawaim-symbol.svg&w=128&q=75"
              />
            ) : null}
          </div>

          {props.drawerItems.map((dSection, j) => (
            <div
              key={j}
              className={clsx(
                "flex flex-col items-stretch justify-center"
                // !openSideMenu ? "invisible" : "visible"
              )}
            >
              {dSection.map((dItem, i) => {
                return (
                  <div className="flex flex-col">
                    <div
                      key={i}
                      onClick={() => {
                        // if()
                        dItem.action(dItem.slug)
                      }}
                      className={clsx(
                        props.currentPage === dItem.slug
                          ? "bg-buttonPrimary-default text-white"
                          : "hover:bg-buttonPrimary-lighter",
                        // !openSideMenu ? " h-0 w-0" : ""
                        "m-2 flex cursor-pointer flex-row items-center overflow-x-clip rounded-lg p-2  pl-3 transition-all "
                      )}
                    >
                      <div className="flex items-center justify-center">
                        {dItem.icon}
                      </div>
                      <div
                        className={clsx(
                          "mx-2 whitespace-nowrap text-sm transition-all",
                          openSideMenu ? "opacity-100" : "opacity-0"
                        )}
                      >
                        {dItem.label}
                      </div>
                    </div>
                    {dItem.subItems && (openSideMenu || isOpen) ? (
                      <div className="flex flex-col gap-2">
                        {dItem.subItems.map((subIt) => (
                          <div className="bg-red-100 p-2 px-4">subItems</div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )
              })}
              {j !== props.drawerItems.length - 1 && (
                <div className="my-2 h-[1px] w-10/12 self-center bg-buttonPrimary-default text-center "></div>
              )}{" "}
            </div>
          ))}
        </div>
        <div className={clsx("flex items-center justify-end")}>
          {openSideMenu && !keepOpen ? (
            <div
              onClick={() => setKeepOpen(true)}
              className="m-2 w-fit cursor-pointer rounded-lg bg-gray-300 p-2"
            >
              <FaChevronRight />
            </div>
          ) : null}
          {keepOpen && (
            <div
              onClick={() => setKeepOpen(false)}
              className="m-2 w-fit rotate-180 cursor-pointer rounded-lg bg-gray-300 p-2"
            >
              <FaChevronRight />
            </div>
          )}
        </div>
      </div>

      <div
        className={clsx(
          size > 600 ? "left-14" : "left-0",
          // size > 600 ? "w-[calc(100%-3rem)] translate-x-[3.54rem]" : "",
          "fixed h-full overflow-auto p-4",
          props.topBar ? "top-14" : "top-0",
          // props.topBar ? "mt-[3.6rem]" : "mt-0",
          // keepOpen ? "w-[calc(100%-10rem)] translate-x-[10.54rem]" : ""
          keepOpen ? "left-40" : "left-0"
        )}
        // className={"layoutBody_open"}
      >
        {props.children}
      </div>
      {/* <div className="top-0 w-[calc(100%-1rem)] -translate-y-[1rem] translate-x-8 overflow-scroll bg-yellow-300 "> */}
    </div>
  )
}
