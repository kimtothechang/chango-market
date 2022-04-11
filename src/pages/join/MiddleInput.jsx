import { memo } from 'react';

const ValueEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

const MiddleInput = ({ type, value, onChange }) => {
  return (
    <div>
      <input type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default memo(MiddleInput, ValueEqual);
