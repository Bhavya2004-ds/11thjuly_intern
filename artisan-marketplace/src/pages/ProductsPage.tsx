import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Filter, Grid, List, Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { 
  Container, 
  Button, 
  Input, 
  Select, 
  Card,
  FlexBox,
  Grid as StyledGrid,
  colors 
} from '../styles/GlobalStyles';
import ProductCard from '../components/products/ProductCard';
import { Product, ProductFilters } from '../types';

const ProductsPageWrapper = styled.div`
  background: ${colors.neutral.light};
  min-height: calc(100vh - 80px);
  padding: 40px 0;

  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const PageHeader = styled.div`
  background: white;
  padding: 40px 0;
  margin-bottom: 40px;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    color: ${colors.neutral.black};
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    color: ${colors.neutral.dark};
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    padding: 30px 0;
    margin-bottom: 30px;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }
`;

const FiltersAndResults = styled(Container)`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FiltersSidebar = styled.aside<{ isOpen: boolean }>`
  @media (max-width: 968px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 320px;
    background: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease;
    overflow-y: auto;
    padding: 20px;
  }
`;

const FiltersOverlay = styled.div<{ isOpen: boolean }>`
  display: none;
  
  @media (max-width: 968px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const FilterSection = styled(Card)`
  margin-bottom: 24px;
  padding: 20px;

  h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
    color: ${colors.neutral.black};
  }
`;

const FilterGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: ${colors.neutral.black};
    font-size: 14px;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;

    input[type="checkbox"] {
      accent-color: ${colors.primary};
    }
  }
`;

const PriceRange = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  input[type="number"] {
    flex: 1;
    padding: 8px 12px;
    border: 2px solid ${colors.neutral.medium};
    border-radius: 6px;
    font-size: 14px;

    &:focus {
      border-color: ${colors.primary};
      outline: none;
    }
  }

  span {
    color: ${colors.neutral.dark};
    font-size: 14px;
  }
`;

const ResultsSection = styled.div``;

const ResultsHeader = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .count {
    font-weight: 600;
    color: ${colors.neutral.black};
  }

  .mobile-filter-btn {
    display: none;
    
    @media (max-width: 968px) {
      display: flex;
    }
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 2px solid ${colors.neutral.medium};
  border-radius: 8px;
  overflow: hidden;

  button {
    padding: 8px 12px;
    border: none;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: ${colors.primary};
      color: white;
    }

    &:hover:not(.active) {
      background: ${colors.neutral.light};
    }
  }
`;

const SortControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  label {
    font-size: 14px;
    color: ${colors.neutral.dark};
  }

  select {
    padding: 8px 12px;
    border: 2px solid ${colors.neutral.medium};
    border-radius: 6px;
    background: white;
    cursor: pointer;

    &:focus {
      border-color: ${colors.primary};
      outline: none;
    }
  }
`;

const ProductsGrid = styled(StyledGrid)<{ view: 'grid' | 'list' }>`
  grid-template-columns: ${props => 
    props.view === 'grid' 
      ? 'repeat(auto-fill, minmax(280px, 1fr))'
      : '1fr'
  };
  gap: ${props => props.view === 'grid' ? '24px' : '16px'};
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${colors.neutral.dark};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  
  h3 {
    font-size: 1.5rem;
    color: ${colors.neutral.black};
    margin-bottom: 12px;
  }
  
  p {
    color: ${colors.neutral.dark};
    margin-bottom: 24px;
  }
