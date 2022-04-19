import { useParams } from 'react-router';

const Product = () => {
  const postId = useParams().id;
  return <p>{postId}번 상품 상세 페이지</p>;
};

export default Product;
