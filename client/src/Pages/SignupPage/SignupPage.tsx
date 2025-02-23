export const SignupPage = () => {
  return (
    <div className="max-w-[500px] my-auto mx-auto ">
      <div className=" bg-black text-white p-6 rounded-lg shadow-md">
        <div className="m-2">
          <div className="text-center text-semibold text-xl mb-4">Sign up</div>

          <div className="flex flex-col space-y-4">
            <input
              type="text"
              className="rounded-md px-2"
              placeholder="Email"
            />
            <input
              type="password"
              className="rounded-md px-2"
              placeholder="Password"
            />
            <button className="rounded-md bg-white text-black">Create an account</button>
            <button >Sign in</button>
          </div>
        </div>
      </div>
    </div>
  );
};
