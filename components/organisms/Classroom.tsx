import { FC } from 'react';
import DeskTable from '../molecules/DeskTable';
import Desk from '../../types/desk';
import CallOrder from '../../types/callorder';
import Classroom from '../../types/classroom';
import Placement from '../../types/placement';

type Props = {
  desks: Desk[];
  call_orders: CallOrder[];
  classroom: Classroom;
  placements: Placement[];
};

const ClassRoom: FC<Props> = ({ desks, call_orders, classroom, placements }) => {
  let positions: any = [];
  let seat_number = 1;
  for (let i = 1; i <= classroom.breadth; i++) {
    if(classroom.gaps.includes(i)) {
      if (placements.filter((placement) => placement.seat_number === i).length !== 0) {
        positions.push(placements.filter((placement) => placement.seat_number === i)[0]);
      } else {       
        positions.push({seat_number: 0});
      }
    } else {
      if (desks.filter((desk) => desk.seat_number === seat_number).length !== 0) {
        positions.push(desks.filter((desk) => desk.seat_number === seat_number)[0]);
      }
      seat_number++;
    }
  }

  // 8人ずつに分割
  let split_positions = [];
  for (let i = 0; i < positions.length; i += 8) {
    split_positions.push(positions.slice(i, i + 8));
  }

  // statusがfalseのものを抽出
  let shaping_call_orders = call_orders.filter((call) => !call.status);

  return (
    <main className='w-full h-full px-12 flex justify-center flex-col items-center'>
      <div className='h-12 w-28 bg-white flex items-center justify-center text-xl'>
        入口
      </div>
      <div className='bg-white w-full h-full'>
        <table className='h-full w-full'>
          <tbody className='h-full w-full flex'>
            {
              split_positions.map((row, index) => (
                <tr className='w-1/6 h-full grid grid-row-8' key={index}>
                  {
                    row.map((seat: any, row_index: number) => (
                      shaping_call_orders.filter((call) => call.seat_number === seat.seat_number).map((call) => (
                        <DeskTable
                          key={row_index}
                          connect={index % 2 === 1}
                          seat_number={seat.seat_number}
                          name={call.student.name}
                          turn_num={shaping_call_orders.findIndex((call) => call.seat_number === seat.seat_number) + 1}
                          status={call.status}
                        />
                      ))[0] || (
                        <DeskTable
                          key={row_index}
                          connect={index % 2 === 1}
                          seat_number={seat.seat_number}
                          name={seat.name}
                          turn_num={0}
                          status={true}
                        />
                      )
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default ClassRoom;
