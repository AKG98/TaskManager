import addTask from '../../assets/images/addTask.png'
import trackTask from '../../assets/images/trackTask.png'
import closeTask from '../../assets/images/clostTask.png'

export default function Demo() {
  return (
    <div className='w-screen lg:h-screen h-auto p-5 lg:p-20' id='demo'>
      <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-center'>Plan your day with simple steps</h1>
      <div className='flex justify-evenly items-center mt-10 flex-col lg:flex-row flex-wrap text-stone-600'>
        <div className='flex-1 flex justify-center items-center flex-col'>
            <img src={addTask} alt="" />
            <h3 className='font-semibold text-center px-20'>Easily create tasks and set priorities to stay organized and focused.</h3>
        </div>
        <div className='flex-1 flex justify-center items-center flex-col'>
            <img src={trackTask} alt="" />
            <h3 className='font-semibold text-center px-20'>Monitor your progress with real-time updates.</h3>
        </div>
        <div className='flex-1 flex justify-center items-center flex-col'>
            <img src={closeTask} alt="" />
            <h3 className='font-semibold text-center px-20'>Mark tasks as complete once they're done.</h3>
        </div>
      </div>
    </div>
  )
}
