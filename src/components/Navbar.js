import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Popover from '@mui/material/Popover';
import { styled, alpha } from '@mui/material/styles';

const CategorySelect = styled('select')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  padding: theme.spacing(1),
  color: 'inherit',
  border: 'none',
  '&:focus': {
    outline: 'none',
  },
  height: '55px',
}));

function Navbar() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All'); // Default category is 'All'

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8080/products');
        if (!response.ok) {
          throw new Error(`Network response was not ok (Status: ${response.status})`);
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Response is not JSON');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const handleInputChange = (event, newValue) => {
    setSearchValue(newValue);
  };

  const handleSearch = () => {
    if (selectedCategory === 'All') {
      navigate(`/search`);
    } else {
      navigate(`/search/${selectedCategory}`);
    }
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  // Create a filteredProducts array to store products of the selected category
  const filteredProducts = products.filter((product) => {
    // If the selectedCategory is 'All', show all products
    if (selectedCategory === 'All') {
      return true;
    }
    // Otherwise, filter products based on the selected category
    return product.Category === selectedCategory;
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to handle item click and navigate to the product page
  const handleItemClick = (Product_Name) => {
    navigate(`/product/${Product_Name}`);
  };

  return (
    <div id="navbar" className="navbar-container">
      <div className="navbar-left">
        <IconButton color="inherit" onClick={() => navigate('/')}>
          <HomeIcon/>
        </IconButton>
      </div>
    
      <div className="navbar-middle">
        <IconButton color="inherit" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>

        <Autocomplete
          id="search-input"
          options={filteredProducts.map((product) => product.Product_Name)}
          freeSolo
          onInputChange={handleInputChange}
          onChange={(event, newValue) => {
            if (newValue) {
              handleItemClick(newValue);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for products..."
              variant="outlined"
              fullWidth
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="search-input"
            />
          )}
        />
      
        <CategorySelect
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="All">All Categories</option>
          <option value="Landscapes">Landscapes</option>
          <option value="Cityscapes">Cityscapes</option>
          <option value="Characters">Characters</option>
        </CategorySelect>
      </div>

      <div className="navbar-right">
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/ordersummary')}>
          <ShoppingCartIcon />
        </IconButton>
      </div>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseProfile}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            marginTop: '8px', // Adjust the value to control the vertical position
          },
        }}
        className="profile-dropdown"
      >
        <div>
          <Link to="/profile/about" onClick={handleCloseProfile}>
            About
          </Link>
          <Link to="/transaction" onClick={handleCloseProfile}>
            Transactions
          </Link>
        </div>
      </Popover>
    </div>
  );
}

export default Navbar;
