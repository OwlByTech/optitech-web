import NextAuth from 'next-auth';
import {authConfig} from './auth.config';
import {ROUTES_AUTH} from './modules/auth/types/auth';
import {ROUTES_CONFIG, ROUTES_SIDEBAR} from './modules/dashboard/types';
import {NextResponse} from 'next/server';
import {getClientInfoByTokenService} from './modules/dashboard/services';
import {ROUTES_INSTITUTION} from './modules/institution/types';
import {getInstitutionService} from './modules/institution/services';
import {getAsesorService} from './modules/asesor/services';
import {ROUTES_ASESOR} from './modules/asesor/types';
import {ROLES, STATUS_CLIENT} from './modules/auth/types/enum';

const publicRoutes = new Set<string>([
  ROUTES_AUTH.LOGIN,
  ROUTES_AUTH.SIGN_UP,
  ROUTES_AUTH.PRINCIPAL,
  ROUTES_AUTH.RESET_PASSWORD,
  ROUTES_AUTH.STEP1,
  ROUTES_AUTH.STEP2,
  ROUTES_AUTH.STEP3,
]);

const secureRoutes = new Set<string>([
  ROUTES_SIDEBAR.DASHBOARD,
  ROUTES_CONFIG.ACTIVATE_ACCOUNT,
  ROUTES_INSTITUTION.REGISTER_INSTITUTION,
]);
export default NextAuth(authConfig).auth(async req => {
  const isLoggedIn = !!req.auth?.user;
  const {pathname} = req.nextUrl;

  if (!isLoggedIn && secureRoutes.has(pathname)) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }
  const client = (await getClientInfoByTokenService()).data;

  if (
    client?.status === STATUS_CLIENT.INACTIVE &&
    (pathname.startsWith(ROUTES_SIDEBAR.DASHBOARD) ||
      pathname.startsWith(ROUTES_INSTITUTION.REGISTER_INSTITUTION))
  ) {
    const newUrl = new URL(ROUTES_CONFIG.ACTIVATE_ACCOUNT, req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (!!client?.roles.find(r => r.roleName === ROLES.INSTITUTION)) {
    const institution = await getInstitutionService();
    if (!institution && pathname.startsWith(ROUTES_SIDEBAR.DASHBOARD)) {
      const newUrl = new URL(ROUTES_INSTITUTION.REGISTER_INSTITUTION, req.nextUrl.origin);
      return Response.redirect(newUrl);
    }

    if (institution && pathname.startsWith(ROUTES_INSTITUTION.REGISTER_INSTITUTION)) {
      const newUrl = new URL(ROUTES_SIDEBAR.DASHBOARD, req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }

  if (!!client?.roles.find(r => r.roleName === ROLES.ASSESOR)) {
    const asesor = (await getAsesorService(client.id)).data;
    if (!asesor && pathname.startsWith(ROUTES_SIDEBAR.DASHBOARD)) {
      const newUrl = new URL(ROUTES_ASESOR.REGISTER_ASESOR, req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }

  if (isLoggedIn && publicRoutes.has(pathname)) {
    return NextResponse.redirect(new URL(ROUTES_SIDEBAR.DASHBOARD, req.nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
