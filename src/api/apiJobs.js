import supabaseClient from "@/utils/supabase";

export async function getJobs(token, { location, company_id, searchQuery }) {
  const supabase = await supabaseClient(token);

  let query = supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), saved:saved_jobs(id)");

  if (location) {
    query = query.eq("location", location);
  }

  if (company_id) {
    query = query.eq("company_id", company_id);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching Jobs:", error);
    throw new Error(error.message || "Error fetching Jobs");
  }

  return data;
}

export async function saveJob(token, { alreadySaved }, saveData) {
  const supabase = await supabaseClient(token);

  if (alreadySaved) {
    // FIXED: Ensure we only delete the saved entry belonging to THIS specific user/job
    let query = supabase
      .from("saved_jobs")
      .delete()
      .eq("job_id", saveData.job_id);

    if (saveData.user_id) {
      query = query.eq("user_id", saveData.user_id);
    }

    const { data, error: deleteError } = await query;

    if (deleteError) {
      console.error("Error Deleting Saved Job:", deleteError);
      throw new Error(deleteError.message || "Error Deleting Saved Job");
    }

    return data;
  } else {
    const { data, error: insertError } = await supabase
      .from("saved_jobs")
      .insert([saveData])
      .select();

    if (insertError) {
      console.error("Error saving Job:", insertError);
      throw new Error(insertError.message || "Error saving Job");
    }

    return data;
  }
}

export async function getSingleJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  // FIXED: Corrected typos 'comapny' -> 'company' and 'application' -> 'applications'
  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name,logo_url), applications:applications(*)")
    .eq("id", job_id)
    .single();

  if (error) {
    console.error("Error Fetching job:", error);
    throw new Error(error.message || "Error Fetching job");
  }

  return data;
}

export async function updateHiringStatus(token, { job_id }, isOpen) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .update({ isOpen })
    .eq("id", job_id)
    .select();

  if (error) {
    console.error("Error updating job:", error);
    throw new Error(error.message || "Error updating job");
  }

  return data;
}

export async function addNewJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .insert([jobData])
    .select();

  if (error) {
    console.error("Error creating job:", error);
    throw new Error(error.message || "Error creating job");
  }

  return data;
}

export async function getSavedJobs(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("saved_jobs")
    .select("*, job:jobs(*, company:companies(name, logo_url))");

  if (error) {
    console.error("Error fetching saved jobs:", error);
    throw new Error(error.message || "Error fetching saved jobs");
  }

  return data;
}

export async function getMyJobs(token, { recruiter_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .select("*, company:companies(name, logo_url)")
    .eq("recruiter_id", recruiter_id);

  if (error) {
    console.error("Error fetching my jobs:", error);
    throw new Error(error.message || "Error fetching my jobs");
  }

  return data;
}

export async function deleteJob(token, { job_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("jobs")
    .delete()
    .eq("id", job_id)
    .select();

  console.log("Deleted data:", data);
  console.log("Delete error:", error);

  if (error) {
    console.error("Error Deleting job:", error);
    throw new Error(error.message || "Error Deleting job");
  }

  return data;
}
