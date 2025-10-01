import PropTypes from 'prop-types';
import { useEffect } from 'react';



export default function ScrollTop({ children }) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return children || null;
}

ScrollTop.propTypes = { children: PropTypes.oneOfType([PropTypes.node, PropTypes.any]) };
