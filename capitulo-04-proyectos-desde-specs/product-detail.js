import { isFeatureEnabled } from '@/shared/featureFlags';

function ProductDetail({ product }) {
return (
<div>
<ProductInfo product={product} />

{/* Feature en desarrollo: solo visible si el flag está activo */}
{isFeatureEnabled('NEW_PRODUCT_VARIANTS') && (
<ProductVariants productId={product.id} />
)}

{/* Feature estable */}
<ProductImages images={product.images} />
</div>
);
}
