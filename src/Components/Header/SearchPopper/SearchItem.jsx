import React from "react";
import { CardIcon, TrelloIconColor } from "../../Icons";
import HeadlessTippy from "@tippyjs/react/headless";
import "./SearchPopper.css";

export default function SearchItem({ type = "card" }) {
  return (
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
              <span className="text-sm leading-4">KTPM</span>
              <span className="text-[11px] leading-3">BKDN</span>
            </div>
          </div>
          <div
            style={{
              height: 191,
              width: "100%",
              backgroundSize: "cover",
              marginBottom: 8,
              backgroundImage: `url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/960x540/efea59b89ada0934c5256715fb180bd9/photo-1463107971871-fbac9ddb920f.jpg)`,
            }}
          ></div>
          <div>
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
              background: `url(https://trello-backgrounds.s3.amazonaws.com/SharedBackground/140x98/24baa6609b89fb8eb0cc0aceb70eaf36/photo-1557682250-33bd709cbe85.jpg)`,
              backgroundSize: "cover",
            }}
            className="w-6 h-6 flex rounded-sm mr-4"
          ></div>
        )}

        <div className="flex flex-col">
          <span className="text-sm leading-4">KTPM</span>
          <span className="text-[11px] leading-3">BKDN</span>
        </div>
      </div>
    </HeadlessTippy>
  );
}
