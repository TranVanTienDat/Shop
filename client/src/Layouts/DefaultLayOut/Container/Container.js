import propTypes from 'prop-types';
function Container({ children }) {
  return <>{children}</>;
}

Container.propTypes = {
  children: propTypes.node,
};

export default Container;
