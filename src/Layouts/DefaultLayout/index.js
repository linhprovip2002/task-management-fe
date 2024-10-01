import PropTypes from "prop-types";
import classNames from "classnames/bind";

import styles from "./DefaultLayot.module.scss";

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx(["wrapper"])}>
      <div>
        <div>Header</div>
        <div>{children}</div>
        <div>Footer</div>
      </div>
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
