import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

//esto es una opcion de Next.js para evitar q cachee de forma estatica la ruta
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code != null) {
    const supabase = createRouteHandlerClient({ cookies });
    //la llamada de abajo hace que usando el codigo q le hemos pasado por URL nos devuelve la sesion del usuario
    await supabase.auth.exchangeCodeForSession(code);
  }
  return NextResponse.redirect(requestUrl.origin);
}
