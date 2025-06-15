import { Link, useNavigate } from "react-router";
import { useLogin } from "../queries/authQueries";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Login() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isPending, isSuccess, error, data, isError } = useLogin();

  const onSubmit = (data) => {
    mutate(data);
    // navigate("/home");
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/home");
    }
    isSuccess
      ? toast.success(`Welcome \n ${data}`, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      : error &&
        toast.error(`${error.message?.data?.errors?.Authentication[0]} `, {
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    error && console.log(error.message.data.errors.Authentication[0]);
    data && console.log(data);
  }, [isSuccess, isError]);

  return (
    <>
      <section className="p-6 px-5">
        <div>
          <h1 className="font-bold mb-3 text-2xl">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="username">Email</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="text"
              id="username"
              name="username"
              placeholder="socialmedia@mail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <br />
            <label htmlFor="password">Password</label>
            <input
              className="w-full p-1 border border-gray-300 rounded"
              type="password"
              id="password"
              name="password"
              placeholder="password1234"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <br />
            <button
              type="submit"
              className={`${
                isPending ? "bg-gray-500" : "bg-blue-400"
              } text-white p-2 rounded`}
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Login"}
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
