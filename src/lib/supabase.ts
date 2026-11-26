import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.includes("supabase.co") &&
    !supabaseUrl.includes("your-project-id")
);

// Garante que o Data Cache do Next.js 14 nunca congele respostas antigas do Supabase
const noStoreFetch: typeof fetch = (input, init) => {
  return fetch(input, { ...init, cache: "no-store" });
};

const clientOptions = {
  auth: { persistSession: false },
  global: { fetch: noStoreFetch },
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, clientOptions)
  : null;

export const supabaseAdmin = Boolean(supabaseUrl && serviceRoleKey)
  ? createClient(supabaseUrl, serviceRoleKey, clientOptions)
  : supabase;
