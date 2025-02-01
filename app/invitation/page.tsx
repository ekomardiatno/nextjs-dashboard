'use client';
import { useEffect, useMemo, useState } from 'react';
import { sacramento, workSans } from '../ui/fonts';
import '../ui/invitation.css';
import { HeartIcon } from '@heroicons/react/20/solid';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';

export default function InvitationPage() {
  const countDownDate = new Date("Jan 5, 2030 15:37:25").getTime()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timeInterval)
    }
  }, [])

  const countDownText = useMemo(() => {

    // Find the distance between now and the count down date
    let distance = countDownDate - currentTime.getTime();
    if (distance < 0) distance = 0

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    return days + "d " + hours + "h " + minutes + "m " + seconds + "s"
  }, [currentTime, countDownDate])

  return (
    <main className={workSans.className + " bg-slate-100 dark:bg-slate-800"}>
      <section id='hero' className="hero h-screen flex flex-col items-center justify-center">
        <h4 className='dark:text-white text-lg mb-2'>Kepada Bapak/Ibu/Saudara/i,</h4>
        <h1 className={sacramento.className + ' dark:text-white text-5xl mb-2'}>Shandika & Nofariza</h1>
        <div className="mb-5 text-center">
          <p className='dark:text-white mb-4'>Akan melangsungkan resepsi pernikahan dalam:</p>
          <div className="flex gap-2 justify-center">
            {
              countDownText.split(' ').map(text => {
                return (
                  <div key={text} className="flex flex-col items-center justify-center bg-slate-200 rounded-full w-16 h-16">
                    <p className='text-lg font-bold leading-none text-pink-600'>{text.slice(0, -1)}</p>
                    <p className='uppercase text-sm mt leading-none text-pink-600'>{text.slice(-1)}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
        <button className="bg-pink-400 text-pink-800 px-4 py-2 hover:bg-pink-500 hover:text-pink-900 active:text-pink-950 rounded-xl active:bg-pink-600 transition active:scale-95 hover:text"><EnvelopeOpenIcon className='w-5 h-5 align-middle inline-block' /><span className='align-middle ml-2'>Lihat Undangan</span></button>
      </section>
      <div className='relative'>
        <nav className="bg-pink-400 sticky top-0">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <button onClick={() => setIsOpen(true)} type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:text-pink-900" aria-controls="mobile-menu" aria-expanded="false">
                  <span className="absolute -inset-0.5"></span>
                  <span className="sr-only">Open main menu</span>
                  <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                  <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <p className={sacramento.className + ' text-3xl text-white'}>emvite</p>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:text-pink-900" aria-current="page">Dashboard</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:text-pink-900">Team</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:text-pink-900">Projects</a>
                    <a href="#" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:text-pink-900">Calendar</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>


        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
        )}

        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out${!isOpen ? ' translate-x-full' : ' translate-x-0'}`}
        >
          <div className="p-4 flex justify-between items-center">
            <p className={sacramento.className + ' text-3xl text-white'}>emvite</p>
            <button onClick={() => setIsOpen(false)} className="text-xl dark:text-white">
              &times;
            </button>
          </div>
          <ul className="p-4">
            <li className="py-2 dark:text-white"><a href="#invitation-home" className='text-center block'>Home</a></li>
            <li className="py-2 dark:text-white"><a href="#" className='text-center block'>About</a></li>
            <li className="py-2 dark:text-white"><a href="#" className='text-center block'>Services</a></li>
            <li className="py-2 dark:text-white"><a href="#" className='text-center block'>Contact</a></li>
          </ul>
        </div>

        <section id='invitation-home' className="min-h-screen flex flex-col justify-center -mt-16 pt-16">
          <div className="mx-auto max-w-2xl px-2 sm:px-6 lg:px-8 mb-10 mt-10">
            <h2 className={sacramento.className + ' text-pink-600 text-5xl text-center mb-3'}>Acara Pernikahan</h2>
            <h3 className='text-lg text-center dark:text-white mb-2'>Diselenggarakan pada 5 Jan 2030 di Pekanbaru.</h3>
            <p className='text-center dark:text-white'>Oleh karena itu, dengan segala hormat, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i, untuk hadir pada acara pernikahan kami.</p>
          </div>

          <div className="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8 relative mb-10">
            <div className="flex gap-4 flex-col lg:flex-row">
              <div className='flex gap-4 lg:flex-row-reverse'>
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-slate-400"></div>
                <div className='flex-1'>
                  <h3 className={sacramento.className + ' text-4xl font-bold mb-2 text-pink-600 text-left lg:text-right'}>Shandika Galih</h3>
                  <p className='mb-2 text-gray-700 dark:text-gray-200 text-left lg:text-right'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio eligendi iste, ducimus modi minus blanditiis voluptatum necessitatibus? Reiciendis nulla harum consectetur tempora nesciunt, vel nihil a, ipsum atque eos neque.</p>
                  <p className='text-gray-700 dark:text-gray-200 text-left lg:text-right'>Putra dari Bpk. Lorem dan Ibu Ipsum</p>
                </div>
              </div>
              <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 w-16 h-w-16 p-2 bg-white rounded-full hidden lg:block">
                <HeartIcon className='text-pink-500' />
              </div>
              <div className='flex gap-4 lg:flex-row-reverse'>
                <div className='flex-1'>
                  <h3 className={sacramento.className + ' text-4xl font-bold mb-2 text-pink-600 text-right lg:text-left'}>Nofariza</h3>
                  <p className='mb-2 text-gray-700 dark:text-gray-200 text-right lg:text-left'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio eligendi iste, ducimus modi minus blanditiis voluptatum necessitatibus? Reiciendis nulla harum consectetur tempora nesciunt, vel nihil a, ipsum atque eos neque.</p>
                  <p className='text-gray-700 dark:text-gray-200 text-right lg:text-left'>Putra dari Bpk. Lorem dan Ibu Ipsum</p>
                </div>
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-full bg-slate-400"></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}