const ShortInput = ({ value, type, onChange, order }) => {
  return (
    <div>
      <input type="text" onChange={(e) => onChange(e, type, order)} value={value} />
    </div>
  );
};

export default ShortInput;
