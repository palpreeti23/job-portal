// import { createClient } from "@supabase/supabase-js";

// export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// const supabaseClient = async (supabaseAccessToken) => {
//   const supabase = createClient(supabaseUrl, supabaseKey, {
//     global: {
//       headers: {
//         Authorization: `Bearer ${supabaseAccessToken}`,
//       },
//     },
//   });
//   return supabase;
// };

// export default supabaseClient;

import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Note: Vite uses import.meta.env, and Supabase publishable key handles public calls
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient = async (supabaseAccessToken) => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    accessToken: async () => {
      // Pass the Clerk token dynamically directly to Supabase's auth handler
      return supabaseAccessToken;
    },
  });
  return supabase;
};

export default supabaseClient;
