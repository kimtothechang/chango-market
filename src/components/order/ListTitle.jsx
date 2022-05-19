import styled from '@emotion/styled';

const ListTitle = () => {
  return (
    <HeadingWrapper>
      <div>
        <p>상품정보</p>
      </div>
      <div>
        <p>할인</p>
        <p>배송비</p>
        <p>주문금액</p>
      </div>
    </HeadingWrapper>
  );
};

export default ListTitle;

const HeadingWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  padding-top: 19px;
  padding-bottom: 18px;
  margin-bottom: 16px;
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 10px;

  & > div:first-of-type {
    display: flex;
    justify-content: center;
    width: 45%;
    min-width: 400px;
    flex-grow: 1;
  }
  & > div:last-of-type {
    display: flex;
    justify-content: space-between;
    width: 55%;
    min-width: 400px;
    flex-grow: 1;

    & > p {
      display: flex;
      justify-content: center;
      width: 33.3%;
      white-space: nowrap;
    }
  }
`;
