import { Link, useNavigate } from "react-router";

function Login() {
  let navigate = useNavigate();

  const handleLogin = () => {
    navigate("/home");
  };
  return (
    <>
      <section className="p-6 px-5">
        <div>
          <h1 className="font-bold mb-3 text-2xl">Login</h1>
          <form className="flex flex-col">
            <label htmlFor="username">Email</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="username"
              name="username"
              placeholder="socialmedia@mail.com"
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              placeholder="password1234"
              required
            />
            <br />
            <button
              onClick={handleLogin}
              type="submit"
              className="bg-blue-400 text-white p-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
        <footer className="absolute bottom-10">
          <p className="text-center">
            Dont have an account?{" "}
            <span className="underline text-blue-400">
              <Link to="/signup">Sign Up</Link>
            </span>
          </p>
        </footer>
      </section>
    </>
  );
}

export default Login;
