import profileImg from "../assets/student.jpg";
import food from "../assets/food.jpg";
// import profileImg from "../assets/student.jpg";
import { IoChatbubblesOutline } from "react-icons/io5";

function Posts() {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "This is the content of post 1",
      image: "https://via.placeholder.com/150",
      user: {
        id: 1,
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
    {
      id: 2,
      title: "Post 2",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum  ",
      image: "https://via.placeholder.com/150",
      user: {
        id: 2,
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
    {
      id: 3,
      title: "Post 3",
      content: "This is the content of post 3",
      image: "https://via.placeholder.com/150",
      user: {
        id: 3,
        name: "Jane Doe",
        profilePicture: "https://via.placeholder.com/50",
      },
    },
  ];
  return (
    <>
      <section className="w-full h-[90%] p-5">
        {posts.map((post) => {
          return (
            <div key={post.id} className="border-b-2 border-blue-100 pb-2 mb-4">
              <div className=" w-full flex gap-3 ">
                <img
                  src={profileImg}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div className="w-full">
                  <img
                    src={food}
                    alt=""
                    className="w-[100%] rounded-t object-cover"
                  />
                  <div className="w-full bg-blue-400 p-2 rounded-b">
                    <p className="text-white">{post.content}</p>
                  </div>
                </div>
              </div>

              <div className="w-full items-end flex justify-end pt-2 gap-2 cursor-pointer">
                <p className="text-sm">Reply Jermy Dane</p>
                <IoChatbubblesOutline className="text-2xl text-black" />
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
}

export default Posts;
