import BottomNavigationBar from "../components/BottomNavigationBar";
import Posts from "../components/Posts";
import TopNavigationBar from "../components/TopNavigationBar";

function Home() {
  return (
    <>
      {/* navigation bar */}
      <TopNavigationBar />
      {/* main content */}
      <Posts />
      <BottomNavigationBar />
    </>
  );
}

export default Home;
