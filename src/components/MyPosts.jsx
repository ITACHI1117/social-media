import profileImg from "../assets/student.jpg";
import food from "../assets/food.jpg";
// import profileImg from "../assets/student.jpg";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { useMyPosts, usePosts, useUser } from "../queries/userQueries";

function MyPosts() {
  const {
    data: myPosts,
    isError: postErrors,
    isSuccess: postSuccess,
  } = useMyPosts();

  const navigate = useNavigate();
  const handleReply = () => {
    navigate("/chat");
  };

  // console.log(
  //   myPosts.map((img) => {
  //     img.imageUrls.map((image) => {
  //       console.log(image);
  //     });
  //   })
  // );

  return (
    <>
      <section className="w-full h-[90%] p-5 mb-10">
        {postSuccess ? (
          myPosts.map((post) => {
            return (
              <div
                key={post.id}
                className="border-b-2 border-blue-100 pb-2 mb-4"
              >
                <div className=" w-full flex gap-3 ">
                  <img
                    src={profileImg}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover"
                  />
                  <div className="w-full">
                    <div
                      className={`${
                        post.imageUrls.length > 1 && "grid grid-cols-2"
                      }`}
                    >
                      {post.imageUrls.map((image) => {
                        return (
                          <img
                            key={image}
                            src={image}
                            alt=""
                            className="w-[100%] hei rounded-t object-cover"
                          />
                        );
                      })}
                    </div>

                    <div className="w-full bg-blue-400 p-2 rounded-b">
                      <p className="text-white">{post.caption}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="w-full items-end flex justify-end pt-2 gap-2 cursor-pointer"
                  onClick={handleReply}
                >
                  <p className="text-sm">Reply Jermy Dane</p>
                  <IoChatbubblesOutline className="text-2xl text-black" />
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <h1>No posts</h1>
          </div>
        )}
      </section>
    </>
  );
}

export default MyPosts;
