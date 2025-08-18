import LoadingIndicator from '../LoadingIndicator';
import { TableProps } from './types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function Table({ loading, tableHeaders, data, menuItems }: TableProps) {
  return (
    <div className='overflow-x-auto w-full bg-white'>
      {loading ? (
        <div className='flex items-center justify-center p-10'>
          <LoadingIndicator />
        </div>
      ) : data && data.length ? (
        <table className='w-full text-left'>
          <TableHeader tableHeaders={tableHeaders} />
          <TableBody data={data} tableHeaders={tableHeaders} menuItems={menuItems} />
        </table>
      ) : (
        <div className='flex items-center justify-center p-10 font-bold'>
          No data found
        </div>
      )}
    </div>
  );
}

export default Table;
