
export default function About() {
  return (
    <div 
      id="about" 
      className="w-full h-auto flex justify-center p-5 lg:p-20">

      <div className="bg-gray-200 p-5 lg:p-20 rounded-xl shadow-lg">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-5 text-center mb-10">About Us</h1>
        <p className="text-lg sm:text-xl leading-relaxed text-gray-700">
          At Task Master, we believe that managing tasks should be effortless and empowering. Our app is designed to help you take control of your day, stay organized, and maximize productivity—all with an intuitive and user-friendly interface.
        </p>
        <ul className="list-disc pl-5 mt-4 text-lg sm:text-xl text-gray-700">
          <li>Create tasks quickly and easily.</li>
          <li>Track your progress with real-time updates.</li>
          <li>Complete tasks and feel the satisfaction of accomplishment.</li>
        </ul>
        <p className="text-lg sm:text-xl leading-relaxed mt-4 text-gray-700">
          Our mission is to provide you with a seamless experience, so you can focus on what truly matters—getting things done. We are committed to helping you achieve your goals, stay organized, and make the most out of every day.
        </p>
      </div>
    </div>
  )
}
