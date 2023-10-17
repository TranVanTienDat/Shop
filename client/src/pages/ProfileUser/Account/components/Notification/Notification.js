import Default from '../Default/Default';

function Notification({ isBlock = false }) {
  return (
    <div style={isBlock ? { display: 'block' } : { display: 'none' }}>
      <Default title="Notification">
        <h3 style={{ textAlign: 'center' }}>updating...</h3>
      </Default>
    </div>
  );
}

export default Notification;
