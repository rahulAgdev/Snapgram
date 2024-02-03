import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../button";
import {  useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  // useEffect(() => {
  //   if (isSuccess) {
  //     console.log("Value of isSuccess is : " , isSuccess)
  //     navigate('/sign-in');
  //   }
  // }, [isSuccess]);
  useEffect(() => {
    // console.log("Value of isSucess is : ", isSuccess);
    if (isSuccess) {
      // console.log("Navigating ... ");
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>
        <div className="flex gap-4 items-center">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => {
              signOut();
              console.log("Sign out called");
            }}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className="flex center gap-3">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full items-center"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
