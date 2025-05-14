import RotateTextMotion from "../components/rotateText";
import profile from "../assets/pf.png"
import logo from "../assets/react_logo.png"


const Home = () => {
    return (
        <div className=" pt-10 px-[1%] !select-none bg-gray-950">
            <div className=" flex justify-between items-center">
                <h1 className=" text-5xl uppercase">
                    <span className="text-4xl">the digital realm where</span>
                    <span className="block mt-2">creativity meets technology</span>
                </h1>
                <RotateTextMotion />
            </div>
            <div className=" text-center font-semibold leading-tight text-8xl font-sans center flex justify-center "><h1>AUNG THU KHA</h1></div>
            <figure className="mt-10 relative z-10 mx-auto w-full aspect-video">
                <div className="w-full h-full relative">
                    <img
                        className="object-cover object-top w-full h-full"
                        src={profile}
                        alt=""
                        style={{
                            maskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 20% ,rgba(0,0,0,0) 100%)',
                            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 20% ,rgba(0,0,0,0) 100%)',
                        }}
                    />
                    <img style={{ animationDuration: '12s' }} className="absolute pointer-events-none top-[32%] w-[10%] right-[22%] animate-spin " src={logo} alt="" />
                </div>
            </figure>

        </div>
    );
};

export default Home;
