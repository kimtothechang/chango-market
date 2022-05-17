import styled from '@emotion/styled';

const AmountControl = ({ value, increase, decrease }) => {
  return (
    <AmountWrapper>
      <button onClick={() => decrease()}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 10H20" stroke="#C4C4C4" strokeWidth="2" />
        </svg>
      </button>
      <p>{value}</p>
      <button onClick={() => increase()}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 9.5H20" stroke="#C4C4C4" strokeWidth="2" />
          <path d="M10 20L10 0" stroke="#C4C4C4" strokeWidth="2" />
        </svg>
      </button>
    </AmountWrapper>
  );
};

export default AmountControl;

const AmountWrapper = styled.div`
  box-sizing: content-box;
  display: flex;
  width: 150px;
  height: 50px;
  border: 1px solid #c4c4c4;
  border-radius: 5px;

  & > button {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
  }

  & > p {
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid #c4c4c4;
    border-left: 1px solid #c4c4c4;
    width: 50px;
    height: 50px;
  }
`;