`;

// Mock product data - in a real app, this would come from an API
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handwoven Silk Saree',
    description: 'Beautiful traditional Banarasi silk saree with intricate gold zari work',
    price: 15999,
    images: ['https://via.placeholder.com/300x240?text=Silk+Saree'],
    category: 'Textiles',
    subCategory: 'Sarees',
    artisanId: '1',
    materials: ['Silk', 'Gold Zari'],
    dimensions: { length: 550, width: 115, height: 1, weight: 500 },
    stock: 5,
    isCustomizable: true,
    craftingTime: 30,
    tags: ['traditional', 'wedding', 'luxury'],
    rating: 4.8,
    reviewCount: 24,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Brass Decorative Bowl',
    description: 'Handcrafted brass bowl with traditional etched patterns',
    price: 2499,
    images: ['https://via.placeholder.com/300x240?text=Brass+Bowl'],
    category: 'Home Decor',
    subCategory: 'Bowls',
    artisanId: '2',
    materials: ['Brass'],
    dimensions: { length: 25, width: 25, height: 8, weight: 800 },
    stock: 12,
    isCustomizable: false,
    craftingTime: 7,
    tags: ['decorative', 'traditional', 'dining'],
    rating: 4.6,
    reviewCount: 18,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Wooden Carved Elephant',
    description: 'Intricately carved rosewood elephant figurine',
    price: 3999,
    images: ['https://via.placeholder.com/300x240?text=Wooden+Elephant'],
    category: 'Sculptures',
    subCategory: 'Animal Figurines',
    artisanId: '3',
    materials: ['Rosewood'],
    dimensions: { length: 20, width: 12, height: 18, weight: 1200 },
    stock: 3,
    isCustomizable: true,
    craftingTime: 14,
    tags: ['sculpture', 'decorative', 'gift'],
    rating: 4.9,
    reviewCount: 31,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Add more mock products for demo purposes
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `${i + 4}`,
    name: `Handcrafted Item ${i + 4}`,
    description: 'Beautiful handcrafted item with traditional techniques',
    price: Math.floor(Math.random() * 10000) + 1000,
    images: [`https://via.placeholder.com/300x240?text=Product+${i + 4}`],
    category: ['Textiles', 'Pottery', 'Jewelry', 'Wood Craft'][Math.floor(Math.random() * 4)],
    subCategory: 'Traditional',
    artisanId: `${i + 4}`,
    materials: ['Cotton', 'Clay', 'Silver', 'Wood'][Math.floor(Math.random() * 4)],
    dimensions: { length: 20, width: 15, height: 10, weight: 300 },
    stock: Math.floor(Math.random() * 20) + 1,
    isCustomizable: Math.random() > 0.5,
    craftingTime: Math.floor(Math.random() * 30) + 5,
    tags: ['traditional', 'handmade'],
    rating: 4 + Math.random(),
    reviewCount: Math.floor(Math.random() * 50) + 5,
    createdAt: new Date(),
    updatedAt: new Date()
  }))
];

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    const query = searchParams.get('q');
    
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    }
    if (query) {
      setSearchQuery(query);
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === filters.category?.toLowerCase()
      );
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(product => 
        product.price >= (filters.priceRange?.min || 0) &&
        product.price <= (filters.priceRange?.max || Infinity)
      );
    }

    // Apply materials filter
    if (filters.materials && filters.materials.length > 0) {
      filtered = filtered.filter(product =>
        product.materials.some(material =>
          filters.materials?.includes(material)
        )
      );
    }

    // Apply customizable filter
    if (filters.isCustomizable !== undefined) {
      filtered = filtered.filter(product => 
        product.isCustomizable === filters.isCustomizable
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(product => product.rating >= filters.rating!);
    }

    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price_low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          break;
        case 'popular':
          filtered.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
      }
    }

    return filtered;
  }, [mockProducts, searchQuery, filters]);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL params
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      newParams.set('q', searchQuery.trim());
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
    setSearchParams({});
  };

  if (isLoading) {
    return (
      <ProductsPageWrapper>
        <Container>
          <LoadingState>
            <p>Loading products...</p>
          </LoadingState>
        </Container>
      </ProductsPageWrapper>
    );
  }

  return (
    <ProductsPageWrapper>
      <PageHeader>
        <Container>
          <h1>Handicrafts Collection</h1>
          <p>Discover authentic handcrafted treasures from skilled artisans across India</p>
        </Container>
      </PageHeader>

      <FiltersOverlay isOpen={isFiltersOpen} onClick={() => setIsFiltersOpen(false)} />
      
      <FiltersAndResults>
        <FiltersSidebar isOpen={isFiltersOpen}>
          <FlexBox justify="space-between" align="center" style={{ marginBottom: '20px' }}>
            <h2>Filters</h2>
            <Button 
              variant="ghost" 
              size="small"
              onClick={() => setIsFiltersOpen(false)}
              style={{ display: 'none' }}
              className="mobile-close-btn"
            >
              <X size={20} />
            </Button>
          </FlexBox>

          {/* Search Filter */}
          <FilterSection>
            <h3>Search</h3>
            <form onSubmit={handleSearchSubmit}>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </FilterSection>

          {/* Category Filter */}
          <FilterSection>
            <h3>Category</h3>
            <CheckboxGroup>
              {['Textiles', 'Pottery', 'Jewelry', 'Wood Craft', 'Metal Work', 'Sculptures'].map(category => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={filters.category === category}
                    onChange={(e) => handleFilterChange('category', e.target.checked ? category : undefined)}
                  />
                  {category}
                </label>
              ))}
            </CheckboxGroup>
          </FilterSection>

          {/* Price Range Filter */}
          <FilterSection>
            <h3>Price Range</h3>
            <PriceRange>
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange?.min || ''}
                onChange={(e) => handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  min: e.target.value ? parseInt(e.target.value) : undefined
                })}
              />
              <span>to</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange?.max || ''}
                onChange={(e) => handleFilterChange('priceRange', {
                  ...filters.priceRange,
                  max: e.target.value ? parseInt(e.target.value) : undefined
                })}
              />
            </PriceRange>
          </FilterSection>

          {/* Materials Filter */}
          <FilterSection>
            <h3>Materials</h3>
            <CheckboxGroup>
              {['Silk', 'Cotton', 'Brass', 'Wood', 'Clay', 'Silver'].map(material => (
                <label key={material}>
                  <input
                    type="checkbox"
                    checked={filters.materials?.includes(material) || false}
                    onChange={(e) => {
                      const materials = filters.materials || [];
                      if (e.target.checked) {
                        handleFilterChange('materials', [...materials, material]);
                      } else {
                        handleFilterChange('materials', materials.filter(m => m !== material));
                      }
                    }}
                  />
                  {material}
                </label>
              ))}
            </CheckboxGroup>
          </FilterSection>

          {/* Rating Filter */}
          <FilterSection>
            <h3>Minimum Rating</h3>
            <Select
              value={filters.rating || ''}
              onChange={(e) => handleFilterChange('rating', e.target.value ? parseFloat(e.target.value) : undefined)}
            >
              <option value="">Any Rating</option>
              <option value="4">4+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </Select>
          </FilterSection>

          {/* Customizable Filter */}
          <FilterSection>
            <h3>Other Options</h3>
            <CheckboxGroup>
              <label>
                <input
                  type="checkbox"
                  checked={filters.isCustomizable || false}
                  onChange={(e) => handleFilterChange('isCustomizable', e.target.checked || undefined)}
                />
                Customizable
              </label>
            </CheckboxGroup>
          </FilterSection>

          <Button variant="outline" fullWidth onClick={clearFilters}>
            Clear All Filters
          </Button>
        </FiltersSidebar>

        <ResultsSection>
          <ResultsHeader>
            <ResultsInfo>
              <Button
                variant="outline"
                size="small"
                className="mobile-filter-btn"
                onClick={() => setIsFiltersOpen(true)}
              >
                <SlidersHorizontal size={16} />
                Filters
              </Button>
              <span className="count">
                {filteredProducts.length} products found
              </span>
            </ResultsInfo>

            <FlexBox gap="16px">
              <ViewToggle>
                <button
                  className={view === 'grid' ? 'active' : ''}
                  onClick={() => setView('grid')}
                >
                  <Grid size={16} />
                </button>
                <button
                  className={view === 'list' ? 'active' : ''}
                  onClick={() => setView('list')}
                >
                  <List size={16} />
                </button>
              </ViewToggle>

              <SortControls>
                <label>Sort by:</label>
                <select
                  value={filters.sortBy || ''}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value || undefined)}
                >
                  <option value="">Relevance</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </SortControls>
            </FlexBox>
          </ResultsHeader>

          {filteredProducts.length === 0 ? (
            <EmptyState>
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </EmptyState>
          ) : (
            <ProductsGrid view={view}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onWishlistToggle={(id) => console.log('Toggle wishlist:', id)}
                  onAddToCart={(id) => console.log('Add to cart:', id)}
                />
              ))}
            </ProductsGrid>
          )}
        </ResultsSection>
      </FiltersAndResults>

      <style jsx>{`
        @media (max-width: 968px) {
          .mobile-close-btn {
            display: flex !important;
          }
        }
      `}</style>
    </ProductsPageWrapper>
  );
};

export default ProductsPage;