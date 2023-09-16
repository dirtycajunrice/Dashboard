import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faGears, faTableColumns, faFilePen } from '@fortawesome/free-solid-svg-icons'; // Example icon import
import { useStylesContext } from '@/app/styles-context';

const Header = () => {
    const { header } = useStylesContext();
    const router = useRouter();

    return (
        <header className={header.header}>
            <div className={header.banner}>
                <img src="/logo-no-background.png" alt="Logo" className={header.logo} />
            </div>
            <nav className={header.navigation}>
                <ul>
                    <li>
                        <Link href="/" className={router.pathname === '/' ? header.activeLink : ''}>
                            <FontAwesomeIcon className={header.icon} icon={faTableColumns} />
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/settings" className={router.pathname === '/settings' ? header.activeLink : ''}>
                            <FontAwesomeIcon className={header.icon} icon={faGears} />
                            Settings
                        </Link>
                    </li>
                    <li>
                        <Link href="/editor" className={router.pathname === '/editor' ? header.activeLink : ''}>
                            <FontAwesomeIcon className={header.icon} icon={faFilePen} />
                            Editor
                        </Link>
                    </li>
                    {/* Add more navigation links as needed */}
                </ul>
            </nav>
            <nav className={header.profile}>
                <ul>
                    <li style={{marginRight:'10px'}}>
                        <Link href="/profile">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
