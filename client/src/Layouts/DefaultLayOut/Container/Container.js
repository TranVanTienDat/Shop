import propTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAppState } from '~/store/slice/stateAppSlice';
function Container({ children, state }) {
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state !== undefined) {
      window.scrollTo(0, 0);
      dispatch(setAppState(state));
    }
  }, [state, dispatch]);

  return <>{children}</>;
}

Container.propTypes = {
  children: propTypes.node,
};

export default Container;
