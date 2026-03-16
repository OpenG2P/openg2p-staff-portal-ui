import proxy from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default proxy(routing);

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
