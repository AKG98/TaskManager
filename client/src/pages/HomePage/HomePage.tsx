import { Button } from '@/components/ui/button'
import HomeAsset from '../../assets/images/home.jpg'
import { useNavigate } from 'react-router-dom';


export default function HomePage() {

  const navigate = useNavigate();

  function handleGetStartButton(){
    navigate('/auth')
  }
  return (
    <>
    <div
      id='home'
      className='min-h-screen w-full px-4 md:px-8 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-center gap-8 py-12'>
  
      <div className='w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight'>
          Stay Organized, Stay Ahead
        </h1>

        <p className='text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl'>
          Effortless Task Tracking and Seamless Organization for Maximum Productivity and Stress-Free Workdays
        </p>

        <Button
          className='home-btn bg-[#294496] hover:scale-[1.1] text-white px-6 py-2 text-lg transform transition duration-300 ease-in-out'
          size={'lg'}
          onClick={handleGetStartButton}
        >
          Get Started
        </Button>
      </div>

      <div className='w-full lg:w-1/2'>
        <img
          src={HomeAsset}
          alt='Home'
          className='w-full max-w-xl mx-auto object-cover rounded-lg shadow-lg'
        />
      </div>
    </div>
    </>
  )
}