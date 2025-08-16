import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Star, Heart, ShoppingCart, MapPin } from 'lucide-react';
import { Card, Button, colors } from '../../styles/GlobalStyles';
import { Product } from '../../types';

const ProductCardWrapper = styled(Card)`
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  position: relative;
  height: 240px;
  background: linear-gradient(45deg, ${colors.neutral.light}, ${colors.neutral.medium});
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }

  .badges {
    position: absolute;
    top: 12px;
    left: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .badge {
    background: ${colors.accent};
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
  }

  .badge.new {
    background: ${colors.success};
  }

  .badge.customizable {
    background: ${colors.info};
  }

  .wishlist-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: white;
      transform: scale(1.1);
    }

    &.active {
      background: ${colors.accent};
      color: white;
    }
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductCategory = styled.div`
  color: ${colors.primary};
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${colors.neutral.black};
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ArtisanInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 10px;
  color: ${colors.neutral.dark};
  font-size: 13px;

  .artisan-name {
    font-weight: 500;
  }

  .location {
    display: flex;
    align-items: center;
    gap: 3px;
    opacity: 0.8;
  }
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 13px;

  .stars {
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .rating-text {
    color: ${colors.neutral.dark};
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  .price {
    font-size: 18px;
    font-weight: 700;
    color: ${colors.primary};
  }

  .original-price {
    font-size: 14px;
    color: ${colors.neutral.dark};
    text-decoration: line-through;
    margin-left: 8px;
  }

  .discount {
    background: ${colors.success};
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 600;
  }
`;

const ProductActions = styled.div`
  display: flex;
  gap: 8px;

  .quick-view-btn {
    flex: 1;
    padding: 8px 12px;
    font-size: 13px;
  }

  .add-to-cart-btn {
    padding: 8px;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
  isInWishlist?: boolean;
  showLocation?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onWishlistToggle,
  onAddToCart,
  isInWishlist = false,
  showLocation = true
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/products/${product.id}`);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWishlistToggle?.(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Open quick view modal (would be implemented later)
    console.log('Quick view:', product.id);
  };

  // Calculate if product is new (created within last 30 days)
  const isNew = () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return product.createdAt > thirtyDaysAgo;
  };

  // Mock discount calculation
  const getDiscount = () => {
    // In a real app, this would come from product data
    const discountPercent = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0;
    return discountPercent;
  };

  const discount = getDiscount();
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null;

  return (
    <ProductCardWrapper onClick={handleCardClick}>
      <ProductImage>
        <img 
          src={product.images[0] || '/api/placeholder/300/240'} 
          alt={product.name}
          loading="lazy"
        />
        
        <div className="badges">
          {isNew() && <div className="badge new">New</div>}
          {product.isCustomizable && <div className="badge customizable">Custom</div>}
          {discount > 0 && <div className="badge">{discount}% Off</div>}
        </div>

        <button 
          className={`wishlist-btn ${isInWishlist ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>
      </ProductImage>

      <ProductInfo>
        <ProductCategory>{product.category}</ProductCategory>
        <ProductName>{product.name}</ProductName>
        
        <ArtisanInfo>
          <span className="artisan-name">by Master Craftsman</span>
          {showLocation && (
            <span className="location">
              <MapPin size={12} />
              Rajasthan
            </span>
          )}
        </ArtisanInfo>

        <ProductRating>
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                fill={i < Math.floor(product.rating) ? colors.warning : 'none'}
                color={colors.warning}
              />
            ))}
          </div>
          <span className="rating-text">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </ProductRating>

        <ProductPrice>
          <div>
            <span className="price">₹{product.price.toLocaleString()}</span>
            {originalPrice && (
              <span className="original-price">₹{originalPrice.toLocaleString()}</span>
            )}
          </div>
          {discount > 0 && <div className="discount">{discount}% OFF</div>}
        </ProductPrice>

        <ProductActions>
          <Button 
            variant="outline" 
            size="small" 
            className="quick-view-btn"
            onClick={handleQuickView}
          >
            Quick View
          </Button>
          <Button 
            size="small"
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </Button>
        </ProductActions>
      </ProductInfo>
    </ProductCardWrapper>
  );
};

export default ProductCard;