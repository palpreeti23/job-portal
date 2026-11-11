import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import { UserButton, Show, useUser } from "@clerk/react";
import { BriefcaseBusinessIcon, Heart, PenBox, X } from "lucide-react";
import { SignIn } from "@clerk/react";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  // const { user } = useUser();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  useEffect(() => {
    if (!showSignIn) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showSignIn]);

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" alt="" className="h-20" />
        </Link>

        <div className="flex gap-8">
          <Show when="signed-out">
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </Show>

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  modalBackdrop: "!bg-black",
                  userProfileRootBox: "z-[9999]",
                  userProfileModal: "!bg-black",
                },
              }}
              userProfileProps={{
                appearance: {
                  elements: {
                    modalBackdrop: "!bg-black",
                    rootBox: "w-full",
                    card: "!max-h-[90vh] !overflow-hidden",
                    pageScrollBox: "!overflow-hidden !p-2",
                    navbar: "!py-1",
                    profileSection: "!py-1",
                  },
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Jobs"
                  labelIcon={<BriefcaseBusinessIcon size={15} />}
                  href="/my-jobs"
                />
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Heart size={15} />}
                  href="/saved-jobs"
                />
              </UserButton.MenuItems>
            </UserButton>
          </Show>
        </div>
      </nav>
      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <button
            onClick={() => {
              setShowSignIn(false);
              setSearch({});
            }}
            className="absolute right-6 top-6 text-white"
          >
            <X size={28} />
          </button>
          <SignIn
            signUpFallbackRedirectUrl={`/onboarding`}
            fallbackRedirectUrl={`/onboarding`}
          />
        </div>
      )}
    </>
  );
}

export default Header;
