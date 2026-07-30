import supabaseClient, { supabaseUrl } from "@/utils/supabase";

export async function getCompanies(token) {
  const supabase = await supabaseClient(token);

  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error Fetching Companies:", error);
    throw new Error(error.message || "Error Fetching Companies");
  }
  return data;
}

export async function addNewCompany(token, _, companyData) {
  const supabase = await supabaseClient(token);

  // Extract file extension if available (e.g., .png, .jpg)
  const fileExt = companyData.logo?.name?.split(".").pop() || "png";
  const random = Math.floor(Math.random() * 90000);
  const fileName = `logo-${random}-${companyData.name}.${fileExt}`;

  // 1. Upload company logo to the 'company-logo' bucket
  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo);

  if (storageError) {
    console.error("Error uploading company logo:", storageError);
    throw new Error(storageError.message || "Error uploading company logo");
  }

  // 2. Generate the Public URL pointing to 'company-logo' (NOT 'resumes')
  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  // 3. Insert new company row into database
  const { data, error } = await supabase
    .from("companies")
    .insert([
      {
        name: companyData.name,
        logo_url,
      },
    ])
    .select();

  if (error) {
    console.error("Error submitting Company:", error);
    throw new Error(error.message || "Error submitting Company");
  }

  return data;
}
