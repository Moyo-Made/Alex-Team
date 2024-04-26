import Image from "next/image"
import FirstAidKit from '../../../../public/FirstAidKit.png'

const page = () => {
  return (
    <section id="dashboard">
      <div className="flex justify-around">
        <div className="flex gap-1 mt-4">
           <span className="text-[20px] text-[#5C4A6D] font-medium">ProximaCare</span>
           <Image src={FirstAidKit} width={30} alt="logo" height={20} />
        </div>

        <nav>
          <ul className="flex gap-5">
            <a><li>My stats</li></a>
            <a></a><li>Quests</li>
            <a></a><li>Learn</li>
          </ul>
        </nav>

        
      </div>
    </section>
  )
}

export default page
