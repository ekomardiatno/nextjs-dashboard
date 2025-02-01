'use client'

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lusitana } from './ui/fonts';
import AcmeLogo from './ui/acme-logo';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { status } = useSession()
  const { push } = useRouter()

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal font-[700]`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <div
            className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
          />
          <button
            onClick={() => {
              if (status === 'unauthenticated') {
                signIn('credentials')
              } else if (status === 'authenticated') {
                push('/dashboard')
              }
            }}
            aria-disabled={status === 'loading'}
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>{status === 'unauthenticated' ? 'Log in' : status === 'authenticated' ? 'Dashboard' : 'Loading...'}</span> <ArrowRightIcon className="w-5 md:w-6" />
          </button>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className='hidden md:block'
            alt='Screenshots of the dashboard project showing mobile version'
          />
          <Image
            src='/hero-mobile.png'
            width={560}
            height={620}
            className='block md:hidden'
            alt='Screenshots of the dashboard project showing desktop version'
          />
        </div>
      </div>
    </main>
  );
}
