import { Flex, Row } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div style={{ padding: "40px 0" }}>
      <div className="container">
        <Flex align="center">
          <div className="header__logo">
            <a href="/">
              <img
                style={{ width: "15%" }}
                src="https://img.freepik.com/free-vector/colorful-letter-a-gradient-logo-design_474888-2309.jpg"
                alt="logo"
              />
              панель админа AutoPart
            </a>
          </div>
          <div className="header__nav">
            <ul>
              <Row style={{ gap: "30px" }}>
                <li
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  <NavLink to="/">Home</NavLink>
                </li>

                <li
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  <NavLink to="/AdminPanel">AdminPanel</NavLink>
                </li>
              </Row>
            </ul>
          </div>
        </Flex>
      </div>
    </div>
  );
}

export default Header;
