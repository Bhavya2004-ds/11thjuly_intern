import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowRight, Star, Users, Award, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container, Button, Card, colors, FlexBox, Grid } from '../styles/GlobalStyles';
import { Product } from '../types';

const HeroSection = styled.section`
  background: linear-gradient(135deg, rgba(184, 134, 11, 0.9) 0%, rgba(205, 133, 63, 0.8) 100%), 
              url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="handicraft" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="2" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23handicraft)"/></svg>');
  background-size: cover;
  background-position: center;
  min-height: 600px;
  display: flex;
  align-items: center;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="M20,20 Q50,5 80,20 Q95,50 80,80 Q50,95 20,80 Q5,50 20,20" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/></svg>');
    background-size: 200px 200px;
    animation: float 20s infinite linear;
  }

  @keyframes float {
    0% { transform: translateX(-200px) translateY(-200px); }
    100% { transform: translateX(100px) translateY(100px); }
  }

  @media (max-width: 768px) {
    min-height: 500px;
    text-align: center;
  }
`;

const HeroContent = styled(Container)`
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 32px;
  max-width: 600px;
  opacity: 0.95;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 0 auto 32px;
  }
`;

const HeroActions = styled(FlexBox)`
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Section = styled.section`
  padding: 80px 0;

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;

  h2 {
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
    margin-bottom: 40px;
    
    h2 {
      font-size: 2rem;
    }
    
    p {
      font-size: 1rem;
    }
  }
`;

const StatsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
  margin: 60px 0;
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: 40px 20px;

  .icon {
    width: 60px;
    height: 60px;
    background: ${colors.primary};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: white;
  }

  .number {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${colors.primary};
    margin-bottom: 8px;
  }

  .label {
    color: ${colors.neutral.dark};
    font-weight: 500;
  }
`;

const ProductGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const ProductCard = styled(Card)`
  padding: 0;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  }

  .image {
    height: 220px;
    background: linear-gradient(45deg, ${colors.neutral.light}, ${colors.neutral.medium});
    position: relative;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background: ${colors.accent};
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .content {
    padding: 20px;

    .category {
      color: ${colors.primary};
      font-size: 12px;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: ${colors.neutral.black};
    }

    .artisan {
      color: ${colors.neutral.dark};
      font-size: 14px;
      margin-bottom: 12px;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 12px;
      font-size: 14px;
    }

    .price {
      font-size: 20px;
      font-weight: 700;
      color: ${colors.primary};
    }
  }
`;

const CategoryGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
`;

const CategoryCard = styled(Card)`
  text-align: center;
  padding: 40px 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(184, 134, 11, 0.2);
    
    .icon {
      transform: scale(1.1);
    }
  }

  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight});
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    color: white;
    font-size: 2rem;
    transition: transform 0.3s ease;
  }

  .name {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
    color: ${colors.neutral.black};
  }

  .count {
    color: ${colors.neutral.dark};
    font-size: 14px;
  }
`;

const TestimonialSection = styled(Section)`
  background: ${colors.neutral.light};
`;

const TestimonialCard = styled(Card)`
  text-align: center;
  padding: 40px 30px;

  .quote {
    font-style: italic;
    font-size: 16px;
    margin-bottom: 24px;
    color: ${colors.neutral.black};
  }

  .author {
    font-weight: 600;
    margin-bottom: 4px;
  }

  .title {
    color: ${colors.neutral.dark};
    font-size: 14px;
  }
