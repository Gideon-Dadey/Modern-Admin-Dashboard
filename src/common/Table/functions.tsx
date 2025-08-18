import TableMenu from './TableMenu';
import { menuItemType } from './types';

export const formatTableValue = ({
  value,
  headerName,
  menuItems,
}: {
  value: string;
  headerName: string;
  menuItems?: menuItemType[];
}) => {
  // Boolean Check
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  // Capitalize Check
  if (['email'].includes(headerName)) {
    // should not be capitalized
    return value;
  }

  // Data check
  if (['createdAt'].includes(headerName)) {
    return new Date(value).toDateString();
  }

  // Array check
  if (Array.isArray(value)) {
    return <span className='capitalize'>{value.join(', ')}</span>;
  }

  // Object check
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    return (
      <span className='capitalize'>
        {(value['fullname'] || value['name'] || Object.values(value)[0]) as string}
      </span>
    );
  }

  // Status Check
  if (headerName === 'status') {
    let color = '';

    switch (value) {
      case 'open':
        color = 'green';
        break;
      case 'completed':
        color = 'green';
        break;
      case 'pending':
        color = 'orange';
        break;
      case 'closed':
        color = 'red';
        break;
      case 'cancelled':
        color = 'red';
        break;

      default:
        color = 'black';
        break;
    }
    return (
      <span
        className='capitalize'
        style={{
          color,
        }}
      >
        {value}
      </span>
    );
  }

  // Menu ID check
  if (headerName === '_id') {
    return <TableMenu id={value} menuItems={menuItems} />;
  }

  return <span className='capitalize'>{value || '-'}</span>;
};
