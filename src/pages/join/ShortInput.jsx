import { memo } from 'react';

const ValueEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

const ShortInput = ({ refprops, type, value, onChange, character, max }) => {
  return (
    <div>
      <input ref={refprops} type={type} value={value} onChange={onChange} maxLength={max} />
    </div>
  );
};

ShortInput.defaultProps = {
  character: '',
};

export default memo(ShortInput, ValueEqual);
