import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propType from 'prop-types';

function Default({ title, children }) {
  return (
    <div
      style={{
        margin: '16px 10px',
      }}
    >
      <h3
        style={{
          fontSize: '2rem',
          marginBottom: '30px',
          color: '#3c71ff',
        }}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{ fontSize: '1.3rem', marginRight: '5px' }}
        />
        {title}
      </h3>
      {children}
    </div>
  );
}
Default.propType = {
  children: propType.node,
  title: propType.string,
};

export default Default;
