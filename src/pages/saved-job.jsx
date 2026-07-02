import supabaseClient from "@/utils/supabase";

export async function savedJobs(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    const { data, error: deleteError } = await supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (deleteError) {
      console.error("Error Deleting Saved Job:", deleteError);
      return null;
    }

    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.log("Error fetching Jobs", insertError);
      return null;
    }

    return data;
  }
}

// const { data, error } = await supabase
//   .from("saved_jobs")
//   .select("*, company:companies(name,logo_url), saved: saved_jobs(id)");
