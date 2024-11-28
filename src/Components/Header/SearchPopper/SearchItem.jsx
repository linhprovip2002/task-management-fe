import React from "react";
import { CardIcon, TrelloIconColor } from "../../Icons";
import HeadlessTippy from "@tippyjs/react/headless";
import "./SearchPopper.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SearchItem({ type = "board", title, desc, coverUrl, linkTo }) {
  const isHexColor = coverUrl?.startsWith("#");

  return (
    <Link to={linkTo}>
      <HeadlessTippy
        interactive
        placement="bottom"
        offset={[0, 0]}
        delay={[300, 0]}
        render={() => (
          <div className="py-3 px-5 flex flex-col searchPopper_wrapper w-[380px]">
            <div className="pt-[6px] flex">
              <CardIcon />

              <div className="flex flex-col pb-4 pl-2">
                <span className="text-sm leading-4">{title}</span>
                <span className="text-[11px] leading-3">{desc}</span>
              </div>
            </div>
            {coverUrl && (
              <div
                style={{
                  height: 191,
                  width: "100%",
                  backgroundSize: "cover",
                  marginBottom: 8,
                  backgroundImage: isHexColor ? undefined : `url(${coverUrl})`,
                  backgroundColor: isHexColor && coverUrl,
                }}
              ></div>
            )}
            <div className="py-2">
              <TrelloIconColor height={16} />
            </div>
          </div>
        )}
      >
        <div className="h-10 px-4 flex items-center hover:bg-[#091E420F] cursor-pointer">
          {type === "card" ? (
            <div className="mr-4">
              <CardIcon />
            </div>
          ) : (
            <div
              style={{
                background: `url(${coverUrl || "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x98/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg"})`,
                backgroundColor: isHexColor && coverUrl,
                backgroundSize: "cover",
              }}
              className="w-6 h-6 rounded-sm mr-4"
            ></div>
          )}

          <div className="flex flex-col">
            <span className="text-sm leading-4">{title}</span>
            <span className="text-[11px] leading-3">{desc}</span>
          </div>
        </div>
      </HeadlessTippy>
    </Link>
  );
}

SearchItem.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  coverUrl: PropTypes.string,
};
