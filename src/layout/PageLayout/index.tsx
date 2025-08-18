import React from 'react';
import PageHeader from './PageHeader';
import Table from '../../common/Table';
import { TableProps } from '../../common/Table/types';

interface Props {
  pageTitle: string;
  pageActions?: React.ReactNode;
  tableProps: TableProps;
}

function PageLayout({ pageTitle, pageActions, tableProps }: Props) {
  return (
    <>
      <PageHeader title={pageTitle} pageActions={pageActions} />
      <Table
        tableHeaders={tableProps.tableHeaders}
        data={tableProps.data}
        loading={tableProps.loading}
        menuItems={tableProps.menuItems}
      />
    </>
  );
}

export default PageLayout;
