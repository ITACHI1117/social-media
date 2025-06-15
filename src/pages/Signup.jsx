import { Link, useNavigate } from "react-router";
import { registrationSchema } from "../schemas/schema";
import { useRegister } from "../queries/authQueries";
import { required } from "zod/v4-mini";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Signup() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });

  const { mutate, isPending, isSuccess } = useRegister();

  const onSubmit = (data) => {
    console.log("clicked");
    mutate(data);
    isSuccess && navigate("/login");
  };

  return (
    <>
      <section className="p-6 px-5">
        <div>
          <h1 className="font-bold mb-3 text-2xl">Sign Up</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <label htmlFor="username">First Name</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              {...register("firstname", { required: true })}
              required
            />
            <label htmlFor="username">Last Name</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              {...register("lastname", { required: true })}
              required
            />
            <label htmlFor="username">Username</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="username"
              name="username"
              placeholder="DoeJohn"
              {...register("username", { required: true })}
              required
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}
            <label htmlFor="username">Matric No</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="number"
              id="matricNumber"
              name="matricNumber"
              placeholder="1234567890"
              {...register("matricNumber", {
                required: true,
                minLength: 9,
                maxLength: 10,
                valueAsNumber: true,
              })}
              required
            />
            {errors.matricNumber && <p>{errors.matricNumber.message}</p>}
            <label htmlFor="username">Email</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="email"
              name="email"
              placeholder="socialmedia@mail.com"
              {...register("email", { required: true })}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              placeholder="password1234"
              {...register("password", {
                pattern: /^[A-Za-z]+$/i,
                required: true,
              })}
              required
            />
            {errors.password && <p>{errors.password.message}</p>}
            <br />
            <button
              type="submit"
              className={`${
                isPending ? "bg-gray-400" : "bg-blue-400"
              } text-white p-2 rounded`}
              disabled={isPending}
            >
              Sign up
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
