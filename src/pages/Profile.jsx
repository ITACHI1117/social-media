import profileImg from "../assets/manImage.jpg";
import food from "../assets/food.jpg";
import BottomNavigationBar from "../components/BottomNavigationBar";
import Posts from "../components/Posts";
function Profile() {
  return (
    <>
      <section className="w-full h-full bg-white">
        <div className="mb-3">
          {/* bg-img */}
          <img src={food} alt="" className="w-full h-[200px] object-cover" />
          {/* profile-img */}
          <div className="">
            <img
              src={profileImg}
              alt=""
              className="rounded-full w-[80px] h-[80px] object-cover border-4 border-blue-400 absolute -mt-5 ml-3  shadow-lg"
            />
          </div>
          <div className="ml-25 flex items-center justify-between pr-5">
            <div>
              <h1 className=" font-bold text-xl">John Doe</h1>
              <h1 className=" text-blue-400  text-sm">johndoe@email.com</h1>
            </div>
            <button className="bg-blue-400 rounded p-1 text-white px-4">
              Log out
            </button>
          </div>
        </div>
        <div className="p-3 border-b border-blue-300">
          <h1 className="">My posts</h1>
        </div>
        <Posts />
        <BottomNavigationBar />
      </section>
    </>
  );
}

export default Profile;
