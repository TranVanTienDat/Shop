import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import propType from 'prop-types';

function Default({ title, children }) {
  return (
    <div
      style={{
        margin: '15px',
      }}
    >
      <h3
        style={{
          fontSize: '1.6rem',
          marginBottom: '20px',
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
