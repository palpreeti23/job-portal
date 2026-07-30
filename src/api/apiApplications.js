import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function applyToJob(token, _, jobData) {
  const supabase = await supabaseClient(token);

  // 1. Extract file extension (.pdf, .docx, etc.)
  const fileExt = jobData.resume?.name?.split(".").pop() || "pdf";
  const random = Math.floor(Math.random() * 90000);
  const fileName = `resume-${random}-${jobData.candidate_id}.${fileExt}`;

  // 2. Upload to 'resumes' bucket
  const { error: storageError } = await supabase.storage
    .from("resumes")
    .upload(fileName, jobData.resume);

  if (storageError) {
    console.error("Error uploading Resume:", storageError);
    throw new Error(storageError.message || "Error uploading Resume");
  }

  // 3. Generate Public URL matching 'resumes' bucket
  const resume = `${supabaseUrl}/storage/v1/object/public/resumes/${fileName}`;

  // 4. Insert application record
  const { data, error } = await supabase
    .from("applications")
    .insert([{ ...jobData, resume }])
    .select();

  if (error) {
    console.error("Error submitting application:", error);
    throw new Error(error.message || "Error submitting application");
  }

  return data;
}

// FIXED: Target specific application ID rather than updating all job applications
export async function updateApplicationStatus(
  token,
  { application_id },
  status,
) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .update({ status })
    .eq("id", application_id)
    .select();

  if (error || !data || data.length === 0) {
    console.error("Error updating application status:", error);
    throw new Error(error?.message || "Failed to update application status");
  }

  return data;
}

export async function getApplications(token, { user_id }) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase
    .from("applications")
    .select("*, job:jobs(title, company:companies(name))")
    .eq("candidate_id", user_id);

  if (error) {
    console.error("Error fetching applications:", error);
    throw new Error(error.message || "Error fetching applications");
  }

  return data;
}
