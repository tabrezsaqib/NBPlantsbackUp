/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable camelcase */

import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Menu } from '@mui/icons-material';
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { fetchAllPlantPosts } from "../../redux/actions/getPlantsAction"

import SearchForm from "../search/SearchForm"

const drawerWidth = 300;

function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch()
  const { all_plants } = useSelector(state => state.post)

  useEffect(() => {
    if (all_plants.length <= 0)
      dispatch(fetchAllPlantPosts())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Link href="/home" as="/home" legacyBehavior>
        <a>
          <img
            src="../../images/logo.png"
            alt="new brunswick plants logo"
          />
        </a>
      </Link>
      <Divider />
      <List>

        <Link href='/home' as="/home" legacyBehavior>
          <ListItem key='home' disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <a >Home</a>
            </ListItemButton>
          </ListItem>
        </Link>
        <Link href='/plants/?type=all' as="/plants/?type=all" legacyBehavior>
          <ListItem key='plants' disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <a >Species</a>
            </ListItemButton>
          </ListItem>
        </Link>
            <Link href='/plantFamilies' as="/plantFamilies" legacyBehavior>
        <ListItem key='plantFamilies' disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
              <a >Families</a>
          </ListItemButton>
        </ListItem>
            </Link>
            <Link href='/about' as="/about" legacyBehavior>
        <ListItem key='about' disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
              <a >About</a>
          </ListItemButton>
        </ListItem>
            </Link>
        <ListItem key='about' disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
            <SearchForm />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="inherit" component="nav">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' ,minHeight: '74px'}}>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Link href="/home" as="/home" legacyBehavior>
            <a>
              <img
                src="../../images/logo.png"
                alt="new brunswick plants logo"
              />
            </a>
          </Link>
          <Box sx={{ display: { sm: 'none', xs: 'none', md: 'block', float: 'right' } }}>
            <Button color="success" key="home" sx={{ color: 'black', textTransform: 'none' }}>
              <Link href='/home' as="/home" legacyBehavior>
                <a style={{ color: 'inherit' }}>Home</a>
              </Link>
            </Button>
            <Button color="success" key="plants" sx={{ color: 'black', textTransform: 'none' }}>
              <Link href='/plants/?type=all' as="/plants/?type=all" legacyBehavior>
                <a style={{ color: 'inherit' }} > Species</a>
              </Link>
            </Button>
            <Button color="success" key="plantFamilies" sx={{ color: 'black', textTransform: 'none' }}>
              <Link href='/plantFamilies' as="/plantFamilies" legacyBehavior>
                <a style={{ color: 'inherit' }} >Families</a>
              </Link>
            </Button>
            <Button color="success" key="about" sx={{ color: 'black', textTransform: 'none' }}>
              <Link href='/about' as="/about" legacyBehavior>
                <a style={{ color: 'inherit' }} >About</a>
              </Link>
            </Button>
            <span style={{ display: 'inline-flex' }}>
              <SearchForm />
            </span>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: 'block', xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box >
  );
}

export default Navbar;