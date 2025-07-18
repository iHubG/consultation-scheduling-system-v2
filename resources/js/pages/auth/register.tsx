import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
  });

  const [showNotice, setShowNotice] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    setShowNotice(data.role === 'faculty');
  }, [data.role]);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <Head title="Register" />

      <form onSubmit={submit} className="flex justify-center px-0 lg:px-0">
        <div className="w-full lg:max-w-7xl flex flex-col lg:flex-row gap-8 bg-white dark:bg-[#2b1b3a] lg:border lg:border-[#d8c7e0] dark:border-[#3E3E3A] lg:p-8 rounded-2xl lg:shadow-xl">

            <div className="flex-1 space-y-6">
                {/* Name */}
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                    placeholder="Full name"
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Email */}
                <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    disabled={processing}
                    placeholder="email@example.com"
                    />
                    <InputError message={errors.email} />
                </div>

                {/* Role */}
                <div>
                    <Label htmlFor="role">Register As</Label>
                    <select
                    id="role"
                    required
                    aria-label="Register As"
                    value={data.role}
                    onChange={(e) => setData('role', e.target.value)}
                    disabled={processing}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c8a2c8] dark:bg-[#3a2b4e] dark:border-[#5b4e68]"
                    >
                    <option value="" disabled>
                        -- Select your role --
                    </option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    </select>
                    <InputError message={errors.role} />
                </div>

                {/* Notice if faculty */}
                {showNotice && (
                    <p className="text-sm text-[#8a2be2] dark:text-[#d2a8ff] bg-[#f3ecfa] dark:bg-[#3f2e55] p-3 rounded-md border border-[#e1d4f3] dark:border-[#5b4e68]">
                    Note: Faculty accounts must be activated by an administrator before logging in.
                    </p>
                )}

            </div>
            <div className="flex-1 space-y-6">
                {/* Password */}
                <div className="relative">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    disabled={processing}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[33px] text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <InputError message={errors.password} />
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Label htmlFor="password_confirmation">Confirm Password</Label>
                  <Input
                    id="password_confirmation"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    disabled={processing}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-[33px] text-muted-foreground"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <InputError message={errors.password_confirmation} />
                </div>


                {/* Submit Button */}
                <Button type="submit" className="w-full bg-[#c8a2c8] hover:bg-[#b78db7] cursor-pointer" disabled={processing}>
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                    Create account
                </Button>

                {/* Login Link */}
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <TextLink href={route('login')} tabIndex={7}>
                    Log in
                    </TextLink>
                </div>
            </div>
         
         
        </div>
      </form>
    </AuthLayout>
  );
}
