import { NavLink } from "react-router-dom";

function SettingsSidebar() {
  return (
    <ul
      style={{
        listStyle: "none",
        backgroundColor: "#f0f0f0",
        padding: "10px",
        borderRadius: "5px",
        height: "100vh",
      }}
    >
      <li>
        <NavLink to="profile">Hồ sơ</NavLink>
      </li>
      <li>
        <NavLink to="password">Mật khẩu</NavLink>
      </li>
      <li>
        <NavLink to="security">Xác thực</NavLink>
      </li>
    </ul>
  );
}

export default SettingsSidebar;
