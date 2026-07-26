import { useSession } from "@clerk/react";
// import { useState } from "react";

// const useFetch = (cb, options = {}) => {
//   const [data, setData] = useState(undefined);
//   const [loading, setLoading] = useState(null);
//   const [error, setError] = useState(null);
//   const { session } = useSession();

//   const fn = async (...args) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const supabaseAccessToken = await session.getToken({
//         template: "supabase",
//       });

//       const response = await cb(supabaseAccessToken, options, ...args);
//       setData(response);
//       setError(null);
//     } catch (error) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { fn, data, loading, error };
// };

// export default useFetch;

// import { useSession } from "@clerk/clerk-react"; // or @clerk/clerk-react
import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { session } = useSession();

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    // console.log("session", session);

    try {
      // 1. Fetch the default session token (Native Third-Party Auth)
      // No need for { template: "supabase" }
      const supabaseAccessToken = await session?.getToken();

      // console.log("Token:", supabaseAccessToken);
      // const payload = JSON.parse(atob(supabaseAccessToken.split(".")[1]));
      // console.log(payload);

      if (!supabaseAccessToken) {
        throw new Error("User is not authenticated");
      }

      // 2. Execute callback function (e.g., getting jobs, saving applications)
      const response = await cb(supabaseAccessToken, options, ...args);

      setData(response);
      setError(null);
    } catch (err) {
      setError(err);
      setData(undefined);
    } finally {
      setLoading(false);
    }
  };

  return { fn, data, loading, error };
};

export default useFetch;
