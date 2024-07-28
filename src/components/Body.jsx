
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'


const Body = () => {
  return (
    <div className='flex max-w-full h-full mb-2'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default Body