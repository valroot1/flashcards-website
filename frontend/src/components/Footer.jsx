import React from 'react';

function Footer() {
    return (
        <footer className='py-6 md:px-8 md:py-0 bg-gray-200 text-black border-t-2 border-blue-500/20'>
            <div className='flex flex-col items-center justify-between gap-4 md:h-15 md:flex-row'>
                <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
                    Built by{" "}
                    <a
                        href='https://github.com/valroot1'
                        target='_blank'
                        className='font-medium underline underline-offset-4'
                    >
                        valroot1
                    </a>
                    . The source code is available on{" "}
                    <a
                        href='https://github.com/valroot1/flashcards-website'
                        target='_blank'
                        rel='noreferrer'
                        className='font-medium underline underline-offset-4'
                    >
                        GitHub
                    </a>
                    .
                </p>
            </div>
        </footer>
    );
};

export default Footer;
