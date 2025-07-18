import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
  const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
      <Head title="Log in" />

      <div className="flex justify-center px-4 py-0">
        <form
          onSubmit={submit}
          className="w-full max-w-md rounded-2xl lg:border lg:border-[#d8c7e0] bg-white lg:p-8 lg:shadow-xl dark:bg-[#2b1b3a] dark:border-[#3E3E3A] space-y-6"
        >
          {/* Session Status */}
          {status && (
            <div className="mb-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
              {status}
            </div>
          )}

          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              autoFocus
              tabIndex={1}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          {/* Password */}
          <div className="grid gap-2 relative">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {canResetPassword && (
                <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                  Forgot password?
                </TextLink>
              )}
            </div>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              required
              tabIndex={2}
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              placeholder="Password"
            />
             <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[36px] text-muted-foreground"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            <InputError message={errors.password} />
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-3">
            <Checkbox
              id="remember"
              name="remember"
              checked={data.remember}
              onClick={() => setData('remember', !data.remember)}
              tabIndex={3}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#c8a2c8] hover:bg-[#b78db7] cursor-pointer" tabIndex={4} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
            Log in
          </Button>

          {/* Register Link */}
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <TextLink href={route('register')} tabIndex={5}>
              Sign up
            </TextLink>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
