import './spinner.css';

export const NSpinner = () => (
  <div
    style={{
      display: 'block',
      position: 'fixed',
      left: 50,
      top: 40,
      zIndex: 1031,
    }}
  >
    <div
      style={{
        animation: '400ms linear infinite spinner',
        borderBottom: '2px solid transparent',
        borderLeft: '2px solid #29d',
        borderRadius: '50%',
        borderRight: '2px solid transparent',
        borderTop: '2px solid #29d',
        boxSizing: 'border-box',
        height: 20,
        width: 20,
      }}
    />
  </div>
);
