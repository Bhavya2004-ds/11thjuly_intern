// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'artisan' | 'buyer' | 'admin';
  profileImage?: string;
  createdAt: Date;
  isVerified: boolean;
}

export interface ArtisanProfile extends User {
  role: 'artisan';
  businessName: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  specializations: string[];
  yearsOfExperience: number;
  rating: number;
  totalSales: number;
}

// Product related types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  subCategory: string;
  artisanId: string;
  artisan?: ArtisanProfile;
  materials: string[];
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
  stock: number;
  isCustomizable: boolean;
  craftingTime: number; // in days
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Cart and Order types
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customizations?: Record<string, any>;
  totalPrice: number;
}

export interface Order {
  id: string;
  buyerId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
  estimatedDelivery: Date;
}

// Address type
export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault?: boolean;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Filter and search types
export interface ProductFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
  rating?: number;
  materials?: string[];
  isCustomizable?: boolean;
  sortBy?: 'price_low' | 'price_high' | 'rating' | 'newest' | 'popular';
}