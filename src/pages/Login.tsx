import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { account } from "../api/appwrite/client";
import Button from "../components/atoms/Button";
import { InputField } from "../components/atoms/InputField";
import { ToggleButton } from "../components/atoms/ToggleButton";

type FormData = {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError('');

    try {
      // Call Appwrite authentication API for email login
      await account.createEmailSession(data.email, data.password);

      // Handle successful login
      window.location.href = '/';
    } catch (error) {
      // Handle login error
      setError('Invalid email or password');
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center  h-screen">
      <form className="bg-white shadow-md text-left rounded min-w-80 px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl text-center mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <InputField
            className="focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            labelText="Email"
            {...register('email', { required: true })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">Email is required</p>}
        </div>
        <div className="mb-3">
          <InputField
            className="focus:shadow-outline"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            labelText="Password"
            {...register('password', { required: true })}
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">Password is required</p>}
        </div>
        <div className="mb-6">
          <ToggleButton
            label="Show Password"
            defaultEnabled={showPassword}
            onChange={setShowPassword}
          />
        </div>
        <div className="flex items-center text-center justify-between">
          <Button
            type="submit"
            disabled={loading}
            className=" text-white w-full text-center bg-sky-500 hover:bg-sky-600 focus:ring-sky-500 focus:ring-offset-sky-200 active:bg-sky-600 active:ring-sky-900 active:ring-offset-sky-700 disabled:bg-sky-200"
          >
            {loading ? (
              <div className="flex flex-row justify-start">
                <div className="border-gray-300 h-5 w-5 animate-spin self-center rounded-full border-4 border-t-slate-50" />
                  <span className=" flex-1 text-base text-left ml-4 font-normal text-white">
                    Logging in...
                  </span>
              </div>
            ) : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
