import PropTypes from "prop-types";
import Header from "../../Components/Header/Header";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DefaultLayout;