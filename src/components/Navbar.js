import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Box, Toolbar, Typography, InputBase,
    MenuItem, Popper, Paper, ClickAwayListener, Select, IconButton, Menu
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';

import digitalAssets from './data';

export default function Navbar() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const profileOpen = Boolean(profileAnchorEl);

    const handleProfileClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileClose = () => {
        setProfileAnchorEl(null);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const regex = value ? new RegExp(`^${value}`, 'i') : /.*/;

        let filtered;
        if (category) {
            filtered = digitalAssets.filter(asset => asset.category === category && regex.test(asset.title));
        } else {
            filtered = digitalAssets.filter(asset => regex.test(asset.title));
        }

        setSuggestions(filtered.slice(0, 5));

        if (value) {
            setAnchorEl(e.currentTarget);
        } else {
            setAnchorEl(null);
        }
    };

    const handleSuggestionClick = (title) => {
        setSearchTerm(title);
        setSuggestions([]);
        navigate(`/search/${title}`);
    };

    const handleShowAll = () => {
        if (category) {
            navigate(`/search/category/${category}`);
        } else {
            navigate(`/search/all`);
        }
    };

    const handleSearchClick = () => {
        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
        } else if (category) {
            navigate(`/search/category/${category}`);
        } else {
            navigate(`/search/all`);
        }
    };

    const categories = Array.from(new Set(digitalAssets.map(asset => asset.category)));

    const [typewriterIndex, setTypewriterIndex] = useState(0);
    const placeholderText = "Type in your product or Choose your category and click search icon!!";

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTypewriterIndex(prevIndex => (prevIndex + 1) % (placeholderText.length + 1));
        }, 100);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const currentPlaceholder = placeholderText.slice(0, typewriterIndex);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton color="inherit" onClick={() => navigate('/')}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{ marginLeft: 10 }}>
                        Digital Art Marketplace
                    </Typography>
                    <Select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        displayEmpty
                        style={{ marginLeft: 10 }}
                    >
                        <MenuItem value="">
                            <em>All Categories</em>
                        </MenuItem>
                        {categories.map(cat => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </Select>
                    <InputBase
                        placeholder={currentPlaceholder}
                        value={searchTerm}
                        onChange={handleInputChange}
                        style={{ marginLeft: 10, flex: 1 }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                    <IconButton color="inherit" onClick={handleSearchClick} style={{ marginLeft: 10 }}>
                        <SearchIcon />
                    </IconButton>
                    <IconButton color="inherit" onClick={handleProfileClick}>
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        anchorEl={profileAnchorEl}
                        open={profileOpen}
                        onClose={handleProfileClose}
                    >
                        <MenuItem onClick={() => navigate('/profile/about')}>About</MenuItem>
                        <MenuItem onClick={() => navigate('/transaction')}>Transactions</MenuItem>
                    </Menu>
                    <IconButton color="inherit" onClick={() => navigate('/ordersummary')}>
                        <ShoppingCartIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={() => setSuggestions([])}>
                    <Paper>
                        {suggestions.map(suggestion => (
                            <MenuItem key={suggestion.id} onClick={() => handleSuggestionClick(suggestion.title)}>
                                {suggestion.title}
                            </MenuItem>
                        ))}
                        {suggestions.length > 0 && (
                            <MenuItem onClick={handleShowAll}>Show All</MenuItem>
                        )}
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </Box>
    );
}
