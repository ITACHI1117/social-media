import { Link } from "react-router";

function Signup() {
  return (
    <>
      <section className="p-6 px-5">
        <div>
          <h1 className="font-bold mb-3 text-2xl">Sign Up</h1>
          <form className="flex flex-col gap-2">
            <label htmlFor="username">First Name</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              required
            />
            <label htmlFor="username">Last Name</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              required
            />
            <label htmlFor="username">Matric No</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="matric"
              name="matric"
              placeholder="1234567890"
              required
            />
            <label htmlFor="username">Email</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="username"
              name="username"
              placeholder="socialmedia@mail.com"
              required
            />

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
              type="submit"
              className="bg-blue-400 text-white p-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
        <footer className="absolute bottom-10">
          <p className="text-center">
            Already have an account?{" "}
            <span className="underline text-blue-400">
              <Link to="/login">Login </Link>
            </span>
          </p>
        </footer>
      </section>
    </>
  );
}

export default Signup;
