import React from "react";
import SidebarLink from "./SidebarLink";
import SidebarCategory from "./SidebarCategory";

const SidebarContent = ({ onClick, currentUser }) => {
  const hideSidebar = () => {
    onClick();
  };

  return (
    <div className="sidebar__content">
      <ul className="sidebar__block">
        <SidebarLink
          id="dashboard-link"
          title="Dashboard"
          icon="tachometer-alt"
          className="sidebar__link"
          route="/dashboard"
          onClick={hideSidebar}
        />
        <SidebarCategory id="setting-link" title="Settings" icon="cog">
          <SidebarLink title="KYC" route="/kyc" onClick={hideSidebar} />
          <SidebarLink title="Profile" route="/profile" onClick={hideSidebar} />
        </SidebarCategory>

        {currentUser.role === 2 && currentUser.isVerified === "true" ? (
          <SidebarCategory
            id="customer-link"
            title="Customer List"
            icon="user-plus"
          >
            <SidebarLink
              title="Add Customer"
              route="/signup-customer"
              onClick={hideSidebar}
            />
            <SidebarLink
              title="Pending Verification"
              route="/unverified-customers"
              onClick={hideSidebar}
            />
          </SidebarCategory>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default SidebarContent;
