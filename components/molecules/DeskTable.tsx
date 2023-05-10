import { FC } from 'react';

type Props = {
  seat_number: number;
  name?: string;
  connect?: boolean;
  turn_num?: number;
  status?: boolean;
};

const DeskTable: FC<Props> = ({ seat_number, name, connect = false, turn_num, status }) => {
  return seat_number === 0 && name === undefined ? (
    <td className='h-full row-span-1'>&nbsp;</td>
  ) : (
    <td className='w-full h-full row-span-1'>
      {!connect ? (
        <div className='w-full h-full flex'>
          <div
            className={`w-10/12 h-full flex justify-start items-end pl-2 border border-gray-400 relative ${
              turn_num ? 'bg-green-200' : ''
            }`}
          >
            {name ? name : <>&nbsp;</>}
            <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-700'>
              {turn_num ? turn_num : ''}
            </p>
          </div>
          <div className='w-2/12'>
            <p className='text-left'>{seat_number === 0 || !seat_number ? <>&nbsp;</> : seat_number}</p>
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex'>
          <div className='w-2/12'>
            <p className='text-right'>{seat_number === 0 || !seat_number ? <>&nbsp;</> : seat_number}</p>
          </div>
          <div
            className={`w-10/12 h-full flex justify-start items-end pl-2 border border-gray-400 relative ${
              !status && turn_num ? 'bg-green-200' : ''
            }`}
          >
            <div>{name ? name : <>&nbsp;</>}</div>

            <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-700'>
              {!status && turn_num ? turn_num : ''}
            </p>
          </div>
        </div>
      )}
    </td>
  );
};

export default DeskTable;
