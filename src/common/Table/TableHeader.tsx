import React from 'react';

function TableHeader({ tableHeaders }: { tableHeaders: string[] }) {
  return (
    <thead className='font-bold text-sm text-[#5B5B5B] uppercase  bg-gray-200'>
      <tr>
        {tableHeaders.map((header) =>
          header !== '_id' ? (
            <th className='px-3 py-3' scope='col' key={header}>
              {/* Convert camel cased header to words */}
              {header?.replace(/([a-z])([A-Z])/g, '$1 $2')?.toLowerCase()}
            </th>
          ) : (
            <th className='px-3 py-3' scope='col' key={header}></th>
          )
        )}
      </tr>
    </thead>
  );
}

export default TableHeader;
