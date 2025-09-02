import React from 'react';
import { BasicTable } from '../../components/My Components/Table/BasicTable';
import { Get } from '../../services/BasicHttpServices';
import { PaginationType } from '../../types/PaginationType';
import { PageHeader } from '../../components';

const UserList: React.FC = () => {
  const transformUserData = (data: PaginationType): PaginationType => {
    return {
      ...data,
      data: data.data.map((item) => ({
        ...item,
        isActive:
          item.isActive == 'True'
            ? 'Active'
            : item.isActive == 'False'
              ? 'InActive'
              : 'N/A',
      })),
    };
  };

  return (
    <>
      <PageHeader title="User list" />

      <BasicTable
        api={'User'}
        displayData={['name', 'password', 'permission', 'isActive', 'id']}
        fetch={async (url) => {
          const response = await Get(url);
          return transformUserData(response);
        }}
        // actionComponent={UserTableAction}
      />
    </>
  );
};

export default UserList;
