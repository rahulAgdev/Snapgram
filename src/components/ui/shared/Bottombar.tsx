import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
            <Link
              to={link.route}
              className={` ${isActive && "bg-primary-500 rounded-[10px]"} flex-center flex-col gap-1 p-2 transition `}
              key={link.label}
            >
              <img
                src={link.imgURL}
                alt={link.label}
                className={` ${
                  isActive && "invert-white h-5 w-5"
                } `}
                width={16}
                height={16}
              />
              <p className="tiny-medium text-light-2">{link.label}</p>
            </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
