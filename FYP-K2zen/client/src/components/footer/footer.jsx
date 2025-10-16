import { Box, Typography, TextField, Button, Link as MuiLink } from "@mui/material";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import "./footer.scss";
// import LOGO from '../../assets/logo/k2zenLogo.png';

export default function Footer() {
  return (
    <Box component="footer" className="site-footer">
      <Box className="footer-top">
        <Box className="footer-brand">
          <Typography variant="h5" className="logo">
            {/* <img src={LOGO} alt="" /> */}
            K2zen Adventures
          </Typography>
          <Typography variant="body2" className="tagline">
            Experience Beyond Limits.
          </Typography>
        </Box>

        <Box className="footer-links">
          <Box>
            <Typography variant="subtitle1">Quick Links</Typography>
            <MuiLink href="/" className="footer-link">Home</MuiLink>
            <MuiLink href="/tours" className="footer-link">Tours</MuiLink>
            <MuiLink href="/about" className="footer-link">About Us</MuiLink>
            <MuiLink href="/contact" className="footer-link">Contact</MuiLink>
          </Box>
          <Box>
            <Typography variant="subtitle1">Categories</Typography>
            <MuiLink href="/tour-category/gilgit-baltistan" className="footer-link">Gilgit–Baltistan</MuiLink>
            <MuiLink href="/tour-category/family-friendly" className="footer-link">Family Tours</MuiLink>
            <MuiLink href="/blog" className="footer-link">Blog</MuiLink>
          </Box>
        </Box>

        <Box className="newsletter-social">
          <Typography variant="subtitle1">Subscribe</Typography>
          <Box className="newsletter-form">
            <TextField placeholder="Your email" variant="filled" size="small" />
            <Button variant="contained" color='success'>Subscribe</Button>
          </Box>
          <Box className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaYoutube /></a>
          </Box>
        </Box>
      </Box>

      <Box className="footer-bottom">
        <Typography variant="body2">
          © {new Date().getFullYear()} K2zen Adventures. All rights reserved.
        </Typography>
        <MuiLink href="/privacy" className="footer-legal">Privacy Policy</MuiLink>
        <MuiLink href="/terms" className="footer-legal">Terms & Conditions</MuiLink>
      </Box>
    </Box>
  );
}
