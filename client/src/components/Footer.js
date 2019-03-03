import React from "react";

const footerStyle = {
  position: "fixed",
  left: "0",
  bottom: "0",
  width: "100%",
  backgroundColor: "white",
  color: "black",
  textAlign: "center",
  zIndex: "100",
};

const Footer = React.memo(() => (
  <div>
    <footer style={footerStyle}>© copyright 2019</footer>
  </div>
));

export default Footer;
