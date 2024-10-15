import React from "react";
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[1] bg-gray-500 bg-opacity-50">
      <div className={cx("spinner center")}>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
        <div className={cx("spinner-blade")}></div>
      </div>
    </div>
  );
}