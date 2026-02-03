import { Outlet } from "react-router-dom";
import SettingsSidebar from "../components/SettingsSidebar";

function SettingsLayout() {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200 }}>
        <SettingsSidebar />
      </aside>

      <main style={{ flex: 1, padding: 16 }}>
        <h1>Hello</h1>
        <Outlet />
      </main>
    </div>
  );
}

export default SettingsLayout;
