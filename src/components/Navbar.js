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

function Navbar() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

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
    navigate(`/search/${searchValue}`);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
  };

  return (
    <div id="navbar" className="navbar-container">
      <div className="navbar-left">
        <IconButton color="inherit" onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
      </div>
      <div className="navbar-middle">
        <Autocomplete
          id="search-input"
          options={products.map((product) => product.Product_Name)}
          freeSolo
          onInputChange={handleInputChange}
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
        <IconButton color="inherit" onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </div>
      <div className="navbar-right">
        <IconButton color="inherit" onClick={handleProfileClick}>
          <AccountCircleIcon />
        </IconButton>
        <IconButton color="inherit" onClick={() => navigate('/ordersummary')}>
          <ShoppingCartIcon />
        </IconButton>
      </div>

      {/* Profile dropdown */}
{/* Profile dropdown */}
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


      <Link to={`/search/${searchValue}`} onClick={handleSearch} className="search-link">
        Search
      </Link>
    </div>
  );
}

export default Navbar;





// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

// function Navbar() {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [searchValue, setSearchValue] = useState('');

//   useEffect(() => {
//     // Fetch products from the backend similar to what you did in HomePage.js
//     // You can create a function to fetch products and call it here
//     // For simplicity, let's assume you have a fetchProducts function that returns an array of products
//     // Replace 'fetchProducts' with your actual data fetching logic
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/products');

//         if (!response.ok) {
//           throw new Error(`Network response was not ok (Status: ${response.status})`);
//         }

//         const contentType = response.headers.get('content-type');
//         if (!contentType || !contentType.includes('application/json')) {
//           throw new Error('Response is not JSON');
//         }

//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setProducts([]);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleInputChange = (event, newValue) => {
//     setSearchValue(newValue);
//   };

//   const handleSearch = () => {
//     navigate(`/search/${searchValue}`);
//   };

//   return (
//     <div>
//       <Autocomplete
//         id="search-input"
//         options={products.map((product) => product.Product_Name)}
//         freeSolo
//         onInputChange={handleInputChange}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             label="Search for products..."
//             variant="outlined"
//             fullWidth
//             onKeyPress={(event) => {
//               if (event.key === 'Enter') {
//                 handleSearch();
//               }
//             }}
//           />
//         )}
//       />
//       <Link to={`/search/${searchValue}`} onClick={handleSearch}>
//         Search
//       </Link>
//     </div>
//   );
// }

// export default Navbar;





