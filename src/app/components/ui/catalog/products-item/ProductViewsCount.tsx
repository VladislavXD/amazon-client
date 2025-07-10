import React, { FC } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { useOptimisticViewsCount } from '../../../../../hooks/useProductViews';

interface ProductViewsCountProps {
  productId: number;
  initialCount?: number;
  className?: string;
}

const ProductViewsCount: FC<ProductViewsCountProps> = ({
  productId,
  initialCount = 0,
  className = "flex items-center sm:text-sm gap-1 opacity-50 text-xs"
}) => {
  const { viewsCount, isLoading } = useOptimisticViewsCount(productId, initialCount);

  return (
    <span className={className}>
      <IoEyeSharp />
      <p>{isLoading ? '...' : viewsCount}</p>
    </span>
  );
};

export default ProductViewsCount;
