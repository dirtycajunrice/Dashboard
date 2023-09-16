'use client'

import React from 'react';
import Link from 'next/link';
import { ModeToggle } from '@/components/mode-toggle';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGears, faTableColumns, faFilePen } from '@fortawesome/free-solid-svg-icons'; // Example icon import

const Header = () => {
    const pathname = usePathname();

    return (
        <header className='header'>
            <div className='banner'>
                <img src="/logo-no-background.png" alt="Logo" className='logo' />
            </div>
            <nav className='navigation'>
                <ul>
                    <li>
                        <Link href="/dashboard" className={pathname === '/dashboard' ? 'activeLink' : ''}>
                            <FontAwesomeIcon className='icon' icon={faTableColumns} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className={pathname === '/settings' ? 'activeLink' : ''}>
                            <FontAwesomeIcon className='icon' icon={faGears} />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="/editor" className={pathname === '/editor' ? 'activeLink' : ''}>
                            <FontAwesomeIcon className='icon' icon={faFilePen} />
                            Editor
                        </Link>
                    </li>
                    {/* Add more navigation links as needed */}
                </ul>
            </nav>
            <nav className='profile'>
                <ul>
                    <li style={{ marginRight: '10px' }}>
                        <Link href="/profile">
                            <FontAwesomeIcon className='icon' icon={faUser} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