`;

// Mock data - in a real app, this would come from an API
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Handwoven Silk Saree',
    description: 'Beautiful traditional Banarasi silk saree with intricate gold zari work',
    price: 15999,
    images: ['https://via.placeholder.com/300x200?text=Silk+Saree'],
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
    images: ['https://via.placeholder.com/300x200?text=Brass+Bowl'],
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
    images: ['https://via.placeholder.com/300x200?text=Wooden+Elephant'],
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
  }
];

const categories = [
  { name: 'Textiles', icon: '🧵', count: 245 },
  { name: 'Pottery', icon: '🏺', count: 189 },
  { name: 'Jewelry', icon: '💍', count: 156 },
  { name: 'Wood Craft', icon: '🪵', count: 134 },
  { name: 'Metal Work', icon: '⚒️', count: 98 },
  { name: 'Paintings', icon: '🎨', count: 67 }
];

const testimonials = [
  {
    quote: "The quality of craftsmanship is absolutely stunning. Each piece tells a story and brings such warmth to our home.",
    author: "Priya Sharma",
    title: "Interior Designer"
  },
  {
    quote: "As an artisan myself, I appreciate platforms like CraftBazaar that help preserve traditional skills while reaching global markets.",
    author: "Ramesh Kumar",
    title: "Master Craftsman"
  },
  {
    quote: "The authentic pieces I've purchased have become conversation starters. The stories behind each craft make them so special.",
    author: "Sarah Johnson",
    title: "Art Collector"
  }
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${encodeURIComponent(categoryName.toLowerCase())}`);
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Discover Authentic Indian Handicrafts</HeroTitle>
          <HeroSubtitle>
            Connect with skilled artisans and bring home unique, handcrafted treasures 
            that carry centuries of tradition and artistry.
          </HeroSubtitle>
          <HeroActions>
            <Button size="large" onClick={() => navigate('/products')}>
              Explore Products <ArrowRight size={20} />
            </Button>
            <Button variant="outline" size="large" onClick={() => navigate('/artisans')}>
              Meet Our Artisans
            </Button>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <Section>
        <Container>
          <StatsGrid>
            <StatCard>
              <div className="icon">
                <Users size={24} />
              </div>
              <div className="number">2,500+</div>
              <div className="label">Skilled Artisans</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <Award size={24} />
              </div>
              <div className="number">12,000+</div>
              <div className="label">Products Listed</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <Globe size={24} />
              </div>
              <div className="number">50+</div>
              <div className="label">Countries Served</div>
            </StatCard>
            <StatCard>
              <div className="icon">
                <Star size={24} />
              </div>
              <div className="number">4.8</div>
              <div className="label">Average Rating</div>
            </StatCard>
          </StatsGrid>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader>
            <h2>Featured Products</h2>
            <p>Discover our handpicked selection of exceptional crafts from talented artisans</p>
          </SectionHeader>
          
          <ProductGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                <div className="image">
                  <img src={product.images[0]} alt={product.name} />
                  {product.isCustomizable && <div className="badge">Customizable</div>}
                </div>
                <div className="content">
                  <div className="category">{product.category}</div>
                  <div className="name">{product.name}</div>
                  <div className="artisan">by Master Craftsman</div>
                  <div className="rating">
                    <Star size={14} fill="currentColor" color={colors.warning} />
                    <span>{product.rating}</span>
                    <span style={{ color: colors.neutral.dark }}>({product.reviewCount} reviews)</span>
                  </div>
                  <div className="price">₹{product.price.toLocaleString()}</div>
                </div>
              </ProductCard>
            ))}
          </ProductGrid>

          <FlexBox justify="center" style={{ marginTop: '40px' }}>
            <Button onClick={() => navigate('/products')}>
              View All Products <ArrowRight size={16} />
            </Button>
          </FlexBox>
        </Container>
      </Section>

      <Section style={{ backgroundColor: colors.neutral.light }}>
        <Container>
          <SectionHeader>
            <h2>Browse by Category</h2>
            <p>Explore different craft traditions and find what speaks to your heart</p>
          </SectionHeader>
          
          <CategoryGrid>
            {categories.map((category) => (
              <CategoryCard 
                key={category.name} 
                onClick={() => handleCategoryClick(category.name)}
              >
                <div className="icon">{category.icon}</div>
                <div className="name">{category.name}</div>
                <div className="count">{category.count} products</div>
              </CategoryCard>
            ))}
          </CategoryGrid>
        </Container>
      </Section>

      <TestimonialSection>
        <Container>
          <SectionHeader>
            <h2>What Our Community Says</h2>
            <p>Real stories from artisans and customers who make our marketplace special</p>
          </SectionHeader>
          
          <Grid columns={1} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <TestimonialCard>
              <div className="quote">"{testimonials[currentTestimonial].quote}"</div>
              <div className="author">{testimonials[currentTestimonial].author}</div>
              <div className="title">{testimonials[currentTestimonial].title}</div>
            </TestimonialCard>
          </Grid>

          <FlexBox justify="center" gap="8px" style={{ marginTop: '30px' }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: index === currentTestimonial ? colors.primary : colors.neutral.medium,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              />
            ))}
          </FlexBox>
        </Container>
      </TestimonialSection>
    </>
  );
};

export default HomePage;