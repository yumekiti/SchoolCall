import Layout from '@/components/template/Layout';
import { useState } from 'react';
import Link from 'next/link'

import { useGetClassroom, usePutClassroom, useDeleteClassroom } from '@/hooks/useClassroom';

const ClassroomRegister = () => {
  const [classrooms, setClassrooms] = useState([]);

  if (classrooms.length === 0) {
    useGetClassroom().then((res) => {
      setClassrooms(res);
    });
  }

  const handleDelete = (body: any) => {
    useDeleteClassroom(body);
    window.location.reload();
  }

  const handleUpdate = (classroomId: any, updatedClassroom: any) => {
    usePutClassroom( updatedClassroom);
  }

  if (classrooms.length === 0) return <></>;
  
  return (
    <Layout Title='クラス作成'>
      <div className='w-full h-full grid grid-cols-3 grid-rows-3 gap-4 p-4'>
        {classrooms.map((classroom: any) => (
          <div key={classroom.id} className='col-span-1 row-span-1 bg-white rounded-lg shadow-lg flex flex-col justify-evenly items-center'>
            <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
              <span>教室の名前</span>
              <input type="text" className='w-1/2 rounded-lg p-1' defaultValue={classroom.name} onChange={(e) => {classroom.name = e.target.value}} />
            </div>
            <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
              <span>広さ</span>
              <input type="number" className='w-1/2 rounded-lg p-1' min="1" max="100" defaultValue={classroom.breadth} onChange={(e) => {classroom.breadth = parseInt(e.target.value)}} />
            </div>
            <div className='flex justify-evenly items-center bg-gray-200 w-8/12 h-1/6 rounded-lg'>
              <span>間隔</span>
              <input type="text" className='w-1/2 rounded-lg p-1' defaultValue={classroom.gaps} onChange={(e) => {classroom.gaps = e.target.value}} />
            </div>
            <div className='flex justify-end items-center w-8/12 rounded-lg grid grid-cols-4 gap-2'>
              <Link href={`/${classroom.id}`} className='col-span-1 rounded-lg p-2 bg-yellow-400 text-white text-center' onClick={() => handleUpdate(classroom.id, classroom)}>
                詳細
              </Link>
              <button className='col-span-1 rounded-lg p-2 bg-green-400 text-white text-center' onClick={() => handleUpdate(classroom.id, classroom)}>
                備品
              </button>
              <button className='col-span-1 rounded-lg p-2 bg-blue-400 text-white text-center' onClick={() => handleUpdate(classroom.id, classroom)}>
                更新
              </button>
              <button className='col-span-1 rounded-lg p-2 bg-red-400 text-white text-center' onClick={() => handleDelete(classroom.id)}>
                削除
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default ClassroomRegister;
