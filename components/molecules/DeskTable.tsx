import { FC } from 'react';

type Props = {
  seat_number: number;
  name?: string;
  connect?: boolean;
  turn_num?: number;
  status?: boolean;
  check?: boolean;
  today?: boolean;
};

const DeskTable: FC<Props> = ({ seat_number, name, connect = false, turn_num, status, check, today }) => {
  return seat_number === 0 && name === undefined ? (
    <td className='h-full row-span-1 text-2xl'>&nbsp;</td>
  ) : (
    <td className='w-full h-full row-span-1 truncate'>
      {!connect ? (
        <div className='w-full h-full flex'>
          <div
            className={`w-10/12 h-full flex justify-start items-end pl-2 border border-gray-400 relative truncate
            ${!today && !check && turn_num ? 'bg-blue-200' : ''}
            ${!today && check ? 'bg-yellow-200' : ''}
            ${today ? 'bg-green-300' : ''}
            `}
          >
            <p className='truncate text-xs xl:text-4xl'>{name ? name : <>&nbsp;</>}</p>

            <p className='z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base xl:text-5xl font-bold text-gray-700'>
              {!today && turn_num ? turn_num : ''}
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
            className={`w-10/12 h-full flex justify-start items-end pl-2 border border-gray-400 relative truncate
            ${!today && !check && !status && turn_num ? 'bg-blue-200' : ''}
            ${!today && check ? 'bg-yellow-200' : ''}
            ${today ? 'bg-green-300' : ''}
            `}
          >
            <p className='truncate text-xs xl:text-4xl'>{name ? name : <>&nbsp;</>}</p>

            <p className='z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-base xl:text-5xl font-bold text-gray-900'>
              {!today && !status && turn_num ? turn_num : ''}
            </p>
          </div>
        </div>
      )}
    </td>
  );
};

export default DeskTable;
