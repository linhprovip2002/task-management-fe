import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './DefaultLayot.module.scss';
import Header from '../../Components/Header/Header';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
  return (
    <div className={cx(['wrapper'])}>
      <div>
        <Header />
        <div>{children}</div>
      </div>
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;
