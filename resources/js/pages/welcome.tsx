import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f8f4fa] dark:bg-[#1e1328] text-[#3b224c] dark:text-white overflow-hidden">
                {/* Blurred gradient background */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#d9b8f1] blur-3xl opacity-40 dark:bg-[#7138a3]"></div>
                    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#f5c7f7] blur-3xl opacity-40 dark:bg-[#4f2067]"></div>
                </div>

                {/* Left Section */}
                <div className="flex flex-col justify-center items-start p-12 bg-[#eae4f1]/70 dark:bg-[#281c36]/70 backdrop-blur-md">
                    <h1 className="text-4xl font-bold mb-4">
                        Consultation Scheduling System
                    </h1>
                    <p className="text-base text-[#6c5c75] dark:text-[#cbbccf] mb-6 leading-relaxed">
                        A centralized academic tool designed to streamline consultation requests,
                        allowing students and faculty to efficiently schedule, track, and manage
                        their academic discussions.
                    </p>

                    <div className="flex gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md bg-[#b497bd] px-6 py-2 text-white font-medium hover:bg-[#a97ca5]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md border border-[#c8a2c8] px-6 py-2 hover:bg-[#f1e7f5] dark:hover:bg-[#3b2647]"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md bg-[#c8a2c8] text-white px-6 py-2 hover:bg-[#a97ca5]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Right Section */}
                <div className="hidden lg:flex items-center justify-center bg-[#f4edf9]/60 dark:bg-[#332040]/60 backdrop-blur-md">
                    <img
                        src="/images/schedule_ui_preview.svg"
                        alt="App Preview"
                        className="w-3/4 h-auto"
                    />
                </div>
            </div>
        </>
    );
}
