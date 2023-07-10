import React from 'react'

export default function Skeleton() {
  return (
    <>
      <div className='bg-white border border-solid border-slate-300'>
        <div className='flex justify-between items-center p-4'>
          <div className='flex gap-4 items-center'>
            <div className='w-8 h-8 bg-slate-200 rounded-full' />
            <div className='flex-1'>
              <p className='text-sm text-slate-900'></p>
              <p className='text-xs text-slate-700'></p>
            </div>
          </div>
          <div className='flex-none'>
            <button className='btn btn-sm btn-coral-100 bg-slate-300 hover:bg-slate-200 text-coral-600 font-bold' type='button'></button>
          </div>
        </div>
        <div className='p-4'>
          <h1 className='mb-6 font-bold text-xl'></h1>
          <p className='auto-line-break text-base bg-slate-50 p-4 text-slate-900 whitespace-pre-wrap'>
            <a className='text-slate-900 mt-6 flex underline' target="_blank" rel='origin' href="https://www.lipsum.com/"></a>
          </p>
        </div>

        <div id="article" className='px-4 py-2'>
          <a href="https://www.lipsum.com/" target="_blank" rel="origin">
            <div className='border border-solid border-slate-200 rounded-lg overflow-hidden bg-slate-50 flex'>
              <div className='flex-1 p-4'>
                <p className='mb-1 text-sm font-bold text-slate-900 line-clamp-3'>

                </p>
                <p className='text-sm text-slate-700 line-clamp-1'></p>
              </div>
              <span className='box-border inline-block overflow-hidden w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 relative max-w-full'>
                <span className='box-border block w-auto h-auto bg-transparent opacity-100 border-0 m-0 p-0 max-w-full'>
                </span>
              </span>
            </div>
          </a>
        </div>

        <div className=' mx-4 mb-2 border-slate-500 py-3 flex justify-between'>
          <p className='text-sm text-slate-500'>

          </p>
          <p className='text-xs text-slate-500 false'>

          </p>
        </div>


        <div className=''>
          <div className='flex px-1 justify-between'>
            <div id="likeRepost" className='flex'>
              <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'>
                <p className='font-bold text-xs text-slate-500'></p></button>
              <button type="button" className='flex items-center gap-1 p-3 focus:outline-none false'><p className='font-bold text-xs text-slate-500'></p></button>
            </div>

            <div className='py-3 flex gap-3 pr-6'>

            </div>
          </div>
        </div>
      </div >
    </>
  )
}
