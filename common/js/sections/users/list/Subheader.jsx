import React from 'react';

import BreadcrumbComponent from 'components/common/Breadcrumb';

const UserSubheaderSection = () => {
  const breadcrumbItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/user/list', label: 'Users' },
    { label: 'All' },
  ];
  return (
    <section>
      <BreadcrumbComponent breadcrumbItems={breadcrumbItems} />
      <div className="cf">
        <div className="w-40 fl">
          <h1 className="fw4 mv0 f3 lh-title">Users</h1>
          <p className="mv0 lh-copy f6">View & manage all users</p>
        </div>
        <div className="w-60 fl tr pt2 mt1">
        </div>
      </div>
    </section>
  );
};

export default UserSubheaderSection;
