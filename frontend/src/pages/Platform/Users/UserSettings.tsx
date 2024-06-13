import React from "react";
import AdminSettingsPanel from "./AdminSettingsPanel";
import UserSettingsPanel from "./UserSettingsPanel";

const UserSettings: React.FC = () => {
  return (
    <div>
      {
        sessionStorage.getItem('air-user-id') === 'admin' ? (
          <AdminSettingsPanel/>
        ) : <UserSettingsPanel/>
      }
    </div>
  );
}

export default UserSettings;