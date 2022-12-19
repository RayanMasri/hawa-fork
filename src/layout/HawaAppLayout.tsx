import clsx from "clsx"
import React, { useState } from "react"

type HawaAppLayoutTypes = {
  drawerItems: { label: string; icon: any; slug: string; action: () => void }[]
  currentPage: string
  logoSymbol?: any
  logoLink?: string
  logoText?: any
  children?: any
}
export const HawaAppLayout: React.FunctionComponent<HawaAppLayoutTypes> = (
  props: any
) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <>
      <div
        onMouseEnter={() => setOpenSideMenu(true)}
        onMouseLeave={() => setOpenSideMenu(false)}
        className="fixed top-0 left-0 z-50 flex h-full w-12 flex-col bg-blue-300 transition-all hover:w-40"
      >
        <div className="flex flex-row p-2">
          {/* full logo */}
          {openSideMenu ? (
            <img
              className={clsx("h-10", !openSideMenu ? "invisible" : "visible")}
              src="https://beta-my.qawaim.app/_next/image?url=%2Fqawaim-logo.svg&w=256&q=75"
            />
          ) : (
            <img
              className={clsx("h-10", openSideMenu ? "invisible" : "visible")}
              src="https://beta-admin.qawaim.app/_next/image?url=%2Fqawaim-symbol.svg&w=128&q=75"
            />
          )}
        </div>
        {props.drawerItems.map((dItem, i) => (
          <div
            key={i}
            onClick={() => dItem.action(dItem.slug)}
            className={clsx(
              "m-1 flex cursor-pointer flex-row items-center overflow-x-clip rounded-lg p-2  pl-3 transition-all hover:bg-primary-400",
              props.currentPage === dItem.slug
                ? "bg-primary-600 text-white hover:bg-primary-600"
                : ""
            )}
          >
            <div className="flex items-center justify-center">{dItem.icon}</div>
            <div
              className={clsx(
                "mx-2 text-sm transition-all",
                openSideMenu ? "opacity-100" : "opacity-0"
              )}
            >
              {dItem.label}
            </div>
          </div>
        ))}
      </div>
      <div
        className={clsx(
          // "overflow-scroll",
          "w-[calc(100%-3rem)]",
          "translate-x-[3rem]",
          "bg-red-900 text-white",
          "m-0"
        )}
      >
        {props.children}
      </div>
      {/* <div className="top-0 w-[calc(100%-1rem)] -translate-y-[1rem] translate-x-8 overflow-scroll bg-yellow-300 "> */}
    </>
  )
}
